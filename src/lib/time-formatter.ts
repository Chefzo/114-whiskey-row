/**
 * Centralized time formatting utility
 * Handles military time format conversion to 12-hour ET timezone
 * 
 * PRODUCTION NOTES:
 * - Validates input before processing
 * - Returns empty string on invalid input (graceful degradation)
 * - Consistent timezone handling (America/New_York)
 */

export const formatTime = (timeValue: any): string => {
  // Guard: null/undefined check
  if (!timeValue) return '';

  // Guard: type check
  if (typeof timeValue !== 'string') {
    console.warn('[formatTime] Invalid time value type:', typeof timeValue);
    return '';
  }

  // Parse military time format: HH:MM:SS.mmm or HH:MM or HHMM
  const militaryMatch = timeValue.match(/^(\d{1,2}):?(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?$/);
  
  if (!militaryMatch) {
    // Return original if it doesn't match military format (might already be formatted)
    return timeValue;
  }

  try {
    const hours = parseInt(militaryMatch[1], 10);
    const minutes = militaryMatch[2];

    // Validate hours (0-23)
    if (hours < 0 || hours > 23) {
      console.warn('[formatTime] Invalid hours:', hours);
      return '';
    }

    // Create date object for today to format with timezone
    const today = new Date();
    today.setHours(hours, parseInt(minutes, 10), 0, 0);

    // Format time in ET timezone with 12-hour format
    const etTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York'
    }).format(today);

    return `${etTime} ET`;
  } catch (error) {
    console.error('[formatTime] Error formatting time:', error, timeValue);
    return '';
  }
};
