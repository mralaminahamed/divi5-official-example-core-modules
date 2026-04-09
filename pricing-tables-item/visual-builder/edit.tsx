import React, { type ReactElement, useEffect, useRef } from 'react';
import { isEmpty } from 'lodash';

import { ChildModulesContainer, InnerMousetrap, ModuleContainer } from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';

import { moduleClassnames } from './module-classnames';
import { ModuleStyles } from './module-styles';
import { type PricingTableEditProps } from './types';
import { rawContentProcessor, saveContentProcessor } from './utils';

/**
 * Pricing Table component of visual builder.
 *
 * @since ??
 *
 * @param {PricingTableEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
export const PricingTableEdit = ({
  attrs,
  childrenIds,
  id,
  name,
  elements,
  parentAttrs,
  defaultPrintedStyleAttrs,
  isLooped,
  loopIndex,
  canvasId,
}: PricingTableEditProps): ReactElement => {
  const per = getAttrByMode(attrs?.currencyFrequency?.innerContent)?.per ?? '';
  const currency = getAttrByMode(attrs?.currencyFrequency?.innerContent)?.currency ?? '';
  const parentHeadingLevel = getAttrByMode(parentAttrs?.title?.decoration?.font?.font)?.headingLevel ?? 'h2';
  let headingLevel = getAttrByMode(attrs?.title?.decoration?.font?.font)?.headingLevel;
  headingLevel = isEmpty(headingLevel) ? parentHeadingLevel : headingLevel;
  const mountedRef = useRef(false);
  const pricingTableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $pricingTable = jQuery<HTMLElement>(pricingTableRef.current);

    if (!mountedRef.current) {
      setTimeout(() => {
        if ('function' === typeof window.et_fix_pricing_currency_position) {
          window.et_fix_pricing_currency_position($pricingTable);
        }
      }, 100);

      mountedRef.current = true;
    } else {
      // Only update Pricing Table DOM if currency has changed.
      setTimeout(() => {
        if ('function' === typeof window.et_fix_pricing_currency_position) {
          window.et_fix_pricing_currency_position($pricingTable);
        }
      }, 100);
    }
  }, [currency]);

  return (
    <ModuleContainer
      domRef={pricingTableRef}
      attrs={attrs}
      parentAttrs={parentAttrs}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      id={id}
      name={name}
      stylesComponent={ModuleStyles}
      hasModuleClassName
      classnamesFunction={moduleClassnames}
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      <InnerMousetrap type="edited" />
      {elements.styleComponents({
        attrName: 'module',
      })}
      <div className="et_pb_pricing_heading">
        {elements.render({
          attrName: 'title',
          tagName: headingLevel,
        })}
        {elements.render({
          attrName: 'subtitle',
        })}
      </div>
      <div className="et_pb_pricing_content_top">
        <InnerMousetrap type="edited" />
        <span className="et_pb_et_price">
          {elements.render({
            attrName: 'currencyFrequency',
            attrSubName: 'currency',
            className: 'et_pb_dollar_sign',
            inlineTextEditorProps: {
              className: 'et_pb_dollar_sign',
              tagName: 'span',
            },
          })}
          {elements.render({
            attrName: 'price',
          })}
          {!isEmpty(per) && (
            <span className="et_pb_frequency">
              <span className="et_pb_frequency_slash">/</span>
              {elements.render({
                attrName: 'currencyFrequency',
                attrSubName: 'per',
                inlineTextEditorProps: {
                  tagName: 'span',
                },
              })}
            </span>
          )}
        </span>
      </div>
      {elements.render({
        attrName: 'content',
        inlineEditor: 'richText',
        className: 'et_pb_pricing_content',
        inlineRichTextEditorProps: {
          rawContentProcessor,
          saveContentProcessor,
          innerMousetrap: true,
        },
      })}
      {elements.render({
        attrName: 'button',
      })}
      {childrenIds && childrenIds.length > 0 && (
        <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} canvasId={canvasId} />
      )}
    </ModuleContainer>
  );
};
