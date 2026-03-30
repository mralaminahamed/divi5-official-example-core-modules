import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

/**
 * Button alignment for button tag (margin-left and margin-right only).
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Button.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string} The generated button alignment styles for button tag.
 */
export const buttonAlignmentDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Button.AttributeValue>): string => {
  if (!attrValue) {
    return '';
  }

  const { alignment } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  switch (alignment) {
    case 'left':
      declarations.add('margin-left', '0');
      declarations.add('margin-right', 'auto');
      break;
    case 'center':
      declarations.add('margin-left', 'auto');
      declarations.add('margin-right', 'auto');
      break;
    default: // 'right' is default.
      declarations.add('margin-left', 'auto');
      declarations.add('margin-right', '0');
      break;
  }

  return declarations.value as string;
};
