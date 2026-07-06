/**
 * Centralized date utilities for consistent date handling
 * Handles date parsing, filtering, and formatting
 * 
 * PRODUCTION NOTES:
 * - All dates normalized to UTC midnight for consistent comparisons
 * - Handles string dates from CMS (ISO format)
 * - Provides safe date comparisons
 */

/**
 * Normalize date to UTC midnight for consistent comparisons
 */
export const normalizeDate = (date: Date | string | undefined): Date | null => {
  if (!date) return null;

  try {
    const dateObj = typeof date === 'string' ? new Date(date + 'T00:00:00') : new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj;
  } catch {
    return null;
  }
};

/**
 * Get today's date normalized to UTC midnight
 */
export const getTodayNormalized = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Check if event date is in the future
 */
export const isUpcomingEvent = (eventDate: Date | string | undefined): boolean => {
  const normalized = normalizeDate(eventDate);
  if (!normalized) return false;
  return normalized >= getTodayNormalized();
};

/**
 * Check if event date is in the past
 */
export const isPastEvent = (eventDate: Date | string | undefined): boolean => {
  const normalized = normalizeDate(eventDate);
  if (!normalized) return false;
  return normalized < getTodayNormalized();
};

/**
 * Sort events by date (upcoming first)
 */
export const sortEventsByDate = <T extends { eventDate?: Date | string }>(
  events: T[]
): T[] => {
  return [...events].sort((a, b) => {
    const dateA = normalizeDate(a.eventDate)?.getTime() ?? Infinity;
    const dateB = normalizeDate(b.eventDate)?.getTime() ?? Infinity;
    return dateA - dateB;
  });
};

/**
 * Filter events by status
 */
export const filterEventsByStatus = <T extends { eventDate?: Date | string }>(
  events: T[],
  status: 'all' | 'upcoming' | 'past'
): T[] => {
  return events.filter((event) => {
    if (!event.eventDate) return status === 'all';
    
    if (status === 'upcoming') return isUpcomingEvent(event.eventDate);
    if (status === 'past') return isPastEvent(event.eventDate);
    return true;
  });
};

/**
 * Format date for display
 */
export const formatEventDate = (date: Date | string | undefined): string => {
  if (!date) return 'TBA';

  try {
    const dateObj = typeof date === 'string' ? new Date(date + 'T00:00:00') : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  } catch {
    return 'TBA';
  }
};
