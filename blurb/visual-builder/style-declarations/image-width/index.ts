import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';

/**
 * Style declaration for blurb's image/icon width.
 *
 * Matches D4's conditional logic:
 * - Uses `width` for px values (or SVG images, handled separately)
 * - Uses `max-width` for percentage values to preserve aspect ratio.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<{icon?: string; image?: string}>} param0 Style declaration parameters.
 *
 * @returns {string}
 */
export const imageWidthStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<{ icon?: string; image?: string }>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  if (attrValue?.image) {
    const widthValue = attrValue.image;
    // D4 logic: use 'width' for px values, 'max-width' for percentages/other units
    // This preserves aspect ratio for percentage values (prevents vertical stretching)
    const property = widthValue.includes('px') ? 'width' : 'max-width';
    declarations.add(property, widthValue);
  }

  return declarations.value as string;
};
