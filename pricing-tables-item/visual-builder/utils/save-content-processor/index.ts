/**
 * Converts structured HTML list back to plain text format for saving.
 *
 * This function processes HTML content from the Pricing Table module's structured
 * list format and converts it back to plain text with plus/minus indicators.
 * It extracts text content from list items and preserves the available/unavailable
 * status by adding appropriate prefixes.
 *
 * @param {string} html The HTML content containing the structured list.
 *
 * @returns {string} Plain text content with plus/minus indicators.
 *
 * @example
 * // Convert structured list back to plain text
 * saveContentProcessor('<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li><span>Feature 2</span></li></ul>')
 * // Returns: '+ Feature 1\n+ Feature 2'
 *
 * @example
 * // Handle content without structured list
 * saveContentProcessor('<p>Some other content</p>')
 * // Returns: '' (empty string when no pricing list found)
 */
export const saveContentProcessor = (html: string): string => {
  // Parse the string into a DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Find the UL with the class et_pb_pricing
  const ul = doc.querySelector('ul.et_pb_pricing');
  if (!ul) return '';

  // Iterate through all <li> elements
  const result = Array.from(ul.querySelectorAll('li')).map(li => {
    // Get inner HTML of span (preserve strong tags etc.)
    const span = li.querySelector('span');

    if (!span) {
      return '';
    }

    let text = span.innerHTML.trim();

    // If li has class et_pb_not_available, prepend "-"
    if (li.classList.contains('et_pb_not_available')) {
      text = `- ${text}`;
    } else {
      text = `+ ${text}`;
    }

    return text;
  });

  // Join lines with \n
  return result.join('\n');
};
