/**
 * Bar hours utility for One Fourteen Bar
 * Mon-Thu: 4pm-2am
 * Fri-Sat: 12pm-4am
 * Sun: 12pm-2am
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
    0: { open: 12 * 60, close: 2 * 60 + 24 * 60, label: 'Sun: 12pm - 2am' }, // Sunday
    1: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Mon: 4pm - 2am' }, // Monday
    2: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Tue: 4pm - 2am' }, // Tuesday
    3: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Wed: 4pm - 2am' }, // Wednesday
    4: { open: 16 * 60, close: 2 * 60 + 24 * 60, label: 'Thu: 4pm - 2am' }, // Thursday
    5: { open: 12 * 60, close: 4 * 60 + 24 * 60, label: 'Fri: 12pm - 4am' }, // Friday
    6: { open: 12 * 60, close: 4 * 60 + 24 * 60, label: 'Sat: 12pm - 4am' }, // Saturday
  };

  const todaySchedule = barHours[dayOfWeek];
  const isOpen = currentTimeInMinutes >= todaySchedule.open && currentTimeInMinutes < todaySchedule.close;

  // Format current time
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Determine next event
  let nextEvent = '';
  if (isOpen) {
    const closeHour = Math.floor(todaySchedule.close / 60) % 24;
    const closeMinute = todaySchedule.close % 60;
    nextEvent = `Closes at ${closeHour === 0 ? 12 : closeHour > 12 ? closeHour - 12 : closeHour}:${closeMinute.toString().padStart(2, '0')}${closeHour >= 12 ? 'am' : 'pm'}`;
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
