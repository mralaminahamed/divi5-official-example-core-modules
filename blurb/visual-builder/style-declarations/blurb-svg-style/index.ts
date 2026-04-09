import { type DeclarationFunctionProps } from '@divi/module';
import { isFileExtension } from '@divi/module-utils';
import { StyleDeclarations } from '@divi/style-library';

/**
 * Simplified type for Blurb SVG attributes that we actually need.
 * Only handles image SVGs, not icons.
 */
type BlurbSvgAttrValue = {
  src?: string;
  useIcon?: string;
  image?: string;
};

/**
 * Style declaration for SVG images in Blurb module.
 * Only applies to images (when useIcon is off), not icons.
 *
 * @since ??
 *
 * @returns {string}
 */
export const blurbSvgStyleDeclaration = ({ attrValue }: DeclarationFunctionProps<BlurbSvgAttrValue>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: false,
  });

  // Only handle SVG images, not icons.
  // Note: useIcon is a yes/no toggle field with expected values 'on' or 'off' (default: 'off').
  // We only skip SVG image styling when useIcon is explicitly 'on' (icon mode).
  // When useIcon is 'off' or any other value (edge cases: undefined, null, ''), treat as image mode.
  const isUsingIcon = 'on' === attrValue?.useIcon;

  if (!isUsingIcon) {
    // Get src from innerContent.
    const src = attrValue?.src;

    // Check if this is an SVG (isFileExtension handles empty/undefined gracefully).
    const hasSVGExtension = src && isFileExtension(src, 'svg');

    if (hasSVGExtension) {
      // Get the image width value from the merged attributes.
      // Note: The width is at attrValue?.image after attribute merging, confirmed via debug testing.
      // When user sets width in Design > Sizing > Width, the value appears here (e.g., '90%').
      const width = attrValue?.image;

      // Use user's width if set, otherwise fallback to 100%
      declarations.add('width', width || '100%');

      // Use auto height for SVGs
      declarations.add('height', 'auto');
    }
  }

  return declarations.value as string;
};
