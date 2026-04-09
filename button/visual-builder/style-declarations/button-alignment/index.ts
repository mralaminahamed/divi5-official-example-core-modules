import { type ButtonAlignmentDeclarationParams, StyleDeclarations } from '@divi/style-library';

/**
 * Button alignment for wrapper (text-align only).
 *
 * @since ??
 *
 * @param {object} params Parameters for generating Button alignment.
 * @param {object} params.attrValue The value of the attribute.
 *
 * @returns {string} The generated button alignment styles for wrapper.
 */
export const buttonAlignmentWrapperDeclaration = ({ attrValue }: ButtonAlignmentDeclarationParams): string => {
  const alignment = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  if (alignment) {
    declarations.add('text-align', alignment);
  }

  return declarations.value as string;
};

/**
 * Button alignment for anchor tag (margin-left and margin-right only).
 *
 * @since ??
 *
 * @param {object} params Parameters for generating Button alignment.
 * @param {object} params.attrValue The value of the attribute.
 *
 * @returns {string} The generated button alignment styles for anchor tag.
 */
export const buttonAlignmentAnchorDeclaration = ({ attrValue }: ButtonAlignmentDeclarationParams): string => {
  const alignment = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  if (alignment) {
    switch (alignment) {
      case 'left':
        declarations.add('margin-left', '0');
        declarations.add('margin-right', 'auto');
        break;
      case 'center':
        declarations.add('margin-left', 'auto');
        declarations.add('margin-right', 'auto');
        break;
      case 'right':
        declarations.add('margin-left', 'auto');
        declarations.add('margin-right', '0');
        break;
      default:
        break;
    }
  }

  return declarations.value as string;
};
