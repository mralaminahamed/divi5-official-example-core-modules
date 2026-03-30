import { getGlobalVariableValue } from '@divi/dynamic-data';
import { numericParseValue } from '@divi/field-library';
import { type DeclarationFunctionProps } from '@divi/module';
import { isCssKeyword, isCssMathFunction, isCssVariable, isNonRelativeCssUnit } from '@divi/module-utils';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

import { accordionModuleDefaultPrintedStyleAttributes } from '../../module-default-printed-style-attributes.json-source';

/**
 * Style declaration for accordion's toggle icon.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const toggleIconStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>): string => {
  const {
    useSize,
    size: maybeGlobalVariableSize, // size can be $variable({"type":"content","value":{"name":"gvid-9xi2vm8gf9","settings":{}}})$ when a Global variable is used.
  } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  const size = getGlobalVariableValue(maybeGlobalVariableSize);

  if ('on' === useSize && size) {
    // Hence we can not directly calculate the css math functions in JS,
    // It can only be calculated on the Browser in runtime.
    // So, the numericParseValue( $size ) will return null for the CSS math functions.
    // And now, we have added isCssMathFunction() to check, if it is a CSS math function or not.
    // If it is a CSS math function, we are sending the right: property value with its original format.
    // Same applies to CSS variables and CSS keywords (inherit, unset, etc.).
    if (isCssMathFunction(size) || isCssVariable(size) || isCssKeyword(size)) {
      declarations.add('right', size);
    } else {
      const iconSize = numericParseValue(size);

      if (iconSize && isNonRelativeCssUnit(iconSize.valueUnit)) {
        const defaultIconSize = numericParseValue(
          accordionModuleDefaultPrintedStyleAttributes?.closedToggleIcon?.decoration?.icon?.desktop?.value?.size,
        );
        if (defaultIconSize) {
          const sizeDiff = defaultIconSize.valueNumber - iconSize.valueNumber;
          declarations.add('right', `${0 !== sizeDiff ? Math.round(sizeDiff / 2) : 0}${iconSize.valueUnit}`);
        }
      } else if (iconSize) {
        // Set line-height to normal for relative units to override the general Icon style declaration.
        declarations.add('line-height', 'normal');
      }
    }
  }

  return declarations.value as string;
};
