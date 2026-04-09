import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

/**
 * Get Blog Grid Item's CSS declaration for horizontal gap.
 *
 * @since ??
 *
 * @param {object} params Parameters for the Blog Grid Item's CSS declaration.
 * @param {boolean} params.important Indicates whether the declaration is important.
 * @param {string} params.returnType The return type of the declaration.
 *
 * @returns {string|object} Blog Grid Item CSS declaration.
 */
export const blogGridItemStyleDeclaration = ({
  important = false,
  returnType = 'string',
}: DeclarationFunctionProps<Module.Element.Decoration.Layout.AttributeValue>): string => {
  const declarations = new StyleDeclarations({
    returnType,
    important,
  });

  return declarations.value as string;
};
