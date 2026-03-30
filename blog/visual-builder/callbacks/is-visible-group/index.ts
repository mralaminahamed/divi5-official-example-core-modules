import { type BlogAttrs, type Module } from '@divi/types';

/**
 * Determines the visibility of option groups based on specific parameters and conditions.
 *
 * @since ??
 *
 * @param {Module.Settings.Group.VisibleCallback.Params<BlogAttrs>} params Function parameters.
 *
 * @returns {boolean} Whether the group should be visible or not.
 */
export const isVisibleGroup = ({
  groupId,
  attrs,
}: Module.Settings.Group.VisibleCallback.Params<BlogAttrs>): boolean => {
  switch (groupId) {
    case 'post.decoration.border': {
      // Design >> Border >> Grid Layout.
      // Show grid layout border when Layout Style is set to 'grid'.
      const blogGridLayoutDisplay = attrs?.blogGrid?.decoration?.layout?.desktop?.value?.display ?? 'grid';
      return 'grid' === blogGridLayoutDisplay;
    }

    case 'fullwidth.decoration.border': {
      // Design >> Border >> Fullwidth Layout.
      // Show fullwidth layout border when Layout Style is not set to 'grid' (flex or block).
      const blogGridLayoutDisplay = attrs?.blogGrid?.decoration?.layout?.desktop?.value?.display ?? 'grid';
      return 'grid' !== blogGridLayoutDisplay;
    }

    default: {
      return true;
    }
  }
};
