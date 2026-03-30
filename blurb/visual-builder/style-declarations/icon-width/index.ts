import { getGlobalVariableValue } from '@divi/dynamic-data';
import { type DeclarationFunctionProps } from '@divi/module';
import { isCssVariable } from '@divi/module-utils';
import { StyleDeclarations } from '@divi/style-library';

/**
 * Style declaration for blurb's image/icon width.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<{icon?: string; image?: string}>} param0 Style declaration parameters.
 *
 * @returns {string}
 */
export const iconWidthStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<{ icon?: string; image?: string }>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  if (attrValue?.icon) {
    // Check if the value is already a CSS variable (starts with 'var(').
    // If it is, preserve it as-is so it updates automatically when Global Variables change.
    // Otherwise, resolve it using getGlobalVariableValue().
    const iconWidth = isCssVariable(attrValue.icon) ? attrValue.icon : getGlobalVariableValue(attrValue.icon);

    declarations.add('font-size', iconWidth);
  }

  return declarations.value as string;
};
