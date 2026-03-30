import React, { type ReactElement, useRef } from 'react';

import { ChildModulesContainer, ModuleContainer } from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type PricingTablesEditProps } from './types';
import { getFeaturedPricingTablesClassname } from './utils';
import './style.scss';

/**
 * Pricing Tables component of visual builder.
 *
 * @since ??
 *
 * @param {PricingTablesEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
export const PricingTablesEdit = ({
  attrs,
  id,
  isFirst,
  isLast,
  name,
  childrenIds,
  elements,
  defaultPrintedStyleAttrs,
  isLooped,
  loopIndex,
  canvasId,
}: PricingTablesEditProps): ReactElement => {
  const pricingTablesRef = useRef(null);

  // Get classname based upon children's featured pricing table status.
  const featuredPricingTablesClassname = getFeaturedPricingTablesClassname(childrenIds);
  return (
    <ModuleContainer
      attrs={attrs}
      domRef={pricingTablesRef}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      classnamesFunction={moduleClassnames}
      className={featuredPricingTablesClassname}
      childrenIds={childrenIds}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      cssPosition="before"
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {childrenIds && childrenIds.length > 0 && (
        <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} canvasId={canvasId} />
      )}
    </ModuleContainer>
  );
};
