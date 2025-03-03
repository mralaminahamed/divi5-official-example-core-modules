/* eslint-disable @typescript-eslint/naming-convention */
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_button.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    admin_label: 'module.meta.adminLabel',
    animation:   'module.decoration.animation',
    box_shadow:  {
      default: 'module.decoration.boxShadow',
    },
    button: {
      button: 'button',
    },
    disabled_on:        'module.decoration.disabledOn',
    display_conditions: 'module.decoration.conditions',
    filters:            {
      default: 'module.decoration.filters',
    },
    margin_padding:  'module.decoration.spacing',
    module:          'module.advanced.htmlAttributes',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    scroll:          'module.decoration.scroll',
    sticky:          'module.decoration.sticky',
    text:            'module.advanced.text',
    text_shadow:     {
      default: 'module.advanced.text.textShadow',
    },
    transform:  'module.decoration.transform',
    transition: 'module.decoration.transition',
    z_index:    'module.decoration.zIndex',
  },
  css: {
    after:        'css.*.after',
    free_form:    'css.*.freeForm',
    before:       'css.*.before',
    main_element: 'css.*.mainElement',
  },
  module: {
    button_text:      'button.innerContent.*.text',
    button_url:       'button.innerContent.*.linkUrl',
    url_new_window:   'button.innerContent.*.linkTarget',
    custom_button:    'button.decoration.button.*.enable',
    button_alignment: 'module.advanced.alignment.*',
  },
};
