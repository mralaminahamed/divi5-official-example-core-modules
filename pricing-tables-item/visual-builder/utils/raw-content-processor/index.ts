import { compact, includes, trim } from 'lodash';

/**
 * Processes raw HTML content for the Pricing Table module.
 *
 * This function converts HTML content into a structured list format suitable
 * for the Pricing Table module. It processes HTML tags, extracts list items,
 * and formats them with appropriate CSS classes for available/unavailable features.
 * Only processes content that contains list-like structure (p tags, br tags, newlines, or plus/minus indicators).
 *
 * @param {string} content The raw HTML content to process.
 *
 * @returns {string} The processed HTML content as a structured list, or original content if no list structure found.
 *
 * @example
 * // Process content with available and unavailable features
 * rawContentProcessor('+ Feat 1<br />- Feat 2')
 * // Returns:
 * '<ul class="et_pb_pricing"><li><span>Feat 1</span></li><li class="et_pb_not_available"><span>Feat 2</span></li></ul>'
 *
 * @example
 * // Process content without plus/minus indicators
 * rawContentProcessor('<p>Basic feature</p><p>Another feature</p>')
 * // Returns: '<ul class="et_pb_pricing"><li><span>Basic feature</span></li><li><span>Another feature</span></li></ul>'
 *
 * @example
 * // Return original content when no list structure found
 * rawContentProcessor('<div>Some other content</div>')
 * // Returns: '<div>Some other content</div>'
 */
export const rawContentProcessor = (content: string): string => {
  // Handle null/undefined input
  if (!content) {
    return '';
  }

  // Check if content contains list-like structure (p tags, br tags, newlines, or plus/minus indicators)
  const hasListStructure = /<p\s*[^>]*>|<br\s*\/?>|\n|\+|-/i.test(content);

  if (!hasListStructure) {
    return content;
  }

  const contentProcessed = content
    .toString()
    .replace(/<p\s*[^>]*>/gi, '\n') // <p> with optional whitespace and any attributes
    .replace(/<\/p\s*>/gi, '\n') // </p> with optional whitespace
    .replace(/<br\s*[^>]*\/?>/gi, '\n'); // <br> with optional whitespace and optional /

  const listItems = compact(contentProcessed.split('\n')).map(listItem => trim(listItem));

  // If no valid list items after processing, return empty string
  if (0 === listItems.length) {
    return '';
  }

  const listItemsProcessed = listItems.reduce((acc, listItem) => {
    if ('' === listItem) {
      return acc;
    }

    const plusMinus = listItem.slice(0, 1);
    const listContent = includes(['-', '+'], plusMinus) ? listItem.slice(1) : listItem;

    if ('-' === plusMinus) {
      acc += `<li class="et_pb_not_available"><span>${trim(listContent)}</span></li>`;
    } else {
      acc += `<li><span>${trim(listContent)}</span></li>`;
    }

    return acc;
  }, '');

  if ('' !== listItemsProcessed) {
    return `<ul class="et_pb_pricing">${listItemsProcessed}</ul>`;
  }

  return '';
};
