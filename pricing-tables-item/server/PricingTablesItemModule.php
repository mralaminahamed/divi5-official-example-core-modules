<?php
/**
 * ModuleLibrary: Pricing Table Module class.
 *
 * @package Builder\Packages\ModuleLibrary\PricingTablesItemModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase,WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use ET\Builder\Packages\StyleLibrary\Declarations\Declarations;
use WP_Block;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\GlobalData\GlobalData;
use ET\Builder\Framework\Breakpoint\Breakpoint;
use ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesModule;

/**
 * `PricingTablesItemModule` is consisted of functions used for Pricing Table Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class PricingTablesItemModule implements DependencyInterface {

	/**
	 * Module classnames function for pricing table module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/pricing-table/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object  $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array   $attrs              Block attributes data that being rendered.
	 *     @type boolean $isFirst            Is the child element the first element.
	 *     @type string  $id                 Module ID.
	 *     @type array   $parentAttrs        Parent module attributes.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];
		$id                  = $args['id'] ?? '';
		$parent_attrs        = $args['parentAttrs'] ?? [];

		// Featured Table.
		$featured = $attrs['module']['advanced']['featured']['desktop']['value'] ?? '';

		$classnames_instance->add( 'et_pb_featured_table', 'on' === $featured );

		// Check if the parent is a grid layout.
		// Note: Flex column classes are handled by Module.php, not here.
		// This module uses module.decoration.sizing (not module.advanced.sizing),
		// so Module.php will handle flex column width classes correctly.
		$parent_layout_display = $parent_attrs['module']['decoration']['layout']['desktop']['value']['display'] ?? 'flex';
		$is_parent_grid_layout = 'grid' === $parent_layout_display;

		if ( $is_parent_grid_layout ) {
			$classnames_instance->add( 'et_grid_column', true );
		}
	}

	/**
	 * Set script data of pricing table module options.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *   Array of arguments.
	 *
	 *   @type string         $id            Module id.
	 *   @type string         $name          Module name.
	 *   @type string         $selector      Module selector.
	 *   @type array          $attrs         Module attributes.
	 *   @type int            $storeInstance The ID of instance where this block stored in BlockParserStore class.
	 *   @type ModuleElements $elements      ModuleElements instance.
	 * }
	 */
	public static function module_script_data( $args ) {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$store_instance = $args['storeInstance'] ?? null;
		$elements       = $args['elements'];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);
	}

	/**
	 * Custom CSS fields
	 *
	 * This function is equivalent of JS const cssFields located in
	 * visual-builder/packages/module-library/src/components/pricing-table/custom-css.ts.
	 *
	 * A minor difference with the JS const cssFields, this function did not have `label` property on each array item.
	 *
	 * @since ??
	 */
	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'divi/pricing-table' )->customCssFields;
	}



	/**
	 * Pricing Table Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/pricing-table/module-styles.tsx.
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *      @type string         $id                Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *      @type string         $name              Module name.
	 *      @type string         $attrs             Module attributes.
	 *      @type string         $parent_attrs       Parent attrs.
	 *      @type string         $orderClass        Selector class name.
	 *      @type string         $parentOrderClass  Parent selector class name.
	 *      @type string         $wrapperOrderClass Wrapper selector class name.
	 *      @type string         $settings          Custom settings.
	 *      @type string         $state             Attributes state.
	 *      @type string         $mode              Style mode.
	 *      @type ModuleElements $elements          ModuleElements instance.
	 * }
	 * @since ??
	 */
	public static function module_styles( array $args ) {
		$attrs        = $args['attrs'] ?? [];
		$elements     = $args['elements'];
		$settings     = $args['settings'] ?? [];
		$parent_attrs = $args['parentAttrs'] ?? [];

		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs']['module']['decoration'] ?? [];
		$parent_button_attr          = $parent_attrs['button']['decoration']['button']['desktop']['value'] ?? [];

		$base_order_class = $args['baseOrderClass'] ?? '';
		$selector_prefix  = $args['selectorPrefix'] ?? '';

		Style::add(
			[
				'id'            => $args['id'],
				'name'          => $args['name'],
				'orderIndex'    => $args['orderIndex'],
				'storeInstance' => $args['storeInstance'],
				'styles'        => [
					// Module.
					$elements->style(
						[
							'attrName'   => 'module',
							'styleProps' => [
								'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
								'disabledOn'               => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles'           => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'selector' => implode(
												', ',
												[
													"{$args['orderClass']}.et_pb_pricing_table",
													"{$args['orderClass']} .et_pb_pricing_content",
												]
											),
											'attr'     => $attrs['module']['advanced']['text'] ?? [],
											'propertySelectors' => [
												'textShadow' => [
													'desktop' => [
														'value' => [
															'text-shadow' => implode(
																', ',
																[
																	"{$args['orderClass']} .et_pb_pricing_heading",
																	"{$args['orderClass']} .et_pb_pricing_content_top",
																	"{$args['orderClass']} .et_pb_pricing_content",
																]
															),
														],
													],
												],
											],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$selector_prefix}.et_pb_pricing .et_pb_pricing_table{$base_order_class}",
											'attr'     => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => function ( $params ) use ( $attrs ) {
												$overflow_attr = $attrs['module']['decoration']['overflow'] ?? [];
												return Declarations::overflow_for_border_radius_style_declaration( $params, $overflow_attr );
											},
										],
									],
								],
							],
						]
					),
					// Price.
					$elements->style(
						[
							'attrName' => 'price',
						]
					),
					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),
					// Description.
					$elements->style(
						[
							'attrName'   => 'content',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']}.et_pb_pricing_table .et_pb_pricing li",
											'attr'     => $attrs['content']['decoration']['bodyFont']['body']['font'] ?? [],
											'declarationFunction' => [ PricingTablesModule::class, 'pricing_table_body_content_spacing_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector'  => "{$args['orderClass']} ul.et_pb_pricing li span::before",
											'attr'      => $attrs['content']['advanced']['bulletColor'] ?? [],
											'property'  => 'border-color',
											'important' => true,
										],
									],
								],
							],
						]
					),
					// Best Value.
					$elements->style(
						[
							'attrName' => 'subtitle',
						]
					),
					// Currency.
					$elements->style(
						[
							'attrName' => 'currencyFrequency',
						]
					),
					// Item Not Available.
					$elements->style(
						[
							'attrName' => 'excluded',
						]
					),
					// Pricing Table Button.
					$elements->style(
						[
							'attrName'   => 'button',
							'styleProps' => [
								'attrsFilter' => function ( $decoration_attrs ) use ( $parent_button_attr ) {
									return PricingTablesItemModule::filter_button_decoration_attrs( $decoration_attrs, $parent_button_attr );
								},
							],
						]
					),
					// Module - Only for Custom CSS.
					CssStyle::style(
						[
							'selector'  => $args['orderClass'],
							'attr'      => $attrs['css'] ?? [],
							'cssFields' => self::custom_css(),
						]
					),
				],
			]
		);
	}

	/**
	 * Render Pricing List Item Content.
	 *
	 * @since ??
	 *
	 * @param string $content The content.
	 *
	 * @return string The processed content.
	 */
	public static function render_pricing_list( string $content ) {
		$content    = preg_replace( '/<p>|<\/p>|<br>|<br\s*\/?>/', "\n", $content );
		$list_items = array_values( array_filter( explode( "\n", $content ) ) );

		$children = '';

		foreach ( $list_items as $index => $list_item ) {
			$list_item_trimmed = trim( $list_item );
			if ( '' === $list_item_trimmed ) {
				continue;
			}

			$plus_minus_sign = substr( $list_item_trimmed, 0, 1 );
			$list_content    = in_array( $plus_minus_sign, [ '-', '+' ], true ) ? substr( $list_item_trimmed, 1 ) : $list_item_trimmed;

			if ( '-' === $plus_minus_sign ) {
				$children .= HTMLUtility::render(
					[
						'tag'               => 'li',
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_not_available' => true,
								]
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'               => 'span',
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => $list_content,
							]
						),
					]
				);
			} else {
				$children .= HTMLUtility::render(
					[
						'tag'               => 'li',
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'               => 'span',
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => $list_content,
							]
						),
					]
				);
			}
		}

		// Pricing Table List Items Wrapper.
		$list_items_wrapper = HTMLUtility::render(
			[
				'tag'               => 'ul',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_pricing' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $children,
			]
		);

		return $list_items_wrapper;
	}

	/**
	 * Pricing Table render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by VB.
	 * @param string         $child_modules_content       Block content.
	 * @param WP_Block       $block                       Parsed block object that being rendered.
	 * @param ModuleElements $elements                    ModuleElements instance.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @return string HTML rendered of BarCountersItem module.
	 */
	public static function render_callback( $attrs, $child_modules_content, $block, $elements, $default_printed_style_attrs ) {
		$children_ids = ChildrenUtils::extract_children_ids( $block );
		$parent       = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$parent_attrs = ModuleUtils::get_all_attrs( $parent );

		// Heading Level.
		$parent_heading_level = $parent_attrs['title']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? 'h2';
		$heading_level        = $attrs['title']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? '';
		$heading_level        = empty( $heading_level ) ? $parent_heading_level : $heading_level;

		// Title.
		$pricing_table_title = $elements->render(
			[
				'attrName' => 'title',
				'tagName'  => $heading_level,
			]
		);

		// Subtitle.
		$pricing_table_subtitle = $elements->render(
			[
				'attrName' => 'subtitle',
			]
		);

		// Pricing Table Heading Wrapper.
		$pricing_table_heading_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_pricing_heading' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $pricing_table_title . $pricing_table_subtitle,
			]
		);

		// Currency Frequency.
		$currency_frequency = $elements->render(
			[
				'selector'    => '{{selector}} .et_pb_dollar_sign',
				'attrName'    => 'currencyFrequency',
				'attrSubName' => 'currency',
				'attributes'  => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_dollar_sign' => true,
						]
					),
				],
			]
		);

		// Price.
		$price = $elements->render(
			[
				'attrName' => 'price',
			]
		);

		// Currency Frequency Per.
		$currency_frequency_per = $elements->render(
			[
				'selector'      => '{{selector}} .et_pb_frequency',
				'attrName'      => 'currencyFrequency',
				'attrSubName'   => 'per',
				'attributes'    => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_frequency' => true,
						]
					),
				],
				'valueResolver' => function ( $value ) {
					return ! empty( $value ) ? HTMLUtility::render(
						[
							'tag'               => 'span',
							'attributes'        => [
								'class' => HTMLUtility::classnames(
									[
										'et_pb_frequency_slash' => true,
									]
								),
							],
							'childrenSanitizer' => 'et_core_esc_previously',
							'children'          => '/',
						]
					) . $value : '';
				},
			]
		);

		// Pricing Table Price Content Wrapper.
		$pricing_table_price_content_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_pricing_content_top' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_et_price' => true,
								]
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => $currency_frequency . $price . $currency_frequency_per,
					]
				),
			]
		);

		// Pricing Table List Content.
		$pricing_list_content = $elements->render(
			[
				'attrName'          => 'content',
				'tagName'           => 'div',
				'attributes'        => [
					'class' => 'et_pb_pricing_content',
				],
				'skipAttrChildren'  => true,
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					'attrName'      => 'content',
					'valueResolver' => function ( $value ) {
						return PricingTablesItemModule::render_pricing_list( $value );
					},
				],
			]
		);

		// Button.
		$button = $elements->render(
			[
				'attrName' => 'button',
			]
		);

		return Module::render(
			[
				// FE only.
				'orderIndex'               => $block->parsed_block['orderIndex'],
				'storeInstance'            => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'id'                       => $block->parsed_block['id'],
				'name'                     => $block->block_type->name,
				'moduleCategory'           => $block->block_type->category,
				'attrs'                    => $attrs,
				'elements'                 => $elements,
				'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
				'hasModuleClassName'       => true,
				'classnamesFunction'       => [ self::class, 'module_classnames' ],
				'scriptDataComponent'      => [ self::class, 'module_script_data' ],
				'stylesComponent'          => [ self::class, 'module_styles' ],
				'parentAttrs'              => $parent_attrs,
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'childrenIds'              => $children_ids,
				'children'                 => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $pricing_table_heading_wrapper . $pricing_table_price_content_wrapper . $pricing_list_content . $button . $child_modules_content,
			]
		);
	}

	/**
	 * Filters the button.decoration attributes.
	 *
	 * This function is equivalent of JS function filterButtonDecorationAttrs located in
	 * visual-builder/packages/module-library/src/components/pricing-table/attrs-filter/filter-button-decoration-attrs/index.ts.
	 *
	 * @since ??
	 *
	 * @param array $decoration_attrs   The original decoration attributes.
	 * @param array $parent_button_attr The attributes of the parent button module.
	 *
	 * @return array The filtered decoration attributes.
	 */
	public static function filter_button_decoration_attrs( array $decoration_attrs, array $parent_button_attr ): array {
		$button_attr  = $decoration_attrs['button'] ?? [];
		$button_attrs = $button_attr ?? [];

		// Iterate through each `attrState` for every `attrBreakpoint` in the `button_attr` object.
		foreach ( $button_attr as $attr_breakpoint => $attr_state_values ) {
			foreach ( $attr_state_values as $attr_state => $value ) {
				if ( ! array_key_exists( $attr_breakpoint, $button_attrs ) ) {
					$button_attrs[ $attr_breakpoint ] = [];
				}

				if ( ! array_key_exists( $attr_state, $button_attrs[ $attr_breakpoint ] ) ) {
					$button_attrs[ $attr_breakpoint ][ $attr_state ] = [];
				}

				$icon_settings_attr = ModuleUtils::use_attr_value(
					[
						'attr'       => $button_attrs,
						'state'      => $attr_state,
						'breakpoint' => $attr_breakpoint,
					]
				);
				// Attribute icon.enable is desktop only.
				$enabled       = $button_attrs['desktop']['value']['icon']['enable'] ?? '';
				$icon_settings = $icon_settings_attr['icon']['settings'] ?? [];

				// If the settings key is not present into icon array which means icon is not set.
				if ( isset( $button_attrs[ $attr_breakpoint ][ $attr_state ]['icon'] ) && is_array( $button_attrs[ $attr_breakpoint ][ $attr_state ]['icon'] ) ) {
					if ( ! array_key_exists( 'settings', $button_attrs[ $attr_breakpoint ][ $attr_state ]['icon'] ) ) {
						$button_attrs[ $attr_breakpoint ][ $attr_state ]['icon']['settings'] = [];
					}
				}

				// If icon.enable is on for child pricing table and
				// icon.settings is undefined which means icon is not set for child pricing table
				// Then only merge the parent button icon attrs into child.
				if ( 'on' === $enabled && empty( $icon_settings ) ) {
					$button_attrs[ $attr_breakpoint ][ $attr_state ]['icon']['settings'] = $parent_button_attr['icon']['settings'];
				}
			}
		}

		return array_merge(
			$decoration_attrs,
			[
				'button' => $button_attrs,
			]
		);
	}

	/**
	 * Loads `PricingTablesItemModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/pricing-table/';

		add_filter( 'divi_conversion_presets_attrs_map', [ PricingTablesItemPresetAttrsMap::class, 'get_map' ], 10, 2 );

		// Ensure that all filters and actions applied during module registration are registered before calling `ModuleRegistration::register_module()`.
		// However, for consistency, register all module-specific filters and actions prior to invoking `ModuleRegistration::register_module()`.
		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);
	}
}
