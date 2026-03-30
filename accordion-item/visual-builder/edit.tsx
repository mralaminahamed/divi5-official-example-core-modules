import React, { type ReactElement, useRef } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import { ChildModulesContainer, ModuleContainer } from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type AccordionItemEditProps } from './types';
import { getHeadingLevel } from './utils';
import './style.scss';

/**
 * Toggle component of visual builder.
 *
 * @since ??
 *
 * @param {AccordionItemEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const AccordionItemEdit = ({
  attrs,
  defaultPrintedStyleAttrs,
  id,
  name,
  parentAttrs,
  elements,
  isLast,
  isLooped,
  loopIndex,
  childrenIds,
  canvasId,
}: AccordionItemEditProps): ReactElement => {
  const accordionItemRef = useRef(null);
  const headingLevel = getHeadingLevel(attrs, parentAttrs);

  /**
   * Layout classes for content element.
   * These classes are merged with the existing 'et_pb_toggle_content' class from metadata.
   */
  const layoutDisplayValue = get(attrs, 'module.decoration.layout.desktop.value.display', 'flex') as string;
  const contentClasses = classNames({
    et_flex_module: 'flex' === layoutDisplayValue,
    et_grid_module: 'grid' === layoutDisplayValue,
  });

  return (
    <ModuleContainer
      attrs={attrs}
      domRef={accordionItemRef}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      parentAttrs={parentAttrs}
      id={id}
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      isLast={isLast}
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {elements.render({
        attrName: 'title',
        tagName: headingLevel,
      })}
      {/* @todo: toggle overlay for icon quick access. */}
      {elements.render({
        attrName: 'content',
        className: contentClasses,
        children:
          childrenIds && childrenIds.length > 0 ? (
            <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} canvasId={canvasId} />
          ) : null,
      })}
    </ModuleContainer>
  );
};

export { AccordionItemEdit };
