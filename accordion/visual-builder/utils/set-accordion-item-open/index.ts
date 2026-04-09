import { dispatch, select } from '@divi/data';

import { isAccordionItem } from '../is-accordion-item';
import { isAccordionItemOpened } from '../is-accordion-item-opened';

/**
 * Sets the open state of an accordion item.
 *
 * Updates the accordion item's open state attribute. If the current state matches the new value,
 * the function returns early without making changes. If the advanced attribute becomes empty
 * after the update, it is removed to keep the module attributes clean.
 *
 * @param {string} accordionItemId The ID of the accordion item module to update.
 * @param {'on' | 'off'} value The new open state value ('on' for open, 'off' for closed).
 *
 * @returns {void}
 */
export const setAccordionItemOpen = (accordionItemId: string, value: 'on' | 'off'): void => {
  if (!isAccordionItem(accordionItemId)) {
    return;
  }

  // Check if the accordion item is opened.
  const isOpened = isAccordionItemOpened(accordionItemId);

  // If the accordion item is opened and the value is 'on', return.
  if (isOpened && 'on' === value) {
    return;
  }

  // If the accordion item is not opened and the value is 'off', return.
  if (!isOpened && 'off' === value) {
    return;
  }

  // Remove the advanced attribute if it is an empty array.
  // This is needed due to a bug introduced by the syncAccordionItemsDefaultOpenItem function
  // in PR https://github.com/elegantthemes/submodule-builder-5/pull/4299.
  // This workaround can be removed in the future .
  const advancedAttr = select('divi/edit-post').getModuleAttr<'on' | 'off'>(accordionItemId, 'module.advanced');
  if (Array.isArray(advancedAttr) && advancedAttr.length <= 0) {
    dispatch('divi/edit-post').removeModuleAttribute(accordionItemId, 'module.advanced');
  }

  dispatch('divi/edit-post').editModuleAttribute({
    id: accordionItemId,
    attrName: 'module.advanced.open.desktop.value',
    subName: null,
    value,
  });
};
