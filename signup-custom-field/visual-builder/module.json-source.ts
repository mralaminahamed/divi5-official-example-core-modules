import { __ } from '@wordpress/i18n';

import { type Metadata, type SignupCustomFieldAttrs } from '@divi/types';

/**
 * Custom Field Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const signupCustomFieldModuleMetaData: Metadata.Values<SignupCustomFieldAttrs> = {
  name: 'divi/signup-custom-field',
  d4Shortcode: 'et_pb_signup_custom_field',
  moduleClassName: 'et_pb_signup_custom_field',
  moduleOrderClassName: 'et_pb_signup_custom_field',
  title: __('Custom Field', 'et_builder_5'),
  titles: __('Custom Fields', 'et_builder_5'),
  category: 'child-module',
  videos: [],
  attributes: {
    module: {
      type: 'object',
      selector: '{{selector}}',
      elementType: 'element',
      settings: {
        advanced: {
          html: {},
          loop: {},
          link: {
            priority: 70,
            component: {
              type: 'group',
              name: 'divi/link',
            },
          },
          text: {
            priority: 49,
            component: {
              type: 'group',
              name: 'divi/text',
              props: {
                fields: {
                  textShadowGroup: {
                    render: false,
                  },
                },
              },
            },
          },
        },
        decoration: {
          animation: {},
          attributes: {},
          background: {
            priority: 10,
            component: {
              type: 'group',
              name: 'divi/background',
            },
          },
          conditions: {
            priority: 98,
            component: {
              type: 'group',
              name: 'divi/conditions',
            },
          },
          disabledOn: {
            priority: 99,
            component: {
              type: 'group',
              name: 'divi/disabled-on',
            },
          },
          overflow: {
            priority: 99,
            component: {
              type: 'group',
              name: 'divi/overflow',
            },
          },
          position: {
            priority: 190,
            component: {
              type: 'group',
              name: 'divi/position',
            },
          },
          scroll: {
            priority: 200,
            component: {
              type: 'group',
              name: 'divi/scroll',
            },
          },
          order: {},
          sizing: {
            priority: 80,
            component: {
              type: 'group',
              name: 'divi/sizing',
            },
          },
          spacing: {
            priority: 90,
            component: {
              type: 'group',
              name: 'divi/spacing',
            },
          },
          transform: {
            priority: 109,
            component: {
              type: 'group',
              name: 'divi/transform',
            },
          },
          transition: {
            priority: 120,
            component: {
              type: 'group',
              name: 'divi/transition',
            },
          },
          zIndex: {
            priority: 190,
            component: {
              type: 'group',
              name: 'divi/z-index',
            },
          },
          border: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designBorder',
              render: true,
              priority: 5,
              component: {
                type: 'group',
                name: 'divi/border',
                props: {
                  grouped: false,
                  groupLabel: __('Border', 'et_builder_5'),
                  fieldLabel: __('Input', 'et_builder_5'),
                },
              },
            },
          },
          boxShadow: {
            priority: 100,
            component: {
              type: 'group',
              name: 'divi/box-shadow',
              props: {
                groupLabel: __('Box Shadow', 'et_builder_5'),
              },
            },
          },
          filters: {
            priority: 105,
            component: {
              type: 'group',
              name: 'divi/filters',
            },
          },
        },
        meta: {
          meta: {},
        },
      },
      styleProps: {
        background: {
          selector: '{{selector}}',
        },
        spacing: {
          selector: '{{selectorPrefix}}.et_pb_newsletter_form p{{baseSelector}}',
          propertySelectors: {
            desktop: {
              value: {
                padding:
                  '{{selectorPrefix}}.et_pb_newsletter_form p{{baseSelector}}.et_pb_newsletter_field.et_pb_signup_custom_field',
              },
            },
          },
          important: {
            desktop: {
              value: {
                margin: true,
              },
            },
          },
        },
        border: {
          propertySelectors: {
            desktop: {
              value: {
                'border-radius':
                  '{{selectorPrefix}}.et_pb_newsletter_form .et_pb_newsletter_fields p{{baseSelector}} .input, {{selectorPrefix}}.et_pb_newsletter_form .et_pb_newsletter_fields p{{baseSelector}} .input[type="checkbox"] + label i, {{selectorPrefix}}.et_pb_newsletter_form .et_pb_newsletter_fields p{{baseSelector}} .input[type="radio"] + label i',
                'border-style':
                  '{{selectorPrefix}}.et_pb_newsletter_form .et_pb_newsletter_fields p{{baseSelector}} .input, {{selectorPrefix}}.et_pb_newsletter_form .et_pb_newsletter_fields p{{baseSelector}} .input[type="checkbox"] + label i, {{selectorPrefix}}.et_pb_newsletter_form .et_pb_newsletter_fields p{{baseSelector}} .input[type="radio"] + label i',
              },
            },
          },
        },
        boxShadow: {
          selector:
            '{{selector}} input, {{selector}} select, {{selector}} textarea, {{selector}} .et_pb_contact_field_options_list label > i',
          important: {
            desktop: {
              value: true,
            },
          },
        },
        filters: {
          selector: '{{selector}} input, {{selector}} textarea, {{selector}} label',
        },
      },
    },
    field: {
      type: 'object',
      elementType: 'field',
      selector: '{{selector}}.et_pb_contact_field .input',
      settings: {
        decoration: {
          background: {},
          font: {},
        },
        advanced: {
          focus: {
            groupType: 'group-items',
            items: {
              focusBorderGroup: {
                render: true,
                groupSlug: 'designBorder',
                priority: 15,
                component: {
                  props: {
                    grouped: false,
                    attrName: 'field.advanced.focus.focusBorderGroup',
                    fieldLabel: __('Input Focus', 'et_builder_5'),
                  },
                },
              },
            },
          },
          focusUseBorder: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designBorder',
              label: __('Use Focus Borders', 'et_builder_5'),
              description: __('Enabling this option will add borders to input fields when focused.', 'et_builder_5'),
              features: {
                responsive: false,
                hover: false,
                sticky: false,
              },
              render: true,
              priority: 10,
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
    },
    fieldItem: {
      type: 'object',
      label: __('Field Label', 'et_builder_5'),
      elementType: 'element',
      selector: '{{selector}} .et_pb_contact_form_label',
      supportsCustomAttributes: true,
      attributes: {
        class: 'et_pb_contact_form_label',
      },
      tagName: 'label',
      inlineEditor: 'plainText',
      childrenSanitizer: 'et_core_esc_previously',
      settings: {
        advanced: {
          fullwidth: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designLayout',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.fullwidth',
              label: __('Make Fullwidth', 'et_builder_5'),
              description: __(
                'If enabled, the field will take 100% of the width of the content area, otherwise it will take 50%',
                'et_builder_5',
              ),
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          predefinedField: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentMainContent',
              priority: 10,
              render: true,
              attrName: 'fieldItem.advanced.predefinedField',
              label: __('Field', 'et_builder_5'),
              description: __(
                'Choose a custom field. Custom fields must be defined in your email provider account.',
                'et_builder_5',
              ),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: 'content',
              },
              container: false,
              component: {
                name: 'divi/select',
                type: 'field',
              },
            },
          },
          id: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentMainContent',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.id',
              label: __('Field ID', 'et_builder_5'),
              description: __(
                'Define the unique ID of this field. You should use only English characters without special characters and spaces.',
                'et_builder_5',
              ),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: 'content',
                dynamicContent: { type: 'text' },
              },
              component: {
                name: 'divi/text',
                type: 'field',
              },
            },
          },
          type: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.type',
              label: __('Type', 'et_builder_5'),
              description: __('Choose the type of field', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
              },
              component: {
                name: 'divi/select',
                type: 'field',
                props: {
                  options: {
                    input: {
                      label: __('Input Field', 'et_builder_5'),
                    },
                    email: {
                      label: __('Email Field', 'et_builder_5'),
                    },
                    text: {
                      label: __('Textarea', 'et_builder_5'),
                    },
                    checkbox: {
                      label: __('Checkboxes', 'et_builder_5'),
                    },
                    radio: {
                      label: __('Radio Buttons', 'et_builder_5'),
                    },
                    select: {
                      label: __('Select Dropdown', 'et_builder_5'),
                    },
                  },
                },
              },
            },
          },
          minLength: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.minLength',
              label: __('Minimum Length', 'et_builder_5'),
              description: __('Leave at 0 to remove restriction', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/range', // TODO ping design team. Not outputting CSS.
                type: 'field',
                props: {
                  allowedUnits: [],
                  defaultUnit: '',
                },
              },
            },
          },
          maxLength: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.maxLength',
              label: __('Maximum Length', 'et_builder_5'),
              description: __('Leave at 0 to remove restriction', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/range', // TODO ping design team. Not outputting CSS.
                type: 'field',
                props: {
                  allowedUnits: [],
                  defaultUnit: '',
                },
              },
            },
          },
          allowedSymbols: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.allowedSymbols',
              label: __('Allowed Symbols', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/select',
                type: 'field',
                props: {
                  options: {
                    all: {
                      label: __('All', 'et_builder_5'),
                    },
                    letters: {
                      label: __('Letters Only (A-Z)', 'et_builder_5'),
                    },
                    numbers: {
                      label: __('Numbers Only (0-9)', 'et_builder_5'),
                    },
                    alphanumeric: {
                      label: __('Alphanumeric Only (A-Z, 0-9)', 'et_builder_5'),
                    },
                  },
                },
              },
            },
          },
          checkboxOptions: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.checkboxOptions',
              label: __('Options', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/sortable-list',
                type: 'field',
                props: {
                  isCheckbox: true,
                  addFirstOnMount: true,
                  actions: {
                    right: ['move', 'link', 'copy', 'delete'],
                  },
                },
              },
            },
          },
          radioOptions: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.radioOptions',
              label: __('Options', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/sortable-list',
                type: 'field',
                props: {
                  isRadio: true,
                  addFirstOnMount: true,
                  actions: {
                    right: ['move', 'link', 'copy', 'delete'],
                  },
                },
              },
            },
          },
          selectOptions: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.selectOptions',
              label: __('Options', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/sortable-list',
                type: 'field',
                props: {
                  addFirstOnMount: true,
                  actions: {
                    right: ['move', 'copy', 'delete'],
                  },
                },
              },
            },
          },
          required: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              priority: 5,
              render: true,
              attrName: 'fieldItem.advanced.required',
              label: __('Required Field', 'et_builder_5'),
              description: __('Define whether the field should be required or optional', 'et_builder_5'),
              features: {
                sticky: false,
                responsive: false,
                hover: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          hidden: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentFieldOptions',
              attrName: 'fieldItem.advanced.hidden',
              label: __('Hidden Field', 'et_builder_5'),
              description: __('Define whether or not the field should be visible.', 'et_builder_5'),
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },
              render: true,
              priority: 10,
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        innerContent: {
          groupType: 'group-item',
          item: {
            groupSlug: 'contentMainContent',
            priority: 10,
            render: true,
            attrName: 'fieldItem.innerContent',
            label: __('Title', 'et_builder_5'),
            description: __(
              'Here you can define the content that will be placed within the current tab.',
              'et_builder_5',
            ),
            features: {
              sticky: false,
              preset: 'content',
              dynamicContent: { type: 'text' },
            },
            component: {
              name: 'divi/text',
              type: 'field',
            },
          },
        },
      },
    },
    conditionalLogic: {
      type: 'object',
      settings: {
        innerContent: {
          groupType: 'group-item',
          item: {
            groupSlug: 'contentConditionalLogic',
            priority: 10,
            render: true,
            attrName: 'conditionalLogic.innerContent',
            label: __('Rules', 'et_builder_5'),
            features: {
              responsive: false,
              hover: false,
              sticky: false,
              preset: ['html'],
            },
            component: {
              name: 'divi/conditions',
              type: 'field',
            },
          },
        },
        advanced: {
          enable: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentConditionalLogic',
              priority: 5,
              render: true,
              attrName: 'conditionalLogic.advanced.enable',
              label: __('Enable', 'et_builder_5'),
              description: __(
                'Enabling conditional logic makes this field only visible when any or all of the rules below are fulfilled<br><strong>Note:</strong> Only fields with an unique and non-empty field ID can be used',
                'et_builder_5',
              ),
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          relation: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentConditionalLogic',
              priority: 5,
              render: true,
              attrName: 'conditionalLogic.advanced.relation',
              label: __('Relation', 'et_builder_5'),
              description: __('Choose whether any or all of the rules should be fulfilled', 'et_builder_5'),
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
                props: {
                  options: {
                    off: __('Any', 'et_builder_5'),
                    on: __('All', 'et_builder_5'),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {},
  settings: {
    advanced: 'auto',
    groups: {
      // Content > Field.
      contentMainContent: {
        panel: 'content',
        groupName: 'contentMainContent',
        priority: 10,
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Field', 'et_builder_5'),
            preset: 'content',
          },
        },
      },

      // Content > Field Options.
      contentFieldOptions: {
        panel: 'content',
        groupName: 'contentFieldOptions',
        priority: 10,
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Field Options', 'et_builder_5'),
          },
        },
      },

      // Content > Conditional Logic.
      contentConditionalLogic: {
        panel: 'content',
        groupName: 'contentConditionalLogic',
        priority: 10,
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Conditional Logic', 'et_builder_5'),
          },
        },
      },

      // Design > Layout.
      designLayout: {
        panel: 'design',
        groupName: 'layout',
        priority: 5,
        multiElements: false,
        component: {
          name: 'divi/composite',
          props: {
            clipboardCategory: 'style',
            groupLabel: __('Layout', 'et_builder_5'),
          },
        },
      },

      // Design > Border Field Group
      designBorder: {
        panel: 'design',
        groupName: 'border',
        priority: 95,
        multiElements: false,
        component: {
          name: 'divi/composite',
          props: {
            clipboardCategory: 'style',
            groupLabel: __('Border', 'et_builder_5'),
            presetGroup: 'divi/border',
          },
        },
      },
    },
  },
};

export { signupCustomFieldModuleMetaData };
