import { type Module } from '@divi/types';

import { removeIconAttrValue } from '../index';

describe('removeIconAttrValue()', () => {
  describe('Basic functionality', () => {
    test('should remove icon property from single breakpoint and state', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            alignment: 'center',
            icon: {
              enable: 'on',
              settings: {
                unicode: '\\e000',
                type: 'fontawesome',
              },
            },
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result).toEqual({
        desktop: {
          value: {
            enable: 'on',
            alignment: 'center',
          },
        },
      });
    });

    test('should preserve other properties when removing icon', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            alignment: 'left',
            icon: {
              enable: 'on',
            },
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result.desktop?.value).toEqual({
        enable: 'on',
        alignment: 'left',
      });
      expect(result.desktop?.value?.icon).toBeUndefined();
    });
  });

  describe('Multiple breakpoints', () => {
    test('should remove icon from all breakpoints', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
        },
        tablet: {
          value: {
            enable: 'on',
            icon: {
              enable: 'off',
            },
          },
        },
        phone: {
          value: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result.desktop?.value?.icon).toBeUndefined();
      expect(result.tablet?.value?.icon).toBeUndefined();
      expect(result.phone?.value?.icon).toBeUndefined();
      expect(result.desktop?.value?.enable).toBe('on');
      expect(result.tablet?.value?.enable).toBe('on');
      expect(result.phone?.value?.enable).toBe('on');
    });
  });

  describe('Multiple attribute states', () => {
    test('should remove icon from all attribute states (value, hover, sticky)', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
          hover: {
            enable: 'on',
            icon: {
              enable: 'off',
            },
          },
          sticky: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result.desktop?.value?.icon).toBeUndefined();
      expect(result.desktop?.hover?.icon).toBeUndefined();
      expect(result.desktop?.sticky?.icon).toBeUndefined();
      expect(result.desktop?.value?.enable).toBe('on');
      expect(result.desktop?.hover?.enable).toBe('on');
      expect(result.desktop?.sticky?.enable).toBe('on');
    });
  });

  describe('Complex scenarios', () => {
    test('should remove icon from all breakpoints and all states', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            alignment: 'center',
            icon: {
              enable: 'on',
              settings: {
                unicode: '\\e000',
              },
            },
          },
          hover: {
            enable: 'on',
            icon: {
              enable: 'off',
            },
          },
        },
        tablet: {
          value: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
          sticky: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
        },
        phone: {
          value: {
            enable: 'on',
            icon: {
              enable: 'off',
            },
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      // Desktop - value
      expect(result.desktop?.value?.icon).toBeUndefined();
      expect(result.desktop?.value?.enable).toBe('on');
      expect(result.desktop?.value?.alignment).toBe('center');

      // Desktop - hover
      expect(result.desktop?.hover?.icon).toBeUndefined();
      expect(result.desktop?.hover?.enable).toBe('on');

      // Tablet - value
      expect(result.tablet?.value?.icon).toBeUndefined();
      expect(result.tablet?.value?.enable).toBe('on');

      // Tablet - sticky
      expect(result.tablet?.sticky?.icon).toBeUndefined();
      expect(result.tablet?.sticky?.enable).toBe('on');

      // Phone - value
      expect(result.phone?.value?.icon).toBeUndefined();
      expect(result.phone?.value?.enable).toBe('on');
    });
  });

  describe('Edge cases', () => {
    test('should handle empty attributes object', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {};

      const result = removeIconAttrValue(buttonAttrs);

      expect(result).toEqual({});
    });

    test('should handle attributes without icon property', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            alignment: 'center',
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result).toEqual(buttonAttrs);
    });

    test('should handle attributes with empty icon object', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            icon: {},
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result.desktop?.value?.icon).toBeUndefined();
      expect(result.desktop?.value?.enable).toBe('on');
    });

    test('should handle partial breakpoint data', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
        },
        tablet: {
          hover: {
            enable: 'on',
            icon: {
              enable: 'off',
            },
          },
        },
      };

      const result = removeIconAttrValue(buttonAttrs);

      expect(result.desktop?.value?.icon).toBeUndefined();
      expect(result.tablet?.hover?.icon).toBeUndefined();
      expect(result.desktop?.value?.enable).toBe('on');
      expect(result.tablet?.hover?.enable).toBe('on');
    });
  });

  describe('Immutability', () => {
    test('should not mutate the original attributes object', () => {
      const buttonAttrs: Module.Element.Decoration.Button.Attributes = {
        desktop: {
          value: {
            enable: 'on',
            icon: {
              enable: 'on',
            },
          },
        },
      };

      const originalIcon = buttonAttrs.desktop?.value?.icon;

      removeIconAttrValue(buttonAttrs);

      expect(buttonAttrs.desktop?.value?.icon).toEqual(originalIcon);
      expect(buttonAttrs.desktop?.value?.icon).toBeDefined();
    });
  });
});
