/**
 * Bar hours utility for One Fourteen Bar
 * Monday: Closed
 * Tuesday-Sunday: 4pm-2am
 */

export interface BarStatus {
  isOpen: boolean;
  currentTime: string;
  nextEvent: string;
  todayHours: string;
}

export function getBarStatus(): BarStatus {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  // Define hours for each day (in minutes from midnight)
  const barHours: Record<number, { open: number; close: number; label: string }> = {
    0: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Sun: 4pm - 2am' }, // Sunday
    1: { open: -1, close: -1, label: 'Mon: Closed' }, // Monday - Closed
    2: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Tue: 4pm - 2am' }, // Tuesday
    3: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Wed: 4pm - 2am' }, // Wednesday
    4: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Thu: 4pm - 2am' }, // Thursday
    5: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Fri: 4pm - 2am' }, // Friday
    6: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Sat: 4pm - 2am' }, // Saturday
  };

  const todaySchedule = barHours[dayOfWeek];
  
  // Check if closed (Monday)
  const isClosed = todaySchedule.open === -1;
  const isOpen = !isClosed && currentTimeInMinutes >= todaySchedule.open && currentTimeInMinutes < todaySchedule.close;

  // Format current time
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Determine next event
  let nextEvent = '';
  if (isClosed) {
    nextEvent = 'Opens Tuesday at 4:00pm';
  } else if (isOpen) {
    const closeHour = Math.floor(todaySchedule.close / 60) % 24;
    const closeMinute = todaySchedule.close % 60;
    const isMidnightOrLater = todaySchedule.close >= 24 * 60;
    const displayHour = closeHour === 0 ? 12 : closeHour > 12 ? closeHour - 12 : closeHour;
    const ampm = isMidnightOrLater ? 'am' : (closeHour >= 12 ? 'pm' : 'am');
    nextEvent = `Closes at ${displayHour}:${closeMinute.toString().padStart(2, '0')}${ampm}`;
  } else {
    const openHour = Math.floor(todaySchedule.open / 60);
    const openMinute = todaySchedule.open % 60;
    nextEvent = `Opens at ${openHour === 0 ? 12 : openHour > 12 ? openHour - 12 : openHour}:${openMinute.toString().padStart(2, '0')}${openHour >= 12 ? 'pm' : 'am'}`;
  }

  return {
    isOpen,
    currentTime,
    nextEvent,
    todayHours: todaySchedule.label,
  };
}
