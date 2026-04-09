import { type Metadata, type PricingTablesAttrs } from '@divi/types';

/**
 * Pricing Tables Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const pricingTablesModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<PricingTablesAttrs> = {
  module: {
    decoration: {
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
      layout: {
        desktop: {
          value: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '30px',
            rowGap: '0px',
          },
        },
        phone: {
          value: {
            flexDirection: 'column',
          },
        },
      },
      position: {
        desktop: {
          value: {
            mode: 'relative',
            origin: {
              relative: 'top left',
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
};

export { pricingTablesModuleDefaultPrintedStyleAttributes };
