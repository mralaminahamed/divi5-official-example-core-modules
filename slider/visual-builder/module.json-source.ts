import { __ } from '@wordpress/i18n';

import { type Metadata, type SliderAttrs } from '@divi/types';

/**
 * Slider Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const sliderModuleMetaData: Metadata.Values<SliderAttrs> = {
  name: 'divi/slider',
  d4Shortcode: 'et_pb_slider',
  title: __('Slider', 'et_builder_5'),
  titles: __('Sliders', 'et_builder_5'),
  moduleIcon: 'divi/module-slider',
  childModuleName: 'divi/slide',
  childModuleTitle: __('Slide', 'et_builder_5'),
  category: 'module',
  childrenName: ['divi/slide'],
  videos: [
    {
      id: 'edx-BkUC6us',
      name: 'An introduction to the Slider module',
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
        spacing: {
          propertySelectors: {
            desktop: {
              value: {
                padding:
                  '{{selector}} .et_pb_slide_description, {{selector}}.et_pb_slider_fullwidth_off .et_pb_slide_description',
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
        boxShadow: {
          useOverlay: true,
        },
        sizing: {
          important: {
            desktop: {
              value: {
                'margin-left': true,
                'margin-right': true,
              },
            },
          },
          propertySelectors: {
            desktop: {
              value: {
                'margin-left': '{{selector}}.et_pb_module',
                'margin-right': '{{selector}}.et_pb_module',
                height: '{{selector}}, {{selector}} .et_pb_slide',
                'min-height': '{{selector}}, {{selector}} .et_pb_slide',
                'max-height': '{{selector}}, {{selector}} .et_pb_slide',
              },
            },
          },
        },
      },
      styleComponentsProps: {
        boxShadow: {
          settings: {
            overlay: true,
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
                  supportsStructureTemplates: false,
                },
              },
            },
          },
          html: {},
          link: {},
          loop: {},
          text: {
            priority: 30,
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
          auto: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designAnimation',
              attrName: 'module.advanced.auto',
              label: __('Automatic Animation', 'et_builder_5'),
              description: __(
                'If you would like the slider to slide automatically, without the visitor having to click the next button, enable this option and then adjust the rotation speed below if desired.',
                'et_builder_5',
              ),
              priority: 10,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['script'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },

          autoSpeed: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designAnimation',
              attrName: 'module.advanced.autoSpeed',
              label: __('Automatic Animation Speed (in ms)', 'et_builder_5'),
              description: __(
                "Here you can designate how fast the slider fades between each slide, if 'Automatic Animation' option is enabled above. The higher the number the longer the pause between each rotation.",
                'et_builder_5',
              ),
              priority: 10,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['script'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/text',
              },
            },
          },
          autoIgnoreHover: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designAnimation',
              attrName: 'module.advanced.autoIgnoreHover',
              label: __('Continue Automatic Slide on Hover', 'et_builder_5'),
              description: __(
                'Turning this on will allow automatic sliding to continue on mouse hover.',
                'et_builder_5',
              ),
              priority: 10,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['script'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          layout: {},
          animation: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designAnimation',
              priority: 5,
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
          conditions: {},
          disabledOn: {
            groupType: 'group-item',
            item: {
              groupSlug: 'advancedVisibility',
              priority: 60,
              render: true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/disabled-on',

                props: {
                  grouped: false,
                },
              },
            },
          },
          filters: {},
          interactions: {},
          border: {},
          boxShadow: {},
          overflow: {
            groupType: 'group-item',
            item: {
              groupSlug: 'advancedVisibility',
              priority: 60,
              render: true,
              component: {
                type: 'group',
                name: 'divi/overflow',
                props: {
                  grouped: false,
                },
              },
            },
          },
          order: {},
          position: {},
          scroll: {},
          sizing: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designSizing',
              priority: 80,
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
    },
    arrows: {
      type: 'object',
      selector:
        '{{selector}} .et-pb-slider-arrows .et-pb-arrow-prev, {{selector}} .et-pb-slider-arrows .et-pb-arrow-next',
      settings: {
        advanced: {
          color: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designNavigation',
              attrName: 'arrows.advanced.color',
              label: __('Arrow Color', 'et_builder_5'),
              description: __(
                'Pick a color to use for the slider arrows that are used to navigate through each slide.',
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
          show: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentElements',
              attrName: 'arrows.advanced.show',
              label: __('Show Arrows', 'et_builder_5'),
              description: __('This setting will turn on and off the navigation arrows.', 'et_builder_5'),
              category: 'configuration',
              priority: 20,
              render: true,
              features: {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
    },
    pagination: {
      type: 'object',
      settings: {
        advanced: {
          show: {
            groupType: 'group-item',
            item: {
              groupSlug: 'contentElements',
              attrName: 'pagination.advanced.show',
              label: __('Show Controls', 'et_builder_5'),
              description: __(
                'This setting will turn on and off the circle buttons at the bottom of the slider.',
                'et_builder_5',
              ),
              category: 'configuration',
              priority: 30,
              render: true,
              features: {
                sticky: false,
                preset: ['html'],
              },
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
    },
    title: {
      type: 'object',
      selector: '{{selector}}.et_pb_slider .et_pb_slide_description .et_pb_slide_title',
      styleProps: {
        font: {
          propertySelectors: {
            font: {
              tabletWide: {
                value: {
                  'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_description .et_pb_slide_title',
                },
              },
              tablet: {
                value: {
                  'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_description .et_pb_slide_title',
                },
              },
              phoneWide: {
                value: {
                  'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_description .et_pb_slide_title',
                },
              },
              phone: {
                value: {
                  'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_description .et_pb_slide_title',
                },
              },
            },
          },
          important: {
            font: {
              desktop: {
                value: {
                  'font-size': true,
                  color: true,
                },
              },
            },
          },
        },
      },
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
    button: {
      type: 'object',
      customPostTypeSelector:
        'body.et-db #page-container #et-boc .et-l {{baseSelector}} .et_pb_more_button.et_pb_button',
      selector: 'body #page-container {{selector}} .et_pb_more_button.et_pb_button',
      styleProps: {
        spacing: {
          important: true,
        },
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
        decoration: {
          button: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designButton',
              priority: 10,
              render: true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/button',

                props: {
                  grouped: false,
                  fieldLabel: __('Button', 'et_builder_5'),
                  attrName: 'button',

                  fields: {
                    fontGroup: {
                      component: {
                        props: {
                          fields: {
                            lineHeight: {
                              render: false,
                            },
                            textAlign: {
                              render: false,
                            },
                          },
                        },
                      },
                    },
                    borderGroup: {
                      component: {
                        props: {
                          fields: {
                            styles: {
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
        },
      },
    },
    content: {
      type: 'object',
      selector: '{{selector}}.et_pb_slider .et_pb_slide_content',
      styleProps: {
        bodyFont: {
          propertySelectors: {
            body: {
              font: {
                desktop: {
                  value: {
                    'line-height': '{{selector}}.et_pb_slider, {{selector}}.et_pb_slider .et_pb_slide_content',
                  },
                },
                tablet: {
                  value: {
                    'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                    'line-height': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                  },
                },
                phone: {
                  value: {
                    'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                    'line-height': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                  },
                },
              },
            },
          },
        },
        sizing: {
          selector: '{{selector}} .et_pb_slide > .et_pb_container',
        },
      },
      settings: {
        decoration: {
          bodyFont: {
            priority: 50,

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
          sizing: {
            groupType: 'group-items',
            items: {
              width: {
                groupSlug: 'designSizing',
                attrName: 'content.decoration.sizing',
                subName: 'width',
                label: __('Content Width', 'et_builder_5'),
                description: __(
                  'By default, elements will extend the full width of their parent element. If you would like to set a custom static width, you can do so using this option.',
                  'et_builder_5',
                ),
                priority: 10,
                render: true,

                // Built-in component
                component: {
                  type: 'field',
                  name: 'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'width',
                    defaultUnit: '%',
                    max: 100,
                  },
                },
              },
              maxWidth: {
                groupSlug: 'designSizing',
                attrName: 'content.decoration.sizing',
                subName: 'maxWidth',
                label: __('Content Max Width', 'et_builder_5'),
                description: __(
                  'Setting a maximum width will prevent your element from ever surpassing the defined width value. Maximum width can be used in combination with the standard width setting. Maximum width supersedes the normal width value.',
                  'et_builder_5',
                ),
                priority: 20,
                render: true,

                // Built-in component
                component: {
                  type: 'field',
                  name: 'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'max-width',
                    defaultUnit: '%',
                    max: 100,
                  },
                },
              },
            },
          },
        },
      },
    },
    children: {
      type: 'object',
      settings: {
        advanced: {
          slideOverlay: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designOverlay',
              attrName: 'children.slideOverlay.advanced.use',
              label: __('Use Background Overlay', 'et_builder_5'),
              description: __(
                'When enabled, a custom overlay color will be added above your background image and behind your slider content.',
                'et_builder_5',
              ),
              category: 'configuration',
              priority: 10,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          contentOverlay: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designOverlay',
              attrName: 'children.contentOverlay.advanced.use',
              label: __('Use Text Overlay', 'et_builder_5'),
              description: __(
                'When enabled, a background color is added behind the slider text to make it more readable atop background images.',
                'et_builder_5',
              ),
              category: 'configuration',
              priority: 20,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          content: {
            groupType: 'group-item',
            item: {
              groupSlug: 'advancedVisibility',
              attrName: 'children.content.advanced.showOnMobile',
              label: __('Show Content On Mobile', 'et_builder_5'),
              description: __('This setting will toggle visibility of content on mobile devices.', 'et_builder_5'),
              category: 'layout',
              priority: 10,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },
              defaultAttr: {
                desktop: {
                  value: 'on',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          button: {
            groupType: 'group-item',
            item: {
              groupSlug: 'advancedVisibility',
              attrName: 'children.button.advanced.showOnMobile',
              label: __('Show CTA On Mobile', 'et_builder_5'),
              description: __('This setting will toggle visibility of CTA on mobile devices.', 'et_builder_5'),
              category: 'layout',
              priority: 20,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },
              defaultAttr: {
                desktop: {
                  value: 'on',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          background: {
            groupType: 'group-items',
            items: {
              contentBackground: {
                groupSlug: 'contentBackground',
                priority: 10,
                render: true,

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/background',

                  props: {
                    grouped: false,
                    attrName: 'children.module.decoration.background',
                  },
                },
              },
              contentOverlayUseBackground: {
                groupSlug: 'designOverlay',
                attrName: 'children.slideOverlay.decoration.background',
                subName: 'color',
                label: __('Background Overlay Color', 'et_builder_5'),
                description: __('Use the color picker to choose a color for the background overlay.', 'et_builder_5'),
                category: 'configuration',
                priority: 10,
                render: true,
                features: {
                  hover: false,
                  sticky: false,
                  preset: ['style', 'html'],
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
              contentOverlayUseText: {
                groupSlug: 'designOverlay',
                attrName: 'children.contentOverlay.decoration.background',
                subName: 'color',
                label: __('Text Overlay Color', 'et_builder_5'),
                description: __('Use the color picker to choose a color for the text overlay.', 'et_builder_5'),
                category: 'configuration',
                priority: 20,
                render: true,
                features: {
                  hover: false,
                  sticky: false,
                  preset: ['style', 'html'],
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
          border: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designOverlay',
              attrName: 'children.contentOverlay.decoration.border',
              subName: 'radius',
              label: __('Text Overlay Border Radius', 'et_builder_5'),
              description: __(
                'Increasing the border radius will increase the roundness of the overlay corners. Setting this value to 0 will result in squared corners.',
                'et_builder_5',
              ),
              category: 'layout',
              priority: 30,
              render: true,
              features: {
                hover: false,
                sticky: false,
                preset: ['style', 'html'],
                dynamicContent: {
                  type: 'number-advanced',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/border-radius',
              },
            },
          },
        },
      },
    },
    image: {
      type: 'object',
      selector: '{{selector}} .et_pb_slide_image img',
      settings: {
        advanced: {
          showOnMobile: {
            groupType: 'group-item',
            item: {
              groupSlug: 'advancedVisibility',
              attrName: 'image.advanced.showOnMobile',
              label: __('Show Image / Video On Mobile', 'et_builder_5'),
              description: __('This setting will toggle visibility of Images/Video on mobile devices.', 'et_builder_5'),
              category: 'layout',
              priority: 20,
              render: true,
              features: {
                responsive: false,
                hover: false,
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          border: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImage',
              priority: 10,
              render: true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/border',

                props: {
                  grouped: true,
                  fieldLabel: __('Image', 'et_builder_5'),
                },
              },
            },
          },
          boxShadow: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designImage',
              priority: 20,
              render: true,

              // Built-in component
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
        },
      },
    },
    dotNav: {
      type: 'object',
      selector: '{{selector}} .et-pb-controllers a, {{selector}} .et-pb-controllers .et-pb-active-control',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item: {
              groupSlug: 'designNavigation',
              attrName: 'dotNav.decoration.background',
              subName: 'color',
              label: __('Dot Navigation Color', 'et_builder_5'),
              description: __(
                'Pick a color to use for the dot navigation that appears at the bottom of the slider to designate which slide is active.',
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
        },
      },
    },
  },
  customCssFields: {
    slideDescription: {
      label: __('Slide Description', 'et_builder_5'),
      subName: 'slideDescription',
      selectorSuffix: ' .et_pb_slide_description',
    },
    slideTitle: {
      label: __('Slide Title', 'et_builder_5'),
      subName: 'slideTitle',
      selectorSuffix: ' .et_pb_slide_description .et_pb_slide_title',
    },
    slideButton: {
      label: __('Slide Button', 'et_builder_5'),
      subName: 'slideButton',
      selectorSuffix: '.et_pb_slider .et_pb_slide .et_pb_slide_description a.et_pb_more_button.et_pb_button',
    },
    slideControllers: {
      label: __('Slide Controllers', 'et_builder_5'),
      subName: 'slideControllers',
      selectorSuffix: ' .et-pb-controllers',
    },
    slideActiveController: {
      label: __('Slide Active Controller', 'et_builder_5'),
      subName: 'slideActiveController',
      selectorSuffix: ' .et-pb-controllers .et-pb-active-control',
    },
    slideImage: {
      label: __('Slide Image', 'et_builder_5'),
      subName: 'slideImage',
      selectorSuffix: ' .et_pb_slide_image',
    },
    slideArrows: {
      label: __('Slide Arrows', 'et_builder_5'),
      subName: 'slideArrows',
      selectorSuffix: ' .et-pb-slider-arrows a',
    },
  },
  settings: {
    content: 'auto',
    advanced: 'auto',

    groups: {
      // Content => Background
      contentBackground: {
        panel: 'content',
        groupName: 'background',
        priority: 90,

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Background', 'et_builder_5'),
            presetGroup: 'divi/background',
          },
        },
      },

      // Content > Elements
      contentElements: {
        panel: 'content',
        priority: 10,
        groupName: 'elements',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Elements', 'et_builder_5'),
            preset: 'content',
          },
        },
      },

      // Design > Overlay
      designOverlay: {
        panel: 'design',
        priority: 10,
        groupName: 'designOverlay',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Overlay', 'et_builder_5'),
          },
        },
      },

      // Design > Navigation
      designNavigation: {
        panel: 'design',
        priority: 20,
        groupName: 'designNavigation',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Navigation', 'et_builder_5'),
          },
        },
      },

      // Design > Image
      designImage: {
        panel: 'design',
        priority: 30,
        groupName: 'designImage',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Image', 'et_builder_5'),
          },
        },
      },

      // Design > Title Text
      designTitleText: {
        panel: 'design',
        priority: 40,
        groupName: 'designTitleText',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Title Text', 'et_builder_5'),
            presetGroup: 'divi/font',
          },
        },
      },

      // Design > Button
      designButton: {
        panel: 'design',
        priority: 60,
        groupName: 'designButton',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Button', 'et_builder_5'),
            presetGroup: 'divi/button',
          },
        },
      },

      // Design > Sizing
      designSizing: {
        panel: 'design',
        priority: 60,
        groupName: 'designSizing',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Sizing', 'et_builder_5'),
            presetGroup: 'divi/sizing',
          },
        },
      },

      // Design > Animation
      designAnimation: {
        panel: 'design',
        priority: 199,
        groupName: 'designAnimation',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Animation', 'et_builder_5'),
            presetGroup: 'divi/animation',
          },
        },
      },

      // Advanced > Visibility
      advancedVisibility: {
        panel: 'advanced',
        priority: 40,
        groupName: 'visibility',

        component: {
          name: 'divi/composite',
          props: {
            groupLabel: __('Visibility', 'et_builder_5'),
            presetGroup: 'divi/visibility-settings',
          },
        },
      },
    },
  },
  mousetrap: {
    inner: {
      // Child module covers entire module area so inner mousetrap needs to be rendered on the child module.
      edited: true,
    },
  },
};

export { sliderModuleMetaData };
