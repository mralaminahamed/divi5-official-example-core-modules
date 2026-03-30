import { select } from '@divi/data';

import { isAccordionItem } from '../is-accordion-item';

/**
 * Checks if an accordion item is currently opened.
 *
 * Verifies that the module exists, is an accordion item, and has its open state
 * set to 'on'. Returns false if the module doesn't exist, is not an accordion item,
 * or is not opened.
 *
 * @param {string} accordionItemId The ID of the accordion item module to check.
 *
 * @returns {boolean} True if the accordion item is opened, false otherwise.
 */
export const isAccordionItemOpened = (accordionItemId: string): boolean => {
  if (!isAccordionItem(accordionItemId)) {
    return false;
  }

  return (
    'on' === select('divi/edit-post').getModuleAttr<'on' | 'off'>(accordionItemId, 'module.advanced.open.desktop.value')
  );
};
