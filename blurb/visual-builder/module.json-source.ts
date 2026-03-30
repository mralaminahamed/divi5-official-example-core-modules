import { __ } from '@wordpress/i18n';

import { type BlurbAttrs, type Metadata } from '@divi/types';

/**
 * Blurb Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const blurbModuleMetaData: Metadata.Values<BlurbAttrs> = {
  name: 'divi/blurb',
  d4Shortcode: 'et_pb_blurb',
  title: __('Blurb', 'et_builder_5'),
  titles: __('Blurbs', 'et_builder_5'),
  moduleIcon: 'divi/module-blurb',
  category: 'module',
  childrenName: [], // Supports any module type as children
  videos: [
    {
      id: 'SFuDWEMH-qg',
      name: 'An introduction to the Blurb module',
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
    imageIcon: {
      type: 'object',
      label: __('Image or Icon', 'et_builder_5'),
      selector: '{{selector}} .et_pb_main_blurb_image .et-pb-icon, {{selector}} .et_pb_main_blurb_image img',
      supportsCustomAttributes: true,
      settings: {
        innerContent: {
          groupType: 'group-items',
          items: {
            useIcon: {
              groupSlug: 'contentImageIcon',
              attrName: 'imageIcon.innerContent',
              subName: 'useIcon',
              label: __('Use Icon', 'et_builder_5'),
              description: __('Here you can choose whether icon set below should be used.', 'et_builder_5'),
              category: 'basic_option',
              features: {
                hover: false,
                sticky: false,
                responsive: false,
                preset: 'content',
              },
              render: true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
            icon: {
              groupSlug: 'contentImageIcon',
              attrName: 'imageIcon.innerContent',
              subName: 'icon',
              label: __('Icon', 'et_builder_5'),
              description: __('Choose an icon to display with your blurb.', 'et_builder_5'),
              category: 'basic_option',
              features: {
                sticky: false,
                preset: 'content',
              },
              render: true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/icon-picker',
              },
            },
            src: {
              groupSlug: 'contentImageIcon',
              attrName: 'imageIcon.innerContent',
              subName: 'src',
              label: __('Image', 'et_builder_5'),
              description: __('Upload an image to display at the top of your blurb.', 'et_builder_5'),
              category: 'basic_option',
              features: {
                dynamicContent: {
                  type: 'image',
                },
                sticky: false,
                responsive: true,
                hover: true,
                preset: 'content',
              },
              render: true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/upload',
                props: {
                  syncImageData: {
                    src: true,
                    id: true,
                    alt: true,
                    titleText: true,
                  },
                },
              },
            },
            animation: {
              groupSlug: 'designAnimation',
              attrName: 'imageIcon.innerContent',
              subName: 'animation',
              label: __('Image/Icon Animation', 'et_builder_5'),
              description: __('This controls the direction of the lazy-loading animation.', 'et_builder_5'),
              features: {
                sticky: false,
                hover: false,
                preset: ['html'],
              },
              render: true,
              priority: 20,

              component: {
                type: 'field',
                name: 'divi/select',
                props: {
                  options: {
                    top: {
                      label: __('Top To Bottom', 'et_builder_5'),
                    },
                    left: {
                      label: __('Left To Right', 'et_builder_5'),
                    },
                    right: {
                      label: __('Right To Left', 'et_builder_5'),
                    },
                    bottom: {
                      label: __('Bottom To Top', 'et_builder_5'),
                    },
                    off: {
                      label: __('No Animation', 'et_builder_5'),
                    },
                  },
                },
              },
            },
          },
        },
        advanced: {
          color: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              attrName: 'imageIcon.advanced.color',
              label: __('Icon Color', 'et_builder_5'),
              description: __('Here you can define a custom color for your icon.', 'et_builder_5'),
              render: true,
              priority: 10,

              features: {
                dynamicContent: {
                  type: 'color',
                },
              },

              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          placement: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              attrName: 'imageIcon.advanced.placement',
              label: __('Image/Icon Placement', 'et_builder_5'),
              description: __('Here you can choose where to place the icon.', 'et_builder_5'),
              category: 'layout',
              render: true,
              priority: 30,
              features: {
                hover: false,
                sticky: false,
              },

              component: {
                type: 'field',
                name: 'divi/select',
                props: {
                  options: {
                    top: {
                      label: __('Top', 'et_builder_5'),
                    },
                    left: {
                      label: __('Left', 'et_builder_5'),
                    },
                  },
                },
              },
            },
          },
          width: {
            groupType: 'group-items',
            items: {
              image: {
                groupSlug: 'designImageIcon',
                attrName: 'imageIcon.advanced.width',
                subName: 'image',
                label: __('Image Width', 'et_builder_5'),
                description: __('Here you can choose image width.', 'et_builder_5'),
                category: 'layout',
                render: true,
                priority: 40,

                component: {
                  type: 'field',
                  name: 'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'width',
                    min: 1,
                    max: 200,
                  },
                },
                features: {
                  preset: ['html'],
                  dynamicContent: {
                    type: 'number',
                  },
                },
              },
              icon: {
                groupSlug: 'designImageIcon',
                attrName: 'imageIcon.advanced.width',
                subName: 'icon',
                label: __('Icon Width', 'et_builder_5'),
                description: __('Here you can choose icon width.', 'et_builder_5'),
                render: true,
                priority: 40,

                component: {
                  type: 'field',
                  name: 'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'font-size',
                    min: 1,
                    max: 200,
                  },
                },
                features: {
                  preset: ['html'],
                  dynamicContent: {
                    type: 'number',
                  },
                },
              },
            },
          },
          alignment: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              attrName: 'imageIcon.advanced.alignment',
              label: __('Image/Icon Alignment', 'et_builder_5'),
              description: __('Align image/icon to the left, right or center.', 'et_builder_5'),
              category: 'layout',
              render: true,
              priority: 50,
              features: {
                hover: false,
                sticky: false,
              },

              component: {
                type: 'field',
                name: 'divi/button-options',
                props: {
                  options: {
                    left: {
                      icon: 'divi/align-left',
                    },
                    center: {
                      icon: 'divi/align-center',
                    },
                    right: {
                      icon: 'divi/align-right',
                    },
                  },
                  showLabel: false,
                },
              },
            },
          },
        },
        decoration: {
          background: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              attrName: 'imageIcon.decoration.background',
              subName: 'color',
              label: __('Image/Icon Background Color', 'et_builder_5'),
              description: __('Here you can define a custom background color.', 'et_builder_5'),
              render: true,
              priority: 20,

              features: {
                dynamicContent: {
                  type: 'color',
                },
              },

              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          border: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              priority: 60,
              render: true,
              component: {
                type: 'group',
                name: 'divi/border',
                props: {
                  grouped: true,
                  fieldLabel: __('Image/Icon', 'et_builder_5'),
                },
              },
            },
          },
          spacing: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              priority: 60,
              render: true,
              component: {
                type: 'group',
                name: 'divi/spacing',
                props: {
                  grouped: true,
                  fieldLabel: __('Image/Icon', 'et_builder_5'),
                },
              },
            },
          },
          boxShadow: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              priority: 60,
              render: true,
              component: {
                type: 'group',
                name: 'divi/box-shadow',
                props: {
                  grouped: true,
                  fieldLabel: __('Image', 'et_builder_5'),
                },
              },
            },
          },
          filters: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImageIcon',
              priority: 60,
              render: true,
              component: {
                type: 'group',
                name: 'divi/filters',
                props: {
                  grouped: true,
                  fieldLabel: __('Image/Icon', 'et_builder_5'),
                },
              },
            },
          },
        },
      },
      styleProps: {
        selector: '{{selector}} .et-pb-icon, {{selector}} .et_pb_image_wrap',
        spacing: {
          selector:
            '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          important: true,
        },
        boxShadow: {
          selector: '{{selector}} .et_pb_main_blurb_image .et_pb_image_wrap.et_pb_only_image_mode_wrap',
          useOverlay: true,
        },
        filters: {
          selector: '{{selector}} .et_pb_main_blurb_image',
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_main_blurb_image',
              hover: '{{selector}}{{:hover}} .et_pb_main_blurb_image',
            },
          },
        },
        border: {
          selector:
            '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          selectors: {
            desktop: {
              value:
                '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
              hover:
                '{{selector}}{{:hover}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}}{{:hover}} .et_pb_main_blurb_image .et-pb-icon',
            },
          },
        },
        background: {
          selector:
            '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          selectors: {
            desktop: {
              value:
                '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
              hover:
                '{{selector}}{{:hover}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}}{{:hover}} .et_pb_main_blurb_image .et-pb-icon',
            },
          },
        },
      },
      styleComponentsProps: {
        background: false,
        boxShadow: {
          settings: {
            overlay: true,
          },
        },
      },
    },
    module: {
      type: 'object',
      selector: '{{selector}}',
      settings: {
        meta: {
          meta: {},
        },
        advanced: {
          elements: {},
          html: {},
          link: {},
          loop: {},
          text: {},
        },
        decoration: {
          animation: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designAnimation',
              priority: 10,
              render: true,
              component: {
                type: 'group',
                name: 'divi/animation',
                props: {
                  grouped: false,
                },
              },
            },
          },
          attributes: {},
          background: {},
          border: {},
          boxShadow: {},
          conditions: {},
          disabledOn: {},
          filters: {},
          interactions: {},
          layout: {},
          order: {},
          overflow: {},
          position: {},
          scroll: {},
          sizing: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designSizing',
              priority: 20,
              render: true,
              component: {
                type: 'group',
                name: 'divi/sizing',
                props: {
                  grouped: false,
                },
              },
            },
          },
          spacing: {},
          sticky: {},
          transform: {},
          transition: {},
          zIndex: {},
        },
      },
      styleProps: {
        spacing: {
          important: true,
        },
        layout: {
          selector: '{{selector}} .et_pb_blurb_content',
        },
      },
    },
    title: {
      type: 'object',
      selector: '{{selector}} .et_pb_module_header',
      supportsCustomAttributes: true,
      settings: {
        innerContent: {},
        decoration: {
          font: {},
        },
      },
      attributes: {
        class: 'et_pb_module_header',
      },
      tagName: 'h4',
      inlineEditor: 'plainText',
      elementType: 'headingLink',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps: {
        font: {
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_module_header',
              hover: '{{selector}}{{:hover}} .et_pb_module_header',
            },
          },
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
    },
    content: {
      type: 'object',
      selector: '{{selector}} .et_pb_blurb_description',
      supportsCustomAttributes: true,
      elementType: 'content',
      attributes: {
        class: 'et_pb_blurb_description',
      },
      settings: {
        innerContent: {
          item: {
            groupSlug: 'contentText',
            category: 'basic_option',
            features: {
              dynamicContent: { type: 'text' },
            },
          },
        },
        decoration: {
          bodyFont: {},
        },
      },
      styleProps: {
        bodyFont: {
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_blurb_description',
              hover: '{{selector}}{{:hover}}, {{selector}}{{:hover}} .et_pb_blurb_description',
            },
          },
        },
      },
    },
    contentContainer: {
      type: 'object',
      selector: '{{selector}} .et_pb_blurb_content',
      elementType: 'wrapper',
      attributes: {
        class: 'et_pb_blurb_content',
      },
      settings: {
        decoration: {
          sizing: {
            groupType: 'group-items',
            items: {
              maxWidth: {
                groupSlug: 'designSizing',
                attrName: 'contentContainer.decoration.sizing',
                subName: 'maxWidth',
                label: __('Content Width', 'et_builder_5'),
                description: __('Adjust the width of the content within the blurb.', 'et_builder_5'),
                category: 'layout',
                priority: 10,
                render: true,
                component: {
                  type: 'field',
                  name: 'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'width',
                    max: 1100,
                  },
                },
                features: {
                  dynamicContent: {
                    type: 'number',
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
    blurbImage: {
      label: __('Blurb Image', 'et_builder_5'),
      subName: 'blurbImage',
      selectorSuffix: '.et_pb_module .et_pb_main_blurb_image',
    },
    blurbTitle: {
      label: __('Blurb Title', 'et_builder_5'),
      subName: 'blurbTitle',
      selectorSuffix: ' .et_pb_module_header',
    },
    blurbContent: {
      label: __('Blurb Content', 'et_builder_5'),
      subName: 'blurbContent',
      selectorSuffix: ' .et_pb_blurb_content',
    },
  },
  settings: {
    groups: {
      // Content => Image & Icon
      contentImageIcon: {
        panel: 'content',
        priority: 20,
        groupName: 'imageIcon',
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Image & Icon', 'et_builder_5'),
          },
        },
      },

      // Design => Image & Icon
      designImageIcon: {
        panel: 'design',
        priority: 10,
        groupName: 'imageIcon',
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Image & Icon', 'et_builder_5'),
            clipboardCategory: 'style',
          },
        },
      },

      // Design => Sizing
      designSizing: {
        panel: 'design',
        priority: 60,
        groupName: 'sizing',
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Sizing', 'et_builder_5'),
            clipboardCategory: 'style',
            presetGroup: 'divi/sizing',
          },
        },
      },

      // Design => Animation
      designAnimation: {
        panel: 'design',
        priority: 120,
        groupName: 'animation',
        multiElements: true,
        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Animation', 'et_builder_5'),
            clipboardCategory: 'style',
            presetGroup: 'divi/animation',
          },
        },
      },
    },
  },
  mousetrap: {
    inner: {
      // Blurb has content wrapper which covers the surface of the module. Thus inner mousetrap needs to be added
      // inside content wrapper.
      edited: true,
    },
  },
};

export { blurbModuleMetaData };
