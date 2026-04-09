import React, { type ReactElement } from 'react';

import { useSelect } from '@divi/data';
import { getAccentColorValue } from '@divi/global-data';
import { CommonStyle, CssStyle, StyleContainer, type StylesProps, TextStyle } from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';
import { overflowForBorderRadiusStyleDeclaration } from '@divi/style-library';
import { type BlogAttrs } from '@divi/types';

import { cssFields } from './custom-css';
import { blogGridItemStyleDeclaration } from './style-declarations';

/**
 * Keep Blog Custom CSS hover behavior scoped to the child element target.
 *
 * For hover-state custom CSS on multi-part selectors (e.g., title, content,
 * postMeta, featuredImage, readMore), we append `:hover` to the child element
 * selector and also include `.et_vb_hover` on the parent for VB hover-mode
 * preview. For sticky state, we retain `.et_pb_sticky` targeting on the parent
 * (module) selector. Single-part selectors pass through unchanged.
 *
 * @param {object} params Selector function params.
 * @param {string} params.selector Selector.
 * @param {string} params.state State.
 *
 * @returns {string} Selector.
 */
const blogCustomCssSelectorFunction = ({ selector, state }: { selector: string; state: string }): string => {
  const hasChildSelector = selector.includes(' ');

  if (!hasChildSelector) {
    return selector;
  }

  if ('sticky' === state) {
    const stickySelectors = selector
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
      .map(item => {
        const parts = item.split(' ');

        if (parts.length < 2) {
          return item.includes('.et_pb_sticky') ? item : `${item}.et_pb_sticky`;
        }

        const moduleSelector = parts[0];
        const childParts = parts.slice(1).join(' ');
        const stickyModuleSelector = moduleSelector.includes('.et_pb_sticky')
          ? moduleSelector
          : `${moduleSelector}.et_pb_sticky`;

        return `${stickyModuleSelector} ${childParts}`;
      });

    return Array.from(new Set(stickySelectors)).join(', ');
  }

  if ('hover' !== state) {
    return selector;
  }

  const hoverSelectors = selector
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .flatMap(item => {
      const childHoverSelector = item.includes(':hover') ? item : `${item}:hover`;
      const parts = item.split(' ');

      if (parts.length < 2) {
        return [childHoverSelector];
      }

      const moduleSelector = parts[0];
      const childParts = parts.slice(1).join(' ');
      const vbModuleSelector = moduleSelector.includes('.et_vb_hover')
        ? moduleSelector
        : `${moduleSelector}.et_vb_hover`;
      const vbPreviewSelector = `${vbModuleSelector} ${childParts}`;

      return [vbPreviewSelector, childHoverSelector];
    });

  return Array.from(new Set(hoverSelectors)).join(', ');
};

/**
 * Blog Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  attrs,
  elements,
  orderClass,
  settings,
  mode,
  state,
  noStyleTag,
  isInsideStickyModule,
  stickyParentOrderClass,
}: StylesProps<BlogAttrs>): ReactElement => {
  const primaryColor = useSelect(select => getAccentColorValue('primary', select), []);

  const paginationFontAttr = getAttrByMode(attrs?.pagination?.decoration?.font?.font);
  const paginationColor = paginationFontAttr?.color;

  // Determine layout display for conditional border rendering.
  const layoutDisplay = attrs?.blogGrid?.decoration?.layout?.desktop?.value?.display ?? 'grid';

  return (
    <StyleContainer
      mode={mode}
      state={state}
      noStyleTag={noStyleTag}
      isInsideStickyModule={isInsideStickyModule}
      stickyParentOrderClass={stickyParentOrderClass}
    >
      {/* Module */}
      {elements.style({
        attrName: 'module',
        styleProps: {
          disabledOn: {
            disabledModuleVisibility: settings?.disabledModuleVisibility,
          },
          boxShadow: {
            selectorFunction: params => {
              if ('grid' === layoutDisplay) {
                // Grid layout: Apply to individual posts.
                return `${params.selector} article.et_pb_post`;
              }

              // Fullwidth layout: Apply to module wrapper.
              return params.selector;
            },
          },
        },
      })}
      <TextStyle selector={orderClass} attr={attrs?.module?.advanced?.text} orderClass={orderClass} />

      {/* Blog Grid */}
      {elements.style({
        attrName: 'blogGrid',
        styleProps: {
          advancedStyles: [
            {
              componentName: 'divi/common',
              props: {
                attr: attrs?.blogGrid?.decoration?.layout,
                declarationFunction: blogGridItemStyleDeclaration,
                selectorFunction: params => `${params.selector} > .et_flex_column`,
              },
            },
          ],
        },
      })}

      {/* Image */}
      {elements.style({
        attrName: 'image',
      })}
      <CommonStyle
        selector={`${orderClass} .et_pb_post .entry-featured-image-url,${orderClass} .et_pb_post .et_pb_slides,${orderClass} .et_pb_post .et_pb_video_overlay`}
        attr={attrs?.image?.decoration?.border}
        declarationFunction={overflowForBorderRadiusStyleDeclaration}
        orderClass={orderClass}
      />

      {/* Title */}
      {elements.style({
        attrName: 'title',
      })}
      {/* Meta */}
      {elements.style({
        attrName: 'meta',
      })}
      {/* Content */}
      {elements.style({
        attrName: 'content',
      })}
      {/* Read more */}
      {elements.style({
        attrName: 'readMore',
      })}

      {/* Conditionally render border based on layout display */}
      {'grid' === layoutDisplay ? (
        <React.Fragment>
          {/* Post Item (Grid Layout) */}
          {elements.style({
            attrName: 'post',
          })}
          <CommonStyle
            selector={`${orderClass} .et_pb_post`}
            attr={attrs?.post?.decoration?.border}
            declarationFunction={overflowForBorderRadiusStyleDeclaration}
            orderClass={orderClass}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Fullwidth Item (Flex/Block Layout) */}
          {elements.style({
            attrName: 'fullwidth',
          })}
          <CommonStyle
            selector={`${orderClass}:not(.et_pb_blog_grid_wrapper) .et_pb_post`}
            attr={attrs?.fullwidth?.decoration?.border}
            declarationFunction={overflowForBorderRadiusStyleDeclaration}
            orderClass={orderClass}
          />
        </React.Fragment>
      )}

      {/* Overlay */}
      {elements.style({
        attrName: 'overlay',
      })}
      {/* Overlay Icon */}
      {elements.style({
        attrName: 'overlayIcon',
      })}

      {/* Masonry */}
      {elements.style({
        attrName: 'masonry',
      })}
      {/* Pagination */}
      {elements.style({
        attrName: 'pagination',
      })}

      {paginationColor ? (
        <CommonStyle
          selector={`${orderClass} .wp-pagenavi a, ${orderClass} .wp-pagenavi span.current, ${orderClass} .wp-pagenavi span.pages, ${orderClass} .wp-pagenavi span.extend, ${orderClass} .wp-pagenavi .nextpostslink, ${orderClass} .wp-pagenavi .previouspostslink, ${orderClass} .pagination a`}
          attr={attrs?.pagination?.decoration?.font?.font}
          declarationFunction={({ attrValue }: { attrValue: unknown }): string => {
            const fontAttrValue = attrValue as { color?: string };
            const color = fontAttrValue?.color;
            return color ? `color: ${color} !important;` : '';
          }}
          orderClass={orderClass}
          important
        />
      ) : (
        <CommonStyle
          selector={`${orderClass} .wp-pagenavi a, ${orderClass} .wp-pagenavi span.current, ${orderClass} .wp-pagenavi span.pages, ${orderClass} .wp-pagenavi span.extend, ${orderClass} .wp-pagenavi .nextpostslink, ${orderClass} .wp-pagenavi .previouspostslink, ${orderClass} .pagination a`}
          attr={{
            desktop: {
              value: primaryColor || 'var(--gcid-primary-color, #2ea3f2)',
            },
          }}
          property="color"
          orderClass={orderClass}
          important
        />
      )}

      <CssStyle
        selector={orderClass}
        attr={attrs.css}
        cssFields={cssFields}
        orderClass={orderClass}
        selectorFunction={blogCustomCssSelectorFunction}
      />
    </StyleContainer>
  );
};

export { ModuleStyles };
