import { getAttrValue } from '@divi/module-utils';
import { type BlogAttrs, type Module } from '@divi/types';

import { isTBLayout } from '../../../../utils/is-tb-layout';

/**
 * Determines the visibility of setting fields based on specific parameters and conditions.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.CallbackParams<BlogAttrs>} params Function parameters.
 *
 * @returns {boolean} Whether the field should be visible or not.
 */
export const isVisibleFields = ({
  attrs,
  breakpoint,
  baseBreakpoint,
  breakpointNames,
  state,
  attrName,
  subName,
}: Module.Settings.Field.CallbackParams<BlogAttrs>): boolean => {
  const attrNameWithSubName = subName ? `${attrName}.*.${subName}` : attrName;

  switch (attrNameWithSubName) {
    case 'readMore.advanced.enable': // Content >> Elements >> Show Read More Button
    case 'post.advanced.showExcerpt': // Content >> Elements >> Show Excerpt
    case 'post.advanced.excerptManual': // Content >> Content >> Use Post Excerpt
    case 'post.advanced.excerptLength': {
      // Content >> Content >> Excerpt Length
      const excerptContent = getAttrValue({
        attr: attrs?.post?.advanced?.excerptContent,
        mode: 'getAndInheritAll',
        breakpoint,
        baseBreakpoint,
        breakpointNames,
        state,
      });

      return 'on' !== excerptContent;
    }

    case 'post.advanced.useCurrentLoop': {
      // Content >> Content >> Posts For Current Page
      return isTBLayout();
    }

    case 'post.advanced.type': {
      // Content >> Content >> Post Type.
      const useCurrentLoop = getAttrValue({
        attr: attrs?.post?.advanced?.useCurrentLoop,
        mode: 'getAndInheritAll',
        breakpoint,
        baseBreakpoint,
        breakpointNames,
        state,
      });

      return 'on' !== useCurrentLoop;
    }

    case 'post.advanced.categories': {
      // Content >> Content >> Included Categories.
      // Show categories field for all post types (not just 'post')
      // since we now support dynamic category fetching for any post type
      const useCurrentLoop =
        getAttrValue({
          attr: attrs?.post?.advanced?.useCurrentLoop,
          mode: 'getAndInheritAll',
          breakpoint,
          baseBreakpoint,
          breakpointNames,
          state,
        }) ?? 'off';

      return 'off' === useCurrentLoop;
    }

    case 'masonry.decoration.background.*.color': {
      // Content >> Background >> Grid Tile Background Color.
      // Show this field only when Layout Style is set to 'grid'.
      const blogGridLayoutDisplay = attrs?.blogGrid?.decoration?.layout?.desktop?.value?.display ?? 'grid';
      return 'grid' === blogGridLayoutDisplay;
    }

    case 'overlay.decoration.background.*.color': // Design >> Overlay >> Overlay Background Color.
    case 'overlayIcon.decoration.icon.*.color': // Design >> Overlay >> Overlay Icon Color.
    case 'overlayIcon.decoration.icon': {
      // Design >> Overlay >> Overlay Icon.
      const overlayEnable = getAttrValue({
        mode: 'getAndInheritAll',
        attr: attrs?.overlay?.advanced?.enable,
        breakpoint,
        baseBreakpoint,
        breakpointNames,
        state,
      });

      return 'on' === overlayEnable;
    }

    default: {
      return true;
    }
  }
};
