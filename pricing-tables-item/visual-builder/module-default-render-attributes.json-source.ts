import { type Metadata, type PricingTableAttrs } from '@divi/types';

/**
 * Pricing Table Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const pricingTableModuleDefaultRenderAttributes: Metadata.DefaultAttributes<PricingTableAttrs> = {
  module: {
    advanced: {
      featured: {
        desktop: {
          value: 'off',
        },
      },
    },
    decoration: {
      sizing: {
        desktop: {
          value: {
            flexType: '12_24',
          },
        },
        phone: {
          value: {
            flexType: '24_24',
          },
        },
      },
    },
  },
};

export { pricingTableModuleDefaultRenderAttributes };
