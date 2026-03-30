import React, { type ReactElement, useRef } from 'react';

import { ChildModulesContainer, ModuleContainer } from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type CtaEditProps } from './types';

/**
 * Call To Action component of visual builder.
 *
 * @since ??
 *
 * @param {CtaEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const CtaEdit = ({
  attrs,
  defaultPrintedStyleAttrs,
  id,
  isFirst,
  isLast,
  name,
  elements,
  isLooped,
  loopIndex,
  childrenIds,
  canvasId,
}: CtaEditProps): ReactElement => {
  const ctaRef = useRef(null);

  return (
    <ModuleContainer
      attrs={attrs}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      domRef={ctaRef}
      elements={elements}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      <div className="et_pb_promo_description">
        {elements.render({
          attrName: 'title',
        })}
        {elements.render({
          attrName: 'content',
        })}
      </div>
      {elements.render({
        attrName: 'button',
      })}
      {childrenIds && childrenIds.length > 0 && (
        <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} canvasId={canvasId} />
      )}
    </ModuleContainer>
  );
};

export { CtaEdit };
