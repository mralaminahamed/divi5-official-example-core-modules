import { dispatch } from '@divi/data';

/**
 * Callback to update the child module order for a pricing tables module.
 *
 * This function is called when the child pricing table modules are reordered within a pricing tables module.
 *
 * @since ??
 *
 * @param {string} moduleId The unique ID of the parent pricing tables module.
 * @param {string[]} childModulesIds An array of IDs representing the reordered child pricing table modules.
 *
 * @returns {void}
 *
 * @example
 * // Reorder pricing table columns within a module:
 * onChildModuleChange('pricing-tables-module-id', ['table-1-id', 'table-2-id', 'table-3-id']);
 */
export const onChildModuleChange = (moduleId: string, childModulesIds: string[]): void => {
  // While dragging modules in flex, we only need to re-order the modules.
  dispatch('divi/edit-post').editChildren(moduleId, childModulesIds);
};
