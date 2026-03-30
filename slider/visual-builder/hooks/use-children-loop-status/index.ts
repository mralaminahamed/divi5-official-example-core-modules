import { get } from 'lodash';

import { useSelect } from '@divi/data';

import { type LoopStatus } from '../../types'; // Used in JSDoc @returns annotation

/**
 * Get loop status for all child modules with proper memoization.
 * Follows useSelect best practices by separating data extraction from processing.
 *
 * @since ??
 *
 * @param {string[]} childrenIds Array of child module IDs to check loop status for.
 *
 * @returns {LoopStatus[]} Array of loop status objects containing:
 * - `id`: Child module ID
 * - `isLoopEnabled`: Whether loop is enabled for this child
 * - `count`: Query result count for this child.
 */
export const useChildrenLoopStatus = (childrenIds: string[]) => {
  const childrenLoopAttrs = useSelect(
    selector => {
      const editPostSelector = selector('divi/edit-post');

      return childrenIds.reduce(
        (acc, childId) => {
          acc[childId] = editPostSelector.getModuleAttr(childId, 'module.advanced.loop');
          return acc;
        },
        {} as Record<string, any>,
      );
    },
    [childrenIds],
  );

  const childrenQueryCounts = useSelect(
    selector => {
      const moduleLibSelector = selector('divi/module-library');

      return childrenIds.reduce(
        (acc, childId) => {
          acc[childId] = moduleLibSelector.getQueryResultCount(childId);
          return acc;
        },
        {} as Record<string, number>,
      );
    },
    [childrenIds],
  );

  // Process data OUTSIDE useSelect (avoiding .map() inside selectors).
  return childrenIds.map(childId => ({
    id: childId,
    isLoopEnabled: 'on' === get(childrenLoopAttrs[childId], ['enable', 'desktop', 'value'], 'off'),
    count: childrenQueryCounts[childId] || 0,
  }));
};
