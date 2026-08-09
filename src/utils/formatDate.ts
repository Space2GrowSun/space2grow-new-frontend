/**
 * Formats an ISO 8601 datetime string into a human-readable date.
 * Returns an empty string when the input is missing.
 *
 * @example
 * formatDate('2025-06-01T00:00:00Z') // → 'June 2025'
 * formatDate('2025-07-27T10:30:00Z') // → 'July 2025'
 */
export function formatDate(isoString: string | undefined | null): string {
  if (!isoString) return '';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
    });
  } catch {
    return '';
  }
}

/**
 * Formats an ISO 8601 datetime string into a long-form readable date.
 *
 * @example
 * formatFullDate('2025-07-27T10:30:00Z') // → '27 July 2025'
 */
export function formatFullDate(isoString: string | undefined | null): string {
  if (!isoString) return '';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Returns an ISO string suitable for the datetime HTML attribute.
 */
export function toISODateString(isoString: string | undefined | null): string {
  if (!isoString) return '';
  try {
    return new Date(isoString).toISOString();
  } catch {
    return '';
  }
}
