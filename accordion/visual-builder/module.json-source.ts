import { __ } from '@wordpress/i18n';

import { type AccordionAttrs, type Metadata } from '@divi/types';

/**
 * Accordion Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const accordionModuleMetaData: Metadata.Values<AccordionAttrs> = {
  name: 'divi/accordion',
  d4Shortcode: 'et_pb_accordion',
  title: __('Accordion', 'et_builder_5'),
  titles: __('Accordions', 'et_builder_5'),
  moduleIcon: 'divi/module-accordion',
  childModuleName: 'divi/accordion-item',
  childModuleTitle: __('Accordion Item', 'et_builder_5'),
  category: 'module',
  childrenName: ['divi/accordion-item'],
  allowAllElements: true,
  videos: [
    {
      id: 'k8-bjvI850I',
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
        border: {
          selector: '{{selector}}.et_pb_accordion .et_pb_accordion_item',
        },
        boxShadow: {
          selector: '{{selector}} .et_pb_toggle',
        },
        spacing: {
          propertySelectors: {
            desktop: {
              value: {
                padding: '{{selector}}.et_pb_accordion .et_pb_toggle_content',
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
      },
      settings: {
        meta: {
          meta: {},
        },
        advanced: {
          elements: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentElements',
              priority: 5,
              render: true,
              component: {
                type: 'group',
                name: 'divi/elements',
                props: {
                  grouped: false,
                },
              },
            },
          },
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
                  textShadowGroup: {
                    render: true,
                  },
                  orientation: {
                    render: true,
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
          layout: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designLayout',
              priority: 10,
              render: true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/layout',

                props: {
                  grouped: false,
                  defaultGroupAttr: {
                    desktop: {
                      value: {
                        flexDirection: 'column',
                        columnGap: '30px',
                        rowGap: '30px',
                      },
                    },
                  },
                },
              },
            },
          },
          border: {},
          boxShadow: {},
          overflow: {},
          order: {},
          position: {},
          scroll: {
            groupType: 'group-item',
            item: {
              priority: 20,
              render: true,
              groupSlug: 'advancedScrollModule',
              component: {
                type: 'group',
                name: 'divi/scroll',

                props: {
                  grouped: false,
                  fields: {
                    gridMotion: {
                      render: true,
                    },
                  },
                },
              },
            },
          },
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
      selector:
        '{{selector}} h1.et_pb_toggle_title, {{selector}} h2.et_pb_toggle_title, {{selector}} h3.et_pb_toggle_title, {{selector}} h4.et_pb_toggle_title, {{selector}} h5.et_pb_toggle_title, {{selector}} h6.et_pb_toggle_title',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designTitleText',
              priority: 10,
              render: true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/font',

                props: {
                  grouped: false,
                  groupLabel: __('Title Text', 'et_builder_5'),
                  fieldLabel: __('Title', 'et_builder_5'),

                  fields: {
                    color: {
                      render: true,
                      priority: 5,
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
      selector: '{{selector}} .et_pb_toggle_close',
      styleProps: {
        icon: {
          selector: '{{selector}} .et_pb_toggle_title:before',
          important: {
            desktop: {
              value: {
                'font-family': true,
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
              contentIcon: {
                groupSlug: 'contentToggleIcon',
                attrName: 'closedToggleIcon.decoration.icon',
                priority: 10,
                render: true,
                category: 'basic_option',

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/icon',

                  props: {
                    grouped: false,
                    groupLabel: __('Toggle Icon', 'et_builder_5'),

                    fields: {
                      icon: {
                        render: true,
                      },
                      color: {
                        render: false,
                      },
                      useSize: {
                        render: false,
                      },
                      size: {
                        render: false,
                      },
                    },
                  },
                },
              },
              designIcon: {
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
    content: {
      type: 'object',
      selector: '{{selector}}.et_pb_accordion .et_pb_toggle_content',
      settings: {
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
    openToggle: {
      type: 'object',
      selector: '{{selector}} .et_pb_toggle_open',
      styleProps: {
        font: {
          selector: '{{selector}}.et_pb_accordion .et_pb_toggle_open .et_pb_toggle_title',
        },
      },
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
      selector: '{{selector}} .et_pb_toggle_close',
      styleProps: {
        font: {
          selector:
            '{{selector}} .et_pb_toggle_close h1.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h2.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h3.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h4.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h5.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h6.et_pb_toggle_title',
        },
      },
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
                'You can pick unique background colors for toggles when they are in their open and closed states. Choose the closed state background color here.',
                'et_builder_5',
              ),
              priority: 10,
              render: true,

              features: {
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
              groupSlug: 'designClosedTitleText',
              attrName: 'closedToggle.decoration.font',
              priority: 10,
              render: true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/font',

                props: {
                  grouped: false,
                  groupLabel: __('Closed Title Text', 'et_builder_5'),
                  fieldLabel: __('Closed Title', 'et_builder_5'),

                  fields: {
                    color: {
                      priority: 5,
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
  },
  customCssFields: {
    toggle: {
      label: __('Toggle', 'et_builder_5'),
      subName: 'toggle',
      selectorSuffix: ' .et_pb_toggle',
    },
    openToggle: {
      label: __('Open Toggle', 'et_builder_5'),
      subName: 'openToggle',
      selectorSuffix: ' .et_pb_toggle_open',
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
    design: 'auto',
    advanced: 'auto',

    groups: {
      // Content > Elements
      contentElements: {
        panel: 'content',
        priority: 5,
        groupName: 'contentElements',
        multiElements: true,

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Elements', 'et_builder_5'),
            preset: 'content',
          },
        },
      },

      // Content > Toggle Icon
      contentToggleIcon: {
        panel: 'content',
        priority: 10,
        groupName: 'contentToggleIcon',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Toggle Icon', 'et_builder_5'),
          },
        },
      },

      // Design > Layout
      designLayout: {
        panel: 'design',
        priority: 5,
        groupName: 'designLayout',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Layout', 'et_builder_5'),
            clipboardCategory: 'style',
            presetGroup: 'divi/layout',
          },
        },
      },

      // Design > Icon
      designToggleIcon: {
        panel: 'design',
        priority: 5,
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
  mousetrap: {
    inner: {
      // Default mousetrap only appears in space between accordion item. This is enabled so `InnerMousetrap` can be
      // rendered in child module (accordion item) for accordion.
      edited: true,
    },
  },
};

export { accordionModuleMetaData };
