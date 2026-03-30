import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';

/**
 * Image max-width declaration for left/right positioned blurb.
 *
 * This adds max-width: 100% only when the image width exceeds 100%
 * to prevent overflow in left/right positioned blurbs.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps} param0 Style declaration parameters.
 *
 * @returns {string} CSS declaration.
 */
export const imageMaxWidthDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<{ icon?: string; string?: string; image?: string }>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  // Get the image width value.
  const imageWidth = attrValue?.image;

  if (imageWidth) {
    // Parse the numeric value from the width string.
    const numericValue = parseFloat(imageWidth);

    // Check if the value is a percentage and exceeds 100.
    if (imageWidth.includes('%') && numericValue > 100) {
      declarations.add('max-width', '100%');
    }
  }

  return declarations.value as string;
};
