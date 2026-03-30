import React, { type ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { set } from 'lodash';

import { __ } from '@wordpress/i18n';

import { useDispatch, useSelect } from '@divi/data';
import { ModuleGroups } from '@divi/module';
import { getCategoriesForPostType, transformTaxonomiesToCheckboxOptions } from '@divi/module-utils';
import { loggedFetch } from '@divi/rest';
import { type BlogAttrs, type FieldLibrary, type Module } from '@divi/types';

import { isVisibleFields } from './callbacks';

const defaultCategories = [
  {
    label: __('All Categories', 'et_builder_5'),
    value: 'all',
  },
  {
    label: __('Current Category', 'et_builder_5'),
    value: 'current',
  },
];

/**
 * Content panel component for the Blog module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props<BlogAttrs>} param0 Content panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsContent = ({ groupConfiguration }: Module.Settings.Panel.Props<BlogAttrs>): ReactElement => {
  const [categories, setCategories] = useState<FieldLibrary.Checkboxes.Options[]>(defaultCategories);
  const [postTypes, setPostTypes] = useState<FieldLibrary.Select.Options>({});
  const prevPostType = useRef<string>('');

  // Get current post type, module ID, and current categories from module attributes
  const { currentPostType, moduleId, currentCategoriesAttr } = useSelect(selectStore => {
    const modalState = selectStore('divi/modal-library').getModal('divi/module');
    const moduleIdValue = modalState?.owner ?? '';
    const postTypeAttr = selectStore('divi/edit-post').getModuleAttr(moduleIdValue, 'post.advanced.type');
    const categoriesAttr = selectStore('divi/edit-post').getModuleAttr(moduleIdValue, 'post.advanced.categories');

    return {
      currentPostType: (postTypeAttr?.getIn(['desktop', 'value']) as string) || 'post',
      moduleId: moduleIdValue,
      currentCategoriesAttr: categoriesAttr,
    };
  });

  // Get dispatch function to update module attributes
  const { editModuleAttribute } = useDispatch('divi/edit-post');

  // Memoize the category reset function
  const resetCategories = useCallback(() => {
    if (currentCategoriesAttr) {
      editModuleAttribute({
        id: moduleId,
        attrName: 'post.advanced.categories',
        value: currentCategoriesAttr.setIn(['desktop', 'value'], ['all']),
        subName: false, // Skip detection - replacing entire post.advanced.categories array, no subName concept
      });
    }
  }, [editModuleAttribute, moduleId, currentCategoriesAttr]);

  // Get categories for current post type from store
  const selectCategories = useCallback(
    (selectStore: (storeName: string) => any) => getCategoriesForPostType(currentPostType, selectStore),
    [currentPostType],
  );
  const currentPostTypeCategories = useSelect(selectCategories);

  // Transform categories to checkbox options
  const categoryOptions = useMemo(
    () => transformTaxonomiesToCheckboxOptions(currentPostTypeCategories),
    [currentPostTypeCategories],
  );

  useEffect(() => {
    // Reset categories when post type changes
    if (prevPostType.current && prevPostType.current !== currentPostType && moduleId) {
      // Reset to "All Categories" when switching post types
      resetCategories();
    }

    // Update the previous post type reference
    prevPostType.current = currentPostType;

    // Use the memoized categoryOptions from the utility
    if (categoryOptions.length > 0) {
      setCategories([...defaultCategories, ...categoryOptions]);
    } else {
      setCategories(defaultCategories);
    }

    // Fetch post types for the dropdown
    loggedFetch({
      method: 'GET',
      restRoute: '/divi/v1/module-data/blog/types',
    })
      .then(result => {
        setPostTypes(result as FieldLibrary.Select.Options);
      })
      .catch(() => {
        // TODO feat(D5, Logger) - We need to introduce a new logging system to log errors/rejections/etc.
      });
  }, [currentPostType, categoryOptions, moduleId, currentCategoriesAttr, resetCategories]);

  // Insert props value to `content` group.
  if (groupConfiguration?.content?.component) {
    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedUsecurrentloop', 'visible'],
      isVisibleFields,
    );
    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedExcerptmanual', 'visible'],
      isVisibleFields,
    );
    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedExcerptlength', 'visible'],
      isVisibleFields,
    );

    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedType', 'visible'],
      isVisibleFields,
    );
    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedType', 'component', 'props', 'options'],
      postTypes,
    );

    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedCategories', 'visible'],
      isVisibleFields,
    );
    set(
      groupConfiguration,
      ['content', 'component', 'props', 'fields', 'postAdvancedCategories', 'component', 'props', 'options'],
      categories,
    );
  }

  // Insert props value to `contentElements` group.
  if (groupConfiguration?.contentElements?.component) {
    set(
      groupConfiguration,
      ['contentElements', 'component', 'props', 'fields', 'postAdvancedShowexcerpt', 'visible'],
      isVisibleFields,
    );
    set(
      groupConfiguration,
      ['contentElements', 'component', 'props', 'fields', 'readMoreAdvancedEnable', 'visible'],
      isVisibleFields,
    );
  }

  // Insert props value to `contentBackground` group.
  if (groupConfiguration?.contentBackground?.component) {
    set(
      groupConfiguration,
      ['contentBackground', 'component', 'props', 'fields', 'masonryDecorationBackground', 'visible'],
      isVisibleFields,
    );
  }

  return <ModuleGroups groups={groupConfiguration} />;
};
