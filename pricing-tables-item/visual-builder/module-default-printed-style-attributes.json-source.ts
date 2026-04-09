import { type Metadata, type PricingTableAttrs } from '@divi/types';

/**
 * Pricing Table Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const pricingTableModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<PricingTableAttrs> = {
  module: {
    decoration: {
      layout: {
        desktop: {
          value: {
            flexDirection: 'column',
          },
        },
      },
      border: {
        desktop: {
          value: {
            styles: {
              all: {
                width: '1px',
                color: '#bebebe',
                style: 'solid',
              },
            },
          },
        },
      },
    },
  },
  currencyFrequency: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size: '16px',
            },
          },
        },
      },
    },
  },
  subtitle: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size: '16px',
              lineHeight: '1em',
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
              size: '22px',
              lineHeight: '1em',
            },
          },
        },
      },
    },
  },
  price: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size: '80px',
              lineHeight: '82px',
            },
          },
        },
      },
      border: {
        desktop: {
          value: {
            styles: {
              all: {
                width: '0px',
                color: '#bebebe',
                style: 'solid',
              },
              bottom: {
                width: '1px',
                color: '#bebebe',
                style: 'solid',
              },
            },
          },
        },
      },
    },
  },
};

export { pricingTableModuleDefaultPrintedStyleAttributes };
