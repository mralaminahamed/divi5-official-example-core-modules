import { select } from '@divi/data';

/**
 * Checks if a module is an accordion item.
 *
 * Verifies that the module exists and has the name 'divi/accordion-item'.
 * Returns false if the module doesn't exist or is not an accordion item.
 *
 * @param {string} accordionItemId The ID of the module to check.
 *
 * @returns {boolean} True if the module is an accordion item, false otherwise.
 */
export const isAccordionItem = (accordionItemId: string): boolean => {
  const accordionItem = select('divi/edit-post').getModule(accordionItemId);

  if (!accordionItem) {
    return false;
  }

  return 'divi/accordion-item' === accordionItem.name;
};
