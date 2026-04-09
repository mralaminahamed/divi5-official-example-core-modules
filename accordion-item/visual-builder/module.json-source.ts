import { __ } from '@wordpress/i18n';

import { type AccordionItemAttrs, type Metadata } from '@divi/types';

/**
 * Accordion Item Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const accordionItemModuleMetaData: Metadata.Values<AccordionItemAttrs> = {
  name: 'divi/accordion-item',
  d4Shortcode: 'et_pb_accordion_item',
  title: __('Accordion Item', 'et_builder_5'),
  titles: __('Accordion Items', 'et_builder_5'),
  moduleIcon: 'divi/module-accordion-item',
  category: 'child-module',
  childrenName: [], // Supports any module type as children
  videos: [
    {
      id: 'OBbuKXTJyj8',
      name: 'An introduction to the Accordion module',
    },
    {
      id: '1iqjhnHVA9Y',
      name: 'Design Settings and Advanced Module Settings',
    },
    {
      id: 'boNZZ0MYU0E',
      name: 'Saving and loading from the library',
    },
  ],
  attributes: {
    module: {
      type: 'object',
      selector: '{{selector}}',
      styleProps: {
        background: {
          selector: '{{selector}}.et_pb_toggle',
        },
        border: {
          selector: '{{selectorPrefix}}.et_pb_accordion .et_pb_module{{baseSelector}}.et_pb_toggle',
        },
        boxShadow: {
          important: true,
        },
        spacing: {
          selector: '{{selector}}.et_pb_toggle',
          important: true,
        },
        layout: {
          selector: '{{selector}} .et_pb_toggle_content',
        },
      },
      settings: {
        advanced: {
          elements: {},
          html: {},
          link: {},
          loop: {},
          text: {
            priority: 15,
            component: {
              props: {
                fields: {
                  color: {
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
          background: {},
          conditions: {},
          disabledOn: {},
          filters: {},
          interactions: {},
          border: {},
          boxShadow: {},
          layout: {},
          overflow: {},
          order: {},
          position: {},
          scroll: {},
          sizing: {},
          spacing: {},
          sticky: {},
          transform: {},
          transition: {},
          zIndex: {},
        },
      },
    },
    title: {
      type: 'object',
      selector: '{{selector}} .et_pb_toggle_title',
      supportsCustomAttributes: true,
      attributes: {
        class: 'et_pb_toggle_title',
      },
      inlineEditor: 'plainText',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps: {
        font: {
          important: {
            font: {
              desktop: {
                value: {
                  color: true,
                },
              },
            },
          },
        },
      },
      settings: {
        innerContent: {
          groupType: 'group-item',
          item: {
            groupSlug: 'contentText',
            attrName: 'title.innerContent',
            label: __('Title', 'et_builder_5'),
            description: __('The title will appear above the content and when the toggle is closed.', 'et_builder_5'),
            category: 'basic_option',
            priority: 10,
            render: true,
            features: {
              dynamicContent: {
                type: 'text',
              },
              sticky: false,
              preset: 'content',
            },

            component: {
              type: 'field',
              name: 'divi/text',
            },
          },
        },
        decoration: {
          font: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designTitleText',
              priority: 10,
              render: true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/font',

                props: {
                  grouped: false,
                  groupLabel: __('Title Text', 'et_builder_5'),
                  fieldLabel: __('Title', 'et_builder_5'),

                  fields: {
                    color: {
                      priority: 5,
                      render: true,
                    },
                    headingLevel: {
                      render: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    closedToggleIcon: {
      type: 'object',
      selector: '{{selector}}.et_pb_toggle_close',
      styleProps: {
        icon: {
          selector: '{{selector}}.et_pb_toggle_close .et_pb_toggle_title:before',
          propertySelectors: {
            desktop: {
              value: {
                'font-size':
                  '{{selector}}.et_pb_toggle_close .et_pb_toggle_title:before, {{selector}}.et_pb_toggle_close .et_vb_toggle_overlay',
              },
            },
          },
          important: {
            desktop: {
              value: {
                'font-family': true,
                'font-size': true,
                content: true,
                'font-weight': true,
              },
            },
          },
        },
      },
      settings: {
        decoration: {
          icon: {
            groupType: 'group-items',
            items: {
              icon: {
                groupSlug: 'designToggleIcon',
                attrName: 'closedToggleIcon.decoration.icon',
                label: __('Closed Icon', 'et_builder_5'),
                priority: 10,
                render: true,
                category: 'basic_option',
                features: {
                  preset: ['style', 'html'],
                },

                // Built-in group component
                component: {
                  type: 'field',
                  name: 'divi/icon-picker',
                },
              },
              iconAttributes: {
                groupSlug: 'designToggleIcon',
                attrName: 'closedToggleIcon.decoration.icon',
                priority: 10,
                render: true,

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/icon',

                  props: {
                    grouped: false,
                    fieldLabel: __('Icon', 'et_builder_5'),

                    fields: {
                      icon: {
                        render: false,
                      },
                      color: {
                        render: true,
                      },
                      useSize: {
                        render: true,
                      },
                      size: {
                        render: true,
                        component: {
                          type: 'field',
                          name: 'divi/range',
                          props: {
                            cssProperty: 'icon-font-size',
                            defaultUnit: 'px',
                            min: 1,
                            minLimit: 1,
                            max: 120,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    openToggle: {
      type: 'object',
      selector: '{{selector}}.et_pb_accordion_item.et_pb_toggle.et_pb_toggle_open',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designToggle',
              attrName: 'openToggle.decoration.background',
              subName: 'color',
              label: __('Open Toggle Background Color', 'et_builder_5'),
              description: __(
                'You can pick unique background colors for toggles when they are in their open and closed states. Choose the open state background color here.',
                'et_builder_5',
              ),
              priority: 10,
              render: true,
              features: {
                sticky: false,
                dynamicContent: {
                  type: 'color',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designTitleText',
              attrName: 'openToggle.decoration.font.font',
              subName: 'color',
              label: __('Open Title Text Color', 'et_builder_5'),
              description: __(
                'You can pick unique text colors for toggle titles when they are open and closed. Choose the open state title color here.',
                'et_builder_5',
              ),
              priority: 5,
              render: true,
              features: {
                sticky: false,
                dynamicContent: {
                  type: 'color',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
    },
    closedToggle: {
      type: 'object',
      selector: '{{selector}}.et_pb_accordion_item.et_pb_toggle.et_pb_toggle_close',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designToggle',
              attrName: 'closedToggle.decoration.background',
              subName: 'color',
              label: __('Closed Toggle Background Color', 'et_builder_5'),
              description: __(
                'You can pick unique background colors for toggles when they are in their open and closed states. Choose the open state background color here.',
                'et_builder_5',
              ),
              priority: 10,
              render: true,
              features: {
                sticky: false,
                dynamicContent: {
                  type: 'color',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-items',
            items: {
              color: {
                groupSlug: 'designClosedTitleText',
                attrName: 'closedToggle.decoration.font.font',
                subName: 'color',
                label: __('Closed Title Text Color', 'et_builder_5'),
                description: __(
                  'You can pick unique text colors for toggle titles when they are open and closed. Choose the closed state title color here.',
                  'et_builder_5',
                ),
                priority: 5,
                render: true,
                features: {
                  sticky: false,
                  dynamicContent: {
                    type: 'color',
                  },
                },

                // Built-in component
                component: {
                  type: 'field',
                  name: 'divi/color-picker',
                },
              },
              font: {
                groupSlug: 'designClosedTitleText',
                attrName: 'closedToggle.decoration.font',
                priority: 10,
                render: true,

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/font',

                  props: {
                    grouped: false,
                    groupLabel: __('Closed Title Text', 'et_builder_5'),
                    fieldLabel: __('Closed Title', 'et_builder_5'),

                    fields: {
                      color: {
                        render: false,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    content: {
      type: 'object',
      selector: '{{selector}}.et_pb_toggle .et_pb_toggle_content',
      supportsCustomAttributes: true,
      elementType: 'content',
      attributes: {
        class: 'et_pb_toggle_content',
      },
      styleProps: {
        bodyFont: {
          important: {
            body: {
              font: {
                desktop: {
                  value: {
                    color: true,
                  },
                },
              },
            },
          },
        },
      },
      settings: {
        innerContent: {
          groupType: 'group-item',
          item: {
            groupSlug: 'contentText',
            attrName: 'content.innerContent',
            label: __('Body', 'et_builder_5'),
            description: __('Input the main text content for your module here.', 'et_builder_5'),
            category: 'basic_option',
            priority: 10,
            render: true,
            features: {
              sticky: false,
              preset: 'content',
              dynamicContent: {
                type: 'text',
              },
            },

            // Built-in component
            component: {
              type: 'field',
              name: 'divi/richtext',
            },
          },
        },
        decoration: {
          bodyFont: {
            priority: 30,

            // Built-in component
            component: {
              props: {
                groups: {
                  body: {
                    groupLabel: __('Body Text', 'et_builder_5'),
                    fieldLabel: __('Body', 'et_builder_5'),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {
    openToggle: {
      label: __('Open Toggle', 'et_builder_5'),
      subName: 'openToggle',
      selectorSuffix: ' .et_pb_toggle.et_pb_toggle_open',
    },
    toggleTitle: {
      label: __('Toggle Title', 'et_builder_5'),
      subName: 'toggleTitle',
      selectorSuffix: ' .et_pb_toggle_title',
    },
    toggleIcon: {
      label: __('Toggle Icon', 'et_builder_5'),
      subName: 'toggleIcon',
      selectorSuffix: ' .et_pb_toggle_title:before',
    },
    toggleContent: {
      label: __('Toggle Content', 'et_builder_5'),
      subName: 'toggleContent',
      selectorSuffix: ' .et_pb_toggle_content',
    },
  },
  settings: {
    content: 'auto',
    advanced: 'auto',

    groups: {
      // Content > Text
      contentText: {
        panel: 'content',
        priority: 10,
        groupName: 'text',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Text', 'et_builder_5'),
          },
        },
      },

      // Design > Toggle Icon
      designToggleIcon: {
        panel: 'design',
        priority: 10,
        groupName: 'designToggleIcon',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Icon', 'et_builder_5'),
          },
        },
      },

      // Design > Toggle
      designToggle: {
        panel: 'design',
        priority: 10,
        groupName: 'designToggle',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Toggle', 'et_builder_5'),
          },
        },
      },

      // Design > Title Text
      designTitleText: {
        panel: 'design',
        priority: 20,
        groupName: 'designTitleText',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Title Text', 'et_builder_5'),
            presetGroup: 'divi/font',
          },
        },
      },

      // Design > Closed Title Text
      designClosedTitleText: {
        panel: 'design',
        priority: 30,
        groupName: 'designClosedTitleText',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Closed Title Text', 'et_builder_5'),
            presetGroup: 'divi/font',
          },
        },
      },
    },
  },
};

export { accordionItemModuleMetaData };
