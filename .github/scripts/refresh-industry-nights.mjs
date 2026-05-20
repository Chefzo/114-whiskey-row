#!/usr/bin/env node
// Keep ~12 weeks of future "Industry Night at One Fourteen" rows in the
// Wix CMS `events` collection on the One Fourteen Bar site.
//
// Behavior:
//   1. Query future Industry Night rows (eventDate >= today).
//   2. If fewer than MIN_FUTURE remain, append new Sundays until
//      TARGET_FUTURE Sundays are on the calendar.
//   3. Print a summary and exit 0 on success, non-zero on hard error.
//
// Auth: a Wix API Key in env (WIX_API_KEY), plus the account + site IDs.
// Triggered weekly by .github/workflows/refresh-industry-nights.yml.

const API_KEY = process.env.WIX_API_KEY;
const ACCOUNT_ID = process.env.WIX_ACCOUNT_ID;
const SITE_ID = process.env.WIX_SITE_ID;
const DRY_RUN = String(process.env.DRY_RUN || "false").toLowerCase() === "true";

const MIN_FUTURE = 8; // top up if fewer than this many Sundays remain
const TARGET_FUTURE = 12; // top up to this many

const COLLECTION_ID = "events";

if (!API_KEY) die("Missing env WIX_API_KEY — add it as a GitHub repository secret.");
if (!ACCOUNT_ID) die("Missing env WIX_ACCOUNT_ID");
if (!SITE_ID) die("Missing env WIX_SITE_ID");

// ---------- Template fields used for every new row ----------
const EVENT_NAME = "Industry Night at One Fourteen";
const EVENT_TYPE = "Industry Night";
const START_TIME = "21:00:00.000";
const END_TIME = "02:00:00.000";
const LOCATION = "One Fourteen Bar ";
const INSTAGRAM_HANDLE = "@onefourteenwhiskeyrow";
const EVENT_IMAGE =
  "wix:image://v1/528274_a06508cfe7de4ad4ad336070e92d8e12~mv2.png/ChatGPT%20Image%20Mar%2013,%202026,%2003_06_16%20PM.png#originWidth=1024&originHeight=1536";
const EVENT_DESCRIPTION =
  "Calling all bartenders, servers, chefs, and hospitality pros — Sunday nights are Industry Night at One Fourteen.\n\n" +
  "Join us on Whiskey Row for drink specials, giveaways, and late-night vibes made for the people who keep the city running.\n\n" +
  "Drink Specials\n\n" +
  "• $3 Twisted Tea\n" +
  "• $4 Angry Orchard\n" +
  "• $8 Old Forester Old Fashioned\n" +
  "• $5 Old Forester Rye Sour\n" +
  "• $5 Beer + Shot\n" +
  "• $2.50 Well Drinks\n\n" +
  "🎁 Giveaways & raffles throughout the night\n\n" +
  "Whether you're getting off a shift or just starting the night, this is the spot for the industry to unwind.";

// ---------- HTTP helper ----------
async function wixFetch(path, init = {}) {
  const url = `https://www.wixapis.com${path}`;
  const headers = {
    "Authorization": API_KEY,
    "wix-account-id": ACCOUNT_ID,
    "wix-site-id": SITE_ID,
    "Content-Type": "application/json",
    ...(init.headers || {}),
  };
  const resp = await fetch(url, { ...init, headers });
  const text = await resp.text();
  let json;
  try { json = text ? JSON.parse(text) : null; } catch { json = { _raw: text }; }
  if (!resp.ok) {
    const msg = `Wix API ${init.method || "GET"} ${path} → HTTP ${resp.status}: ${text.slice(0, 400)}`;
    throw new Error(msg);
  }
  return json;
}

// ---------- Date helpers ----------
function todayIso() {
  // YYYY-MM-DD in UTC. Wix's eventDate field is a DATE (no time/tz).
  return new Date().toISOString().slice(0, 10);
}

function nextSundayAfter(isoDate) {
  // Returns the YYYY-MM-DD of the first Sunday strictly after the given date.
  const d = new Date(`${isoDate}T00:00:00Z`);
  do {
    d.setUTCDate(d.getUTCDate() + 1);
  } while (d.getUTCDay() !== 0);
  return d.toISOString().slice(0, 10);
}

function nextSundayFromToday() {
  // First Sunday >= today (or today if today is Sunday).
  const d = new Date(`${todayIso()}T00:00:00Z`);
  while (d.getUTCDay() !== 0) {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return d.toISOString().slice(0, 10);
}

function addWeeks(isoDate, n) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 7 * n);
  return d.toISOString().slice(0, 10);
}

// ---------- Step 1: query existing future rows ----------
async function queryFutureIndustryNights() {
  const body = {
    dataCollectionId: COLLECTION_ID,
    query: {
      filter: {
        eventName: EVENT_NAME,
        eventDate: { $gte: todayIso() },
      },
      paging: { limit: 50 },
      sort: [{ fieldName: "eventDate", order: "ASC" }],
    },
  };
  const res = await wixFetch("/wix-data/v2/items/query", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res?.dataItems || [];
}

// ---------- Step 2: compute dates to insert ----------
function computeDatesToInsert(existing) {
  const existingDates = new Set(
    existing.map((it) => it?.data?.eventDate).filter(Boolean),
  );

  // Anchor the new series after the latest existing date, or from next
  // Sunday if there are none.
  let cursor;
  if (existing.length === 0) {
    cursor = nextSundayFromToday();
  } else {
    const latest = existing[existing.length - 1].data.eventDate;
    cursor = nextSundayAfter(latest);
  }

  const needed = TARGET_FUTURE - existing.length;
  const toInsert = [];
  for (let i = 0; i < needed; i++) {
    if (!existingDates.has(cursor)) toInsert.push(cursor);
    cursor = addWeeks(cursor, 1);
  }
  return toInsert;
}

// ---------- Step 3: bulk insert ----------
async function bulkInsert(dates) {
  const dataItems = dates.map((date) => ({
    data: {
      eventName: EVENT_NAME,
      eventType: EVENT_TYPE,
      eventDate: date,
      startTime: START_TIME,
      endTime: END_TIME,
      location: LOCATION,
      instagramHandle: INSTAGRAM_HANDLE,
      eventImage: EVENT_IMAGE,
      eventDescription: EVENT_DESCRIPTION,
    },
  }));
  const res = await wixFetch("/wix-data/v2/bulk/items/insert", {
    method: "POST",
    body: JSON.stringify({ dataCollectionId: COLLECTION_ID, dataItems }),
  });
  return res;
}

// ---------- Main ----------
function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

async function main() {
  console.log(`Today: ${todayIso()}`);
  console.log(`Querying future "${EVENT_NAME}" rows…`);
  const existing = await queryFutureIndustryNights();
  console.log(`  Found ${existing.length} upcoming.`);
  if (existing.length > 0) {
    console.log(
      `  Range: ${existing[0].data.eventDate} → ${existing[existing.length - 1].data.eventDate}`,
    );
  }

  if (existing.length >= MIN_FUTURE) {
    console.log(`✓ At or above threshold (MIN_FUTURE=${MIN_FUTURE}). Nothing to do.`);
    return;
  }

  const toInsert = computeDatesToInsert(existing);
  if (toInsert.length === 0) {
    console.log("✓ Nothing to insert after dedupe.");
    return;
  }

  console.log(`Planning to insert ${toInsert.length} new Sundays:`);
  for (const d of toInsert) console.log(`  + ${d}`);

  if (DRY_RUN) {
    console.log("DRY_RUN=true — skipping insert.");
    return;
  }

  const res = await bulkInsert(toInsert);
  const successes = res?.bulkActionMetadata?.totalSuccesses ?? 0;
  const failures = res?.bulkActionMetadata?.totalFailures ?? 0;
  console.log(`✓ Inserted ${successes} row(s), ${failures} failure(s).`);
  if (failures > 0) die("One or more inserts failed — see API response above.");
}

main().catch((err) => die(err.message || String(err)));
