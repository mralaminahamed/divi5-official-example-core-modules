import { addFilter } from '@wordpress/hooks';

import { elementsCallbacks } from '@divi/module-utils';
import { type CtaAttrs, type ModuleLibrary } from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { CtaEdit } from './edit';
import { ctaModuleMetaData } from './module.json-source';
import { ctaModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { ctaModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { optionGroupPresetPrimaryAttrNameResolverCta } from './option-group-preset-resolver';
import { placeholderContent } from './placeholder-content';

// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviCta', 'divi', optionGroupPresetPrimaryAttrNameResolverCta);

/**
 * Call To Action module.
 *
 * @since ??
 */
export const cta: ModuleLibrary.Module.RegisterDefinition<CtaAttrs> = {
  // Imported json has no inferred type hence type-cast is necessary.
  metadata: ctaModuleMetaData,
  defaultAttrs: ctaModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: ctaModuleDefaultPrintedStyleAttributes,
  renderers: {
    edit: CtaEdit,
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
