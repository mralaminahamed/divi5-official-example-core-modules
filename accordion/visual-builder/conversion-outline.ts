/* eslint-disable @typescript-eslint/naming-convention */
import { convertFontIcon } from '@divi/conversion';
import { type ModuleConversionOutline } from '@divi/types';

// wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_accordion.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    admin_label: 'module.meta.adminLabel',
    animation:   'module.decoration.animation',
    background:  'module.decoration.background',
    borders:     {
      default: 'module.decoration.border',
    },
    box_shadow: {
      default: 'module.decoration.boxShadow',
    },
    disabled_on: 'module.decoration.disabledOn',
    filters:     {
      default: 'module.decoration.filters',
    },
    fonts: {
      body:          'content.decoration.bodyFont.body',
      body_link:     'content.decoration.bodyFont.link',
      body_ol:       'content.decoration.bodyFont.ol',
      body_quote:    'content.decoration.bodyFont.quote',
      body_ul:       'content.decoration.bodyFont.ul',
      closed_toggle: 'closedToggle.decoration.font',
      toggle:        'title.decoration.font',
    },
    height:          'module.decoration.sizing',
    link_options:    'module.advanced.link',
    margin_padding:  'module.decoration.spacing',
    max_width:       'module.decoration.sizing',
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
    after:          'css.*.after',
    before:         'css.*.before',
    main_element:   'css.*.mainElement',
    open_toggle:    'css.*.openToggle',
    toggle:         'css.*.toggle',
    toggle_content: 'css.*.toggleContent',
    toggle_icon:    'css.*.toggleIcon',
    toggle_title:   'css.*.toggleTitle',
  },
  module: {
    open_toggle_background_color:   'openToggle.decoration.background.*.color',
    open_toggle_text_color:         'openToggle.decoration.font.font.*.color',
    toggle_icon:                    'closedToggleIcon.decoration.icon.*',
    icon_color:                     'closedToggleIcon.decoration.icon.*.color',
    use_icon_font_size:             'closedToggleIcon.decoration.icon.*.useSize',
    icon_font_size:                 'closedToggleIcon.decoration.icon.*.size',
    closed_toggle_background_color: 'closedToggle.decoration.background.*.color',
    closed_toggle_text_color:       'closedToggle.decoration.font.font.*.color',
    toggle_level:                   'title.decoration.font.font.*.headingLevel',
  },
  valueExpansionFunctionMap: {
    toggle_icon: convertFontIcon,
  },
};
