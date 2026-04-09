import React, { type ReactElement } from 'react';
import { isNil, merge } from 'lodash';

import { type CommonStyleProps, CssStyle, StyleContainer, type StylesProps } from '@divi/module';
import { isFileExtension } from '@divi/module-utils';
import { overflowForBorderRadiusStyleDeclaration } from '@divi/style-library';
import { type BlurbAttrs } from '@divi/types';

import {
  blurbSvgStyleDeclaration,
  contentAlignmentStyleDeclaration,
  iconStyleDeclaration,
  iconWidthStyleDeclaration,
  imageAlignmentStyleDeclaration,
  imageMaxWidthDeclaration,
  imageWidthStyleDeclaration,
} from './style-declarations';

/**
 * Blurb Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
  styleGroup,
}: StylesProps<BlurbAttrs>): ReactElement => {
  const useIcon = 'on' === (attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon ?? 'off');

  // Determine if icon width styles should be rendered:
  // - always render when rendering preset styles (useIcon attribute is not available in preset attributes).
  // - only render when icon is enabled when rendering module styles.
  const renderIconWidthStyleDeclaration = 'module' !== styleGroup || useIcon;

  // Determine if image width styles should be rendered:
  // - always render when rendering preset styles (useIcon attribute is not available in preset attributes).
  // - only render when icon is disable when rendering module styles.
  const renderImageWidthStyleDeclaration = 'module' !== styleGroup || !useIcon;

  // Create icon width style props if icon width styles should be rendered.
  const renderIconWidthProps: CommonStyleProps<BlurbAttrs['imageIcon']['advanced']['width']> =
    renderIconWidthStyleDeclaration
      ? {
          selector: `${orderClass} .et-pb-icon`,
          attr: attrs?.imageIcon?.advanced?.width,
          declarationFunction: iconWidthStyleDeclaration,
        }
      : null;

  // Determine image width selector based on D4's conditional logic:
  // - When placement is "top" (or empty/nil, which defaults to "top") AND image is SVG:
  //   apply width to parent `.et_pb_main_blurb_image` to preserve left alignment.
  // - Otherwise: apply width to wrapper `.et_pb_image_wrap.et_pb_only_image_mode_wrap`.
  const imageSrc = attrs?.imageIcon?.innerContent?.desktop?.value?.src;
  const placement = attrs?.imageIcon?.advanced?.placement?.desktop?.value;
  const isPlacementTop = isNil(placement) || '' === placement || 'top' === placement;
  const isImageSvg = imageSrc && isFileExtension(imageSrc, 'svg');
  const imageWidthSelector =
    isPlacementTop && isImageSvg
      ? `${orderClass} .et_pb_main_blurb_image`
      : `${orderClass} .et_pb_main_blurb_image .et_pb_image_wrap.et_pb_only_image_mode_wrap`;

  // Create image width style props if image width styles should be rendered.
  const renderImageWidthProps: CommonStyleProps<BlurbAttrs['imageIcon']['advanced']['width']> =
    renderImageWidthStyleDeclaration
      ? {
          selector: imageWidthSelector,
          attr: attrs?.imageIcon?.advanced?.width,
          declarationFunction: imageWidthStyleDeclaration,
        }
      : null;

  return (
    <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
      {/* Module */}
      {elements.style({
        attrName: 'module',
        styleProps: {
          disabledOn: {
            disabledModuleVisibility: settings?.disabledModuleVisibility,
          },
          advancedStyles: [
            {
              componentName: 'divi/background',
              props: {
                attr: attrs?.module?.decoration?.background,
              },
            },
            {
              componentName: 'divi/text',
              props: {
                selector: `${orderClass} .et_pb_blurb_container`,
                attr: attrs?.module?.advanced?.text,
              },
            },
            {
              componentName: 'divi/common',
              props: {
                attr: attrs?.module?.decoration?.border,
                declarationFunction: params =>
                  overflowForBorderRadiusStyleDeclaration({
                    ...params,
                    overflowAttr: attrs?.module?.decoration?.overflow,
                  }),
              },
            },
            {
              componentName: 'divi/common',
              props: {
                selector: `${orderClass} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, ${orderClass} .et_pb_main_blurb_image .et-pb-icon`,
                attr: attrs?.imageIcon?.decoration?.border,
                declarationFunction: overflowForBorderRadiusStyleDeclaration,
              },
            },
          ],
        },
      })}
      {/* Image Icon */}
      {elements.style({
        attrName: 'imageIcon',
        styleProps: {
          advancedStyles: [
            {
              componentName: 'divi/common',
              props: {
                selector: `${orderClass} .et-pb-icon`,
                selectors: {
                  desktop: {
                    value: `${orderClass} .et-pb-icon`,
                    hover: `${orderClass}{{:hover}} .et-pb-icon`,
                  },
                },
                attr: attrs?.imageIcon?.advanced?.color,
                property: 'color',
                orderClass,
              },
            },
            {
              componentName: 'divi/common',
              props: {
                selector: `${orderClass} .et-pb-icon::after`,
                attr: attrs?.imageIcon?.innerContent,
                declarationFunction: iconStyleDeclaration,
              },
            },
            {
              componentName: 'divi/common',
              props: renderIconWidthProps,
            },
            {
              componentName: 'divi/common',
              props: renderImageWidthProps,
            },
            {
              componentName: 'divi/common',
              props: {
                selector: `${orderClass}.et_pb_blurb_position_left .et_pb_main_blurb_image .et_pb_image_wrap.et_pb_only_image_mode_wrap, ${orderClass}.et_pb_blurb_position_right .et_pb_main_blurb_image .et_pb_image_wrap.et_pb_only_image_mode_wrap`,
                attr: attrs?.imageIcon?.advanced?.width,
                declarationFunction: imageMaxWidthDeclaration,
              },
            },
            {
              componentName: 'divi/common',
              props: {
                selector: `${orderClass} .et_pb_blurb_content`,
                attr: attrs?.imageIcon?.advanced?.alignment,
                declarationFunction: contentAlignmentStyleDeclaration,
              },
            },
            isNil(attrs?.imageIcon?.advanced?.placement?.desktop?.value) ||
            'top' === attrs?.imageIcon?.advanced?.placement?.desktop?.value
              ? {
                  // In D4, image alignment is used only when placement is top.
                  componentName: 'divi/common',
                  props: {
                    selector: isImageSvg
                      ? `${orderClass} .et_pb_main_blurb_image`
                      : `${orderClass} .et_pb_main_blurb_image .et_pb_image_wrap`,
                    attr: attrs?.imageIcon?.advanced?.alignment,
                    declarationFunction: imageAlignmentStyleDeclaration,
                  },
                }
              : null,
            {
              componentName: 'divi/common',
              props: {
                selector: `${orderClass} .et_pb_main_blurb_image .et_pb_image_wrap img`,
                attr: merge({}, attrs?.imageIcon?.innerContent, attrs?.imageIcon?.advanced?.width),
                declarationFunction: blurbSvgStyleDeclaration,
              },
            },
          ],
        },
      })}

      {/* Title */}
      {elements.style({
        attrName: 'title',
      })}

      {/* Content */}
      {elements.style({
        attrName: 'content',
      })}

      {/* Content Container */}
      {elements.style({
        attrName: 'contentContainer',
      })}
      {/* Module
       * This is only to output the CSS form Custom CSS from Advanced Tab
       * at the very end of the DOM, so that it can override the css from
       * design tab. This is to fix the issue for re-ordering css
       * https://github.com/elegantthemes/Divi/issues/38331
       *
       * This may not be the ideal solution as per the conversation here
       * https://elegantthemes.slack.com/archives/C01CW343ZJ9/p1724934785470029?
       * thread_ts=1708688820.993489&cid=C01CW343ZJ9
       * so might need to re-visit this sometime later.
       */}
      <CssStyle
        selector={`${orderClass}.et_pb_blurb`}
        attr={attrs.css}
        cssFields={elements?.moduleMetadata?.customCssFields}
      />
    </StyleContainer>
  );
};

export { ModuleStyles };
