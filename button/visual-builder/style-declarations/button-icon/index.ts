import { type ButtonIconStyleDeclarationParams, StyleDeclarations } from '@divi/style-library';

/**
 * Generate a style declaration for a button's icon.
 *
 * @since ??
 *
 * @returns {string} The generated style declaration for the button's icon.
 */
export const buttonIconStyleDeclaration = ({ attrValue }: ButtonIconStyleDeclarationParams): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important: {
      'font-size': true,
      'line-height': true,
    },
  });

  // Skip icon styles when "Use Custom Styles For Button" is disabled.
  // This matches D4 behavior where disabling custom styles removes icon styles.
  const enable = attrValue?.enable ?? 'off';
  if ('off' === enable) {
    return declarations.value as string;
  }

  // This code matches the logic in ButtonModule.php::icon_style_declaration.
  // Add margin-left based on icon placement to position the icon correctly.
  const iconPlacement = attrValue?.icon?.placement ?? 'right';
  const hasCustomIcon = Boolean(attrValue?.icon?.settings?.unicode);

  if ('left' === iconPlacement) {
    declarations.add('margin-left', '-1.3em');
  } else if (hasCustomIcon) {
    declarations.add('margin-left', '0.3em');
  }

  declarations.add('line-height', '1em');

  return declarations.value as string;
};
