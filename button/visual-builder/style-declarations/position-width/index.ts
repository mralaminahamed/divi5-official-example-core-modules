import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

/**
 * Generates a style declaration to ensure the Button module has `width: 100%`
 * when its position is set to `absolute` with center-aligned horizontal origin
 * (top center, center center, or bottom center).
 *
 * This resolves an issue where the Button module wrapper would shrink-wrap to its content
 * width when absolutely positioned with center origin, causing button text to wrap into two lines
 * in narrow columns.
 *
 * @since ??
 *
 * @param {
 * DeclarationFunctionProps<Module.Element.Decoration.Position.AttributeValue>
 * } props The declaration properties containing position attributes.
 *
 * @returns {string} The generated CSS declarations.
 *
 * @example
 * ```ts
 * import { positionWidthStyleDeclaration } from './positionWidthStyleDeclaration';
 *
 * const styles = positionWidthStyleDeclaration({
 *   attrValue: { mode: 'absolute', origin: { absolute: 'top center' } }
 * });
 *
 * console.log(styles); // Outputs: "width: 100%;"
 * ```
 */
export const positionWidthStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Position.AttributeValue>): string => {
  const { mode, origin } = attrValue ?? {};

  if (!mode) {
    return '';
  }

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  // Only apply width when position is absolute and origin is center-aligned horizontally.
  if ('absolute' === mode) {
    const absoluteOrigin = origin?.absolute;
    const isCenterPosition =
      'top center' === absoluteOrigin || 'center center' === absoluteOrigin || 'bottom center' === absoluteOrigin;

    if (isCenterPosition) {
      declarations.add('width', '100%');
    }
  }

  return declarations.value as string;
};
