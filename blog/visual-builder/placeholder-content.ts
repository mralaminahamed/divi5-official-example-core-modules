import { type BlogAttrs } from '@divi/types';

export const placeholderContent: BlogAttrs = {
  blogGrid: {
    decoration: {
      layout: {
        tablet: {
          value: {
            gridColumnCount: '2',
          },
        },
        phone: {
          value: {
            gridColumnCount: '1',
          },
        },
      },
    },
  },
};
