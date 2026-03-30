import React, { Fragment, type ReactElement, useRef } from 'react';
import { isEmpty, isNil } from 'lodash';

import { DynamicData, useDynamicData } from '@divi/dynamic-data';
import { processFontIcon } from '@divi/icon-library';
import { ChildModulesContainer, ModuleContainer } from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type ButtonEditProps } from './types';
import { extractLinkTitle } from './utils';
import { wrapperClassnames } from './wrapper-classnames';
import './style.scss';

/**
 * Button Edit component of visual builder.
 *
 * @since ??
 *
 * @param {ButtonEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const ButtonEdit = ({
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
}: ButtonEditProps): ReactElement => {
  const buttonRef = useRef(null);

  // TODO consider use `<ButtonComponent />` to render the button.
  const linkValue = attrs?.button?.innerContent?.desktop?.value?.linkUrl;
  const textValue = getAttrByMode(attrs?.button?.innerContent)?.text || linkValue;

  const linkValueDynamic = useDynamicData(linkValue);

  const hasCustomButton = 'on' === attrs?.button?.decoration?.button?.desktop?.value?.enable;
  const isIconEnabled = 'on' === attrs?.button?.decoration?.button?.desktop?.value?.icon?.enable;

  // Dynamically process all breakpoints in button decoration.
  const buttonDecoration = attrs?.button?.decoration?.button;
  const iconDataAttrs: Record<string, string | null> = {};

  // Convert camelCase breakpoint name to kebab-case for data attribute (e.g., phoneWide -> phone-wide).
  const breakpointToDataAttr = (breakpoint: string): string => {
    if ('desktop' === breakpoint) {
      return 'data-icon';
    }
    return `data-icon-${breakpoint.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  };

  if (buttonDecoration) {
    Object.keys(buttonDecoration).forEach(breakpoint => {
      const breakpointValue = buttonDecoration[breakpoint as keyof typeof buttonDecoration];
      const iconSettings = breakpointValue?.value?.icon?.settings;

      if (hasCustomButton && isIconEnabled && !isNil(iconSettings) && iconSettings) {
        const processedIcon = processFontIcon(iconSettings);
        const dataAttrName = breakpointToDataAttr(breakpoint);
        iconDataAttrs[dataAttrName] = processedIcon;
      }
    });
  }

  const renderedRel = attrs?.button?.innerContent?.desktop?.value?.rel;
  const linkTarget = 'on' === attrs?.module?.advanced?.link?.desktop?.value?.target ? '_blank' : null;
  const hasChildren = Boolean(childrenIds && childrenIds.length > 0);
  const shouldSeparateChildren = hasChildren;
  const childModules = hasChildren ? (
    <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} canvasId={canvasId} />
  ) : null;

  return (
    <ModuleContainer
      attrs={attrs}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      domRef={buttonRef}
      elements={elements}
      htmlAttrs={{
        href: linkValueDynamic?.resolvedValue,
        target: linkTarget,
        rel: isEmpty(renderedRel) ? null : renderedRel.join(' '),
        draggable: 'false',
        ...iconDataAttrs,
      }}
      classnamesFunction={moduleClassnames}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      hasModuleClassName
      hasModuleWrapper
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      tag="a"
      hasHoveredClassName
      wrapperClassnamesFunction={wrapperClassnames}
      wrapperHtmlAttrs={{
        'data-wrapper-id': id,
      }}
      isLooped={isLooped}
      loopIndex={loopIndex}
      wrapperChildren={shouldSeparateChildren ? childModules : null}
    >
      {elements.styleComponents({
        attrName: 'button',
      })}
      <DynamicData value={textValue} loaderWidth={60}>
        {({ resolvedValue }) => (
          <Fragment>{'string' === typeof resolvedValue ? extractLinkTitle(resolvedValue) : resolvedValue}</Fragment>
        )}
      </DynamicData>
      {!shouldSeparateChildren && childModules}
    </ModuleContainer>
  );
};

export { ButtonEdit };
