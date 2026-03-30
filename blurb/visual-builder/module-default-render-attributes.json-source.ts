import { type BlurbAttrs, type Metadata } from '@divi/types';

/**
 * Blurb Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const blurbModuleDefaultRenderAttributes: Metadata.DefaultAttributes<BlurbAttrs> = {
  imageIcon: {
    innerContent: {
      desktop: {
        value: {
          useIcon: 'off',
          animation: 'top',
        },
      },
    },
    advanced: {
      color: {
        desktop: {
          value: '$variable({"type":"color","value":{"name":"gcid-primary-color","settings":{}}})$',
        },
      },
      placement: {
        desktop: {
          value: 'top',
        },
      },
    },
  },
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Blurb',
        },
      },
    },
    advanced: {
      text: {
        text: {
          desktop: {
            value: {
              color: 'light',
            },
          },
        },
      },
    },
  },
  title: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              headingLevel: 'h4',
            },
          },
        },
      },
    },
  },
};

export { blurbModuleDefaultRenderAttributes };
