import { addFilter } from '@wordpress/hooks';

import { elementsCallbacks } from '@divi/module-utils';
import { type ButtonAttrs, type ModuleLibrary } from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { ButtonEdit } from './edit';
import { buttonModuleMetaData } from './module.json-source';
import { buttonModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { buttonModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { optionGroupPresetPrimaryAttrNameResolverButton } from './option-group-preset-resolver';
import { placeholderContent } from './placeholder-content';

// Register the filters for Option Group Preset Data Resolver.
addFilter(
  'divi.optionGroupPresetPrimaryAttrNameResolver.diviButton',
  'divi',
  optionGroupPresetPrimaryAttrNameResolverButton,
);

/**
 * Button module.
 *
 * @since ??
 */
export const button: ModuleLibrary.Module.RegisterDefinition<ButtonAttrs> = {
  metadata: buttonModuleMetaData,
  defaultAttrs: buttonModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: buttonModuleDefaultPrintedStyleAttributes,
  renderers: {
    edit: ButtonEdit,
    styles: ModuleStyles,
  },
  callbacks: {
    content: {
      elements: elementsCallbacks,
    },
  },
  placeholderContent,
  conversionOutline,
};
