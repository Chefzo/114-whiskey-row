/**
 * Centralized error handling utilities
 * Provides consistent error reporting and recovery strategies
 * 
 * PRODUCTION NOTES:
 * - Distinguishes between user-facing and system errors
 * - Logs detailed info for debugging
 * - Returns safe fallback messages
 */

export interface ErrorContext {
  component: string;
  operation: string;
  originalError?: unknown;
}

/**
 * Extracts error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

/**
 * Logs error with context for debugging
 */
export const logError = (context: ErrorContext, error: unknown): void => {
  const message = getErrorMessage(error);
  console.error(
    `[${context.component}] ${context.operation} failed:`,
    message,
    error
  );
};

/**
 * User-facing error messages (safe to display)
 */
export const getUserFacingErrorMessage = (operation: string): string => {
  const messages: Record<string, string> = {
    'load-gallery': 'Unable to load gallery photos. Please try again later.',
    'load-events': 'Unable to load events. Please try again later.',
    'load-cocktails': 'Could not load the cocktail menu.',
    'load-blog': 'Unable to load blog posts. Please try again later.',
    'load-blog-post': 'Unable to load this blog post. Please try again later.',
  };
  
  return messages[operation] || 'Something went wrong. Please try again later.';
};

/**
 * Handles data fetch errors with logging and user-facing message
 */
export const handleFetchError = (
  context: ErrorContext,
  error: unknown
): string => {
  logError(context, error);
  return getUserFacingErrorMessage(context.operation);
};
