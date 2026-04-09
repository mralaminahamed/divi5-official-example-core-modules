import { find, map } from 'lodash';

import { select } from '@divi/data';

/**
 * Get included categories.
 *
 * @param {string} categories Categories.
 *
 * @returns {Array} - Included categories.
 */
export const includedCategories = (categories: string): string[] => {
  const postCategories = select('divi/settings').getSetting(['taxonomy', 'postCategories']);

  const filterCategories = map(
    categories.split(',').filter(item => item !== ''),
    item => {
      if ('all' === item || 'current' === item) {
        return item;
      }
      const categoryExists = find(postCategories, ['term_id', Number(item)]);
      if (categoryExists) {
        return Number(item);
      }
      return null;
    },
  )
    .filter(Boolean)
    .map(String);

  return filterCategories;
};
