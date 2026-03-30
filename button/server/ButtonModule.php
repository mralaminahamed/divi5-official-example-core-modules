<?php
/**
 * Module Library: Button Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Button;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase,WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use Exception;
use WP_Block;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;

/**
 * ButtonModule class.
 *
 * This class implements the functionality of a button component in a frontend
 * application. It provides functions for rendering the button, managing REST
 * API endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class ButtonModule implements DependencyInterface {

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided
	 * arguments. It is used in the `render_callback` function of the Button module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-classnames moduleClassnames}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Module classnames instance.
	 *     @type array  $attrs              Block attributes data for rendering the module.
	 * }
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'classnamesInstance' => $classnamesInstance,
	 *   'attrs' => $attrs,
	 * ];
	 *
	 * ButtonModule::module_classnames($args);
	 * ```
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [], [ 'orientation' => false ] ), true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					// phpcs:ignore ET.Comments.Todo.TodoFound -- Legacy TODO: May not be tracked in GitHub issues yet. Preserve for future tracking/removal.
					// TODO feat(D5, Module Attribute Refactor) Once link is merged as part of options property, remove this.
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $args['attrs']['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Wrapper classnames function for the Button module.
	 *
	 * This function generates classnames for the module wrapper based on the provided arguments.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs wrapperClassnames}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array $attrs Block attributes data that being rendered.
	 * }
	 *
	 * @return void
	 */
	public static function wrapper_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		// Prefix the wrapper classname on theme builder layout.
		$layout_type               = $args['layoutType'] ?? 'default';
		$layout_type_to_prefix_map = [
			'et_header_layout' => '_tb_header',
			'et_body_layout'   => '_tb_body',
			'et_footer_layout' => '_tb_footer',
		];
		$wrapper_prefix            = $layout_type_to_prefix_map[ $layout_type ] ?? '';

		// Module wrapper's specific classnames.
		$link_value = $attrs['button']['innerContent']['desktop']['value']['linkUrl'] ?? '';
		$text_value = $attrs['button']['innerContent']['desktop']['value']['text'] ?? $link_value;

		$classnames_instance->add( 'et_pb_module' );
		$classnames_instance->add( 'et_pb_empty_button', ! $text_value && ! $link_value );
		$classnames_instance->add( 'et_pb_button_module_wrapper' );
		$classnames_instance->add( "et_pb_button_{$args['orderIndex']}{$wrapper_prefix}_wrapper" );
	}

	/**
	 * Button module script data.
	 *
	 * This function assigns variables and sets script data options for the module.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs ModuleScriptData}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     Optional. An array of arguments for setting the module script data.
	 *
	 *     @type string         $id            The module ID.
	 *     @type string         $name          The module name.
	 *     @type string         $selector      The module selector.
	 *     @type array          $attrs         The module attributes.
	 *     @type int            $storeInstance The ID of the instance where this block is stored in the `BlockParserStore` class.
	 *     @type ModuleElements $elements      The `ModuleElements` instance.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 * // Generate the script data for a module with specific arguments.
	 * $args = array(
	 *   'id'             => 'my-module',
	 *   'name'           => 'My Module',
	 *   'selector'       => '.my-module',
	 *   'attrs'          => array(
	 *     'portfolio' => array(
	 *       'advanced' => array(
	 *         'showTitle'       => false,
	 *         'showCategories'  => true,
	 *         'showPagination' => true,
	 *       )
	 *     )
	 *   ),
	 *   'elements'       => $elements,
	 *   'store_instance' => 123,
	 * );
	 *
	 * ButtonModule::module_script_data( $args );
	 * ```
	 */
	public static function module_script_data( array $args ): void {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'selector'      => $selector,
				'setContent'    => [
					[
						'data'          => $attrs['button']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							$text = $value['text'] ?? '';

							if ( $text ) {
								$text = ModuleUtils::extract_link_title( $text );
							}

							return '' === $text && ! empty( $value['linkUrl'] ) ? esc_url( $value['linkUrl'] ) : esc_attr( $text );
						},
					],
				],
				'setVisibility' => [
					[
						'data'          => $attrs['button']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return empty( $value['text'] ) && empty( $value['linkUrl'] ) ? 'hidden' : 'visible';
						},
					],
				],
			]
		);
	}

	/**
	 * Render callback for the Button module.
	 *
	 * This function is responsible for rendering the server-side HTML of the
	 * module on the frontend.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ ButtonEdit}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by Divi Builder.
	 * @param string         $child_modules_content       The block's content.
	 * @param WP_Block       $block                       Parsed block object that is being rendered.
	 * @param ModuleElements $elements                    An instance of the ModuleElements class.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @throws Exception If the icon type is not supported.
	 *
	 * @return string The HTML rendered output of the Button module.
	 *
	 * @example
	 * ```php
	 * $attrs = [
	 *   'attrName' => 'value',
	 *   //...
	 * ];
	 * $child_modules_content = 'The block content.';
	 * $block = new WP_Block();
	 * $elements = new ModuleElements();
	 *
	 * ButtonModule::render_callback( $attrs, $child_modules_content, $block, $elements, $default_printed_style_attrs );
	 * ```
	 */
	public static function render_callback( array $attrs, string $child_modules_content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		$link_value = $attrs['button']['innerContent']['desktop']['value']['linkUrl'] ?? '';
		$text_value = $attrs['button']['innerContent']['desktop']['value']['text'] ?? '';

		if ( $text_value ) {
			$text_value = ModuleUtils::extract_link_title( $text_value );
		}

		$text_value = '' === $text_value && ! empty( $link_value ) ? esc_url( $link_value ) : esc_attr( $text_value );

		$has_custom_button = 'on' === ( $attrs['button']['decoration']['button']['desktop']['value']['enable'] ?? 'off' );
		$is_icon_enabled   = 'on' === ( $attrs['button']['decoration']['button']['desktop']['value']['icon']['enable'] ?? 'off' );

		$button_decoration = $attrs['button']['decoration']['button'] ?? [];
		$icon_data_attrs   = [];

		// Convert camelCase breakpoint name to kebab-case for data attribute (e.g., phoneWide -> phone-wide).
		$breakpoint_to_data_attr = function ( $breakpoint ) {
			if ( 'desktop' === $breakpoint ) {
				return 'data-icon';
			}
			return 'data-icon-' . strtolower( preg_replace( '/([A-Z])/', '-$1', $breakpoint ) );
		};

		foreach ( $button_decoration as $breakpoint => $breakpoint_value ) {
			$icon_settings = $breakpoint_value['value']['icon']['settings'] ?? null;

			if ( $has_custom_button && $is_icon_enabled && isset( $icon_settings ) ) {
				$processed_icon = Utils::process_font_icon( $icon_settings );
				$data_attr_name = $breakpoint_to_data_attr( $breakpoint );

				$icon_data_attrs[ $data_attr_name ] = $processed_icon;
			}
		}

		$rendered_rel      = $attrs['button']['innerContent']['desktop']['value']['rel'] ?? '';
		$link_target_value = $attrs['button']['innerContent']['desktop']['value']['linkTarget'] ?? '';
		$link_target       = 'on' === $link_target_value ? '_blank' : null;

		// Nothing to output if neither Button Text nor Button URL is defined.
		if ( empty( $text_value ) && empty( $link_value ) ) {
			return '';
		}

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		// Extract child modules IDs using helper utility.
		$children_ids             = ChildrenUtils::extract_children_ids( $block );
		$has_children             = ! empty( $children_ids ) && is_array( $children_ids ) && count( $children_ids ) > 0;
		$should_separate_children = $has_children;

		// Check if Element Type is set to "button" via Advanced > HTML > Element Type.
		$html_attr          = $attrs['module']['advanced']['html'] ?? [];
		$element_type_value = ModuleUtils::get_attr_subname_value(
			[
				'attr'         => $html_attr,
				'breakpoint'   => 'desktop',
				'state'        => 'value',
				'mode'         => 'get',
				'subname'      => 'elementType',
				'defaultValue' => null,
			]
		);
		$element_type       = null;
		if ( is_string( $element_type_value ) && ! empty( $element_type_value ) ) {
			$element_type = strtolower( trim( $element_type_value ) );
		}
		$is_button_element = 'button' === $element_type;

		$html_attrs = [
			'href'   => esc_url( $link_value ),
			'target' => ! empty( $link_target ) ? esc_attr( $link_target ) : null,
			'rel'    => empty( $rendered_rel ) ? null : esc_attr( implode( ' ', $rendered_rel ) ),
		];

		// If Element Type is "button", use button tag and add onclick handler instead of href.
		if ( $is_button_element ) {
			// Use button tag instead of anchor.
			$tag = 'button';
			// Add onclick handler for navigation.
			// Note: HTMLUtility::render_attributes() will call esc_js() on the entire onclick value.
			// We should NOT pre-escape the URL - let esc_js() handle the entire string.
			// Use json_encode to properly escape the URL, then construct the JS code.
			if ( ! empty( $link_value ) ) {
				// Security: First validate URL with esc_url() to prevent javascript: protocol attacks.
				// esc_url() validates URL format and blocks dangerous protocols (javascript:, data:, etc.).
				// Then escape with esc_js() for safe use in JavaScript string context.
				$validated_url = esc_url( $link_value );
				// Only proceed if esc_url() returned a valid URL (empty string means invalid/dangerous).
				if ( ! empty( $validated_url ) ) {
					$escaped_url = esc_js( $validated_url );
					if ( 'on' === $link_target_value ) {
						// Construct JavaScript code using double quotes (esc_js() will escape them to \").
						$html_attrs['onclick'] = "window.open(\"{$escaped_url}\",\"_blank\",\"noopener,noreferrer\");return false;";
					} else {
						$html_attrs['onclick'] = "window.location.href=\"{$escaped_url}\";return false;";
					}
				}
			}
			// Add type="button" to prevent form submission.
			$html_attrs['type'] = 'button';
		} else {
			// Use anchor tag with href.
			$tag                = 'a';
			$html_attrs['href'] = esc_url( $link_value );
		}

		foreach ( $icon_data_attrs as $data_attr_name => $icon_value ) {
			if ( null !== $icon_value && '' !== $icon_value ) {
				$html_attrs[ $data_attr_name ] = esc_attr( $icon_value );
			}
		}

		$module_children = $elements->style_components(
			[
				'attrName' => 'button',
			]
		) . $text_value;

		if ( ! $should_separate_children ) {
			$module_children .= $child_modules_content;
		}

		return Module::render(
			[
				// FE only.
				'orderIndex'                => $block->parsed_block['orderIndex'],
				'storeInstance'             => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'                     => $attrs,
				'elements'                  => $elements,
				'htmlAttrs'                 => $html_attrs,
				'classnamesFunction'        => [ self::class, 'module_classnames' ],
				'id'                        => $block->parsed_block['id'],
				'hasModuleClassName'        => true,
				'hasModuleWrapper'          => true,
				'name'                      => $block->block_type->name,
				'moduleCategory'            => $block->block_type->category,
				'scriptDataComponent'       => [ self::class, 'module_script_data' ],
				'stylesComponent'           => [ self::class, 'module_styles' ],
				'tag'                       => $tag,
				'wrapperClassnamesFunction' => [ self::class, 'wrapper_classnames' ],
				'parentAttrs'               => $parent->attrs ?? [],
				'parentId'                  => $parent->id ?? '',
				'parentName'                => $parent->blockName ?? '',
				'childrenIds'               => $children_ids,
				'children'                  => $module_children,
				'wrapperChildren'           => $should_separate_children ? $child_modules_content : '',
			]
		);
	}

	/**
	 * Button alignment for wrapper (text-align only).
	 *
	 * This function will declare text-align style for button module wrapper.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The CSS for wrapper alignment.
	 */
	public static function button_alignment_wrapper_declaration( array $params ): string {
		$alignment_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $alignment_attr ) {
			$style_declarations->add( 'text-align', $alignment_attr );
		}

		return $style_declarations->value();
	}

	/**
	 * Button alignment for anchor tag (margin-left and margin-right only).
	 *
	 * This function will declare margin style for button anchor tag.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The CSS for anchor alignment.
	 */
	public static function button_alignment_anchor_declaration( array $params ): string {
		$alignment_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $alignment_attr ) {
			switch ( $alignment_attr ) {
				case 'left':
					$style_declarations->add( 'margin-left', '0' );
					$style_declarations->add( 'margin-right', 'auto' );
					break;
				case 'center':
					$style_declarations->add( 'margin-left', 'auto' );
					$style_declarations->add( 'margin-right', 'auto' );
					break;
				case 'right':
					$style_declarations->add( 'margin-left', 'auto' );
					$style_declarations->add( 'margin-right', '0' );
					break;
				default:
					break;
			}
		}

		return $style_declarations->value();
	}

	/**
	 * Generates a style declaration to ensure the Button module has `width: 100%`
	 * when its position is set to `absolute` with center-aligned horizontal origin
	 * (top center, center center, or bottom center).
	 *
	 * This resolves an issue where the Button module wrapper would shrink-wrap to its content
	 * width when absolutely positioned with center origin, causing button text to wrap into two lines
	 * in narrow columns.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of parameters.
	 *
	 *     @type array $params['attrValue'] Position attribute value.
	 * }
	 *
	 * @return string The generated CSS declarations.
	 *
	 * @example
	 * ```php
	 * $params = [
	 *   'attrValue' => [
	 *     'mode' => 'absolute',
	 *     'origin' => [ 'absolute' => 'top center' ],
	 *   ],
	 * ];
	 *
	 * ButtonModule::position_width_style_declaration($params);
	 * ```
	 */
	public static function position_width_style_declaration( array $params ): string {
		$attr_value = $params['attrValue'] ?? [];
		$mode       = $attr_value['mode'] ?? null;
		$origin     = $attr_value['origin'] ?? [];

		if ( ! $mode ) {
			return '';
		}

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		// Only apply width when position is absolute and origin is center-aligned horizontally.
		if ( 'absolute' === $mode ) {
			$absolute_origin    = $origin['absolute'] ?? null;
			$is_center_position =
				'top center' === $absolute_origin || 'center center' === $absolute_origin || 'bottom center' === $absolute_origin;

			if ( $is_center_position ) {
				$style_declarations->add( 'width', '100%' );
			}
		}

		return $style_declarations->value();
	}

	/**
	 * Button spacing style declaration.
	 *
	 * This function will declare spacing style for button module.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The CSS for button spacing style.
	 */
	public static function button_spacing_style_declaration( array $params ): string {
		$icon_show_on_hover = 'on' === ( $params['attrValue']['icon']['onHover'] ?? '' );

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $icon_show_on_hover ) {
			$style_declarations->add( 'padding-left', '1em' );
			$style_declarations->add( 'padding-right', '1em' );
		}

		return $style_declarations->value();
	}

	/**
	 * Removes the 'icon' property from button attributes across all breakpoints and attribute states.
	 *
	 * This function iterates through all breakpoints and attribute states in the provided button
	 * attributes and creates a new attributes array with the 'icon' property omitted from each
	 * attribute state array.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/removeIconAttrValue removeIconAttrValue}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $button_attrs The button attributes array containing breakpoint and attribute state data.
	 *                           Structure: [breakpoint][state][icon|other_properties].
	 *
	 * @return array A new button attributes array with the 'icon' property removed from all attribute
	 *               states across all breakpoints.
	 *
	 * @example
	 * ```php
	 * $button_attrs = [
	 *   'desktop' => [
	 *     'value' => [
	 *       'icon' => ['settings' => [...]],
	 *       'enable' => 'on',
	 *     ],
	 *   ],
	 * ];
	 *
	 * $removed_icon_attrs = ButtonModule::remove_icon_attr_value( $button_attrs );
	 * // Result: ['desktop' => ['value' => ['enable' => 'on']]]
	 * ```
	 */
	public static function remove_icon_attr_value( array $button_attrs ): array {
		$removed_icon_attrs = [];

		foreach ( $button_attrs as $breakpoint_name => $breakpoint_data ) {
			if ( ! is_array( $breakpoint_data ) ) {
				continue;
			}

			$removed_icon_attrs[ $breakpoint_name ] = [];

			foreach ( $breakpoint_data as $attr_state_name => $attr_state_data ) {
				if ( ! is_array( $attr_state_data ) ) {
					$removed_icon_attrs[ $breakpoint_name ][ $attr_state_name ] = $attr_state_data;
					continue;
				}

				// Remove 'icon' key from attribute state data.
				$removed_state_data = $attr_state_data;
				unset( $removed_state_data['icon'] );

				$removed_icon_attrs[ $breakpoint_name ][ $attr_state_name ] = $removed_state_data;
			}
		}

		return $removed_icon_attrs;
	}

	/**
	 * Button Module's style components.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-styles moduleStyles}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *      @type string $id                Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *      @type string $isCustomPostType  Is rendered in custom post type.
	 *      @type string $name              Module name.
	 *      @type string $attrs             Module attributes.
	 *      @type string $parentAttrs       Parent attrs.
	 *      @type string $baseOrderClass    Base selector class without additional prefix on custom post type scren.
	 *      @type string $orderClass        Selector class name.
	 *      @type string $parentOrderClass  Parent selector class name.
	 *      @type string $wrapperOrderClass Wrapper selector class name.
	 *      @type string $settings          Custom settings.
	 *      @type string $state             Attributes state.
	 *      @type string $mode              Style mode.
	 *      @type ModuleElements $elements  ModuleElements instance.
	 * }
	 *
	 * @return void
	 */
	public static function module_styles( array $args ): void {
		$default_attributes = ModuleRegistration::get_default_attrs( 'divi/button' );
		$attrs              = array_replace_recursive( $default_attributes, $args['attrs'] );
		$elements           = $args['elements'];
		$style_group        = $args['styleGroup'];
		$settings           = $args['settings'] ?? [];

		$icon_placement_value = $attrs['button']['decoration']['button']['desktop']['value']['icon']['placement'] ?? 'right';
		$icon_placement       = 'left' === $icon_placement_value ? 'before' : 'after';

		$is_custom_post_type = $args['isCustomPostType'] ?? false;

		$order_class      = $args['orderClass'] ?? '';
		$base_order_class = $args['baseOrderClass'] ?? '';

		$wrapper_order_class = $args['wrapperOrderClass'] ?? '';

		$module_element_attrs = $attrs['module']['decoration'] ?? [];
		$button_element_attrs = $attrs['button']['decoration'] ?? [];

		if ( 'presetGroup' === $style_group ) {
			$module_element_attrs = array_replace_recursive(
				[
					'spacing'   => $attrs['button']['decoration']['spacing'] ?? [],
					'boxShadow' => $attrs['button']['decoration']['boxShadow'] ?? [],
				],
				$module_element_attrs
			);

			unset( $button_element_attrs['spacing'] );
			unset( $button_element_attrs['boxShadow'] );
		}

		if ( 'module' === $style_group ) {
			unset( $button_element_attrs['boxShadow'] );
		}

		$button_affecting_attrs = 'module' === $style_group ? [
			'spacing' => array_replace_recursive(
				isset( $elements->preset_printed_style_attrs ) && is_array( $elements->preset_printed_style_attrs ) ? ( $elements->preset_printed_style_attrs['module']['decoration']['spacing'] ?? [] ) : [],
				$attrs['module']['decoration']['spacing'] ?? []
			),
		] : [
			'spacing' => $attrs['module']['decoration']['spacing'] ?? [],
		];

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
								'attrs'          => $module_element_attrs,
								'spacing'        => [
									'propertySelectors' => [
										'desktop' => [
											'value' => [
												'margin'  => $wrapper_order_class,
												'padding' => implode(
													', ',
													[
														"{$wrapper_order_class} {$base_order_class}",
														"{$wrapper_order_class} {$base_order_class}:hover",
													]
												),
											],
										],
									],
									'important'         => true,
								],
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'attr'        => $attrs['module']['advanced']['text'] ?? [],
											'orientation' => false,
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $wrapper_order_class,
											'attr'     => $attrs['module']['advanced']['alignment'] ?? [],
											'declarationFunction' => [ self::class, 'button_alignment_wrapper_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$wrapper_order_class} {$base_order_class}",
											'attr'     => $attrs['module']['advanced']['alignment'] ?? [],
											'declarationFunction' => [ self::class, 'button_alignment_anchor_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $wrapper_order_class,
											'attr'     => $attrs['module']['decoration']['position'] ?? [],
											'declarationFunction' => [ self::class, 'position_width_style_declaration' ],
										],
									],
								],
							],
						]
					),

					// Button.
					$elements->style(
						[
							'attrName'   => 'button',
							'styleProps' => [
								'attrs'          => $button_element_attrs,
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												$is_custom_post_type
													? [
														"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:{$icon_placement}",
														"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:hover:{$icon_placement}",
													]
													: [
														"body #page-container .et_pb_section {$base_order_class}:{$icon_placement}",
														"body #page-container .et_pb_section {$base_order_class}:hover:{$icon_placement}",
													]
											),
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												$is_custom_post_type
												? [
													"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}",
													"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:hover",
												]
												: [
													"body #page-container .et_pb_section {$base_order_class}",
													"body #page-container .et_pb_section {$base_order_class}:hover",
												]
											),
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_fe_declaration' ],
											'selectorFunction' => function ( $params ) {
												$params = wp_parse_args(
													$params,
													[
														'selector' => null,
													]
												);

												$selector = $params['selector'];

												return implode(
													', ',
													array_map(
														static function ( $element ) {
															return $element . ':after';
														},
														explode( ', ', $selector )
													)
												);
											},
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $is_custom_post_type
												? "body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:hover"
												: "body #page-container .et_pb_section {$base_order_class}:hover",
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'hover_icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $is_custom_post_type
												? "body.et-db #page-container #et-boc .et-l {$order_class}"
												: "body #page-container {$order_class}",
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'button_spacing_style_declaration' ],
										],
									],
								],
								'button'         => [
									'affectingAttrs' => $button_affecting_attrs,
								],
								'attrsFilter'    => function ( $decoration_attrs ) use ( $style_group ): ?array {
									// Disable the button icon style for group presets as the button icon styles rendering
									// requires attributes from the spacing group, which is not available at the preset group level.
									if ( 'presetGroup' === $style_group && isset( $decoration_attrs['button'] ) ) {
										return array_merge(
											$decoration_attrs,
											[
												'button' => self::remove_icon_attr_value( $decoration_attrs['button'] ),
											]
										);
									}

									return $decoration_attrs;
								},
							],
						]
					),

					// Module - Only for Custom CSS.
					CssStyle::style(
						[
							'selector' => $args['orderClass'],
							'attr'     => $attrs['css'] ?? [],
						]
					),

					// Add cursor pointer for button elements.
					CssStyle::style(
						[
							'selector' => "{$wrapper_order_class} {$base_order_class}",
							'attr'     => [
								'desktop' => [
									'value' => [
										'mainElement' => 'cursor: pointer;',
									],
								],
							],
						]
					),
				],
			]
		);
	}

	/**
	 * Icon style declaration
	 *
	 * This function will declare icon style for Button module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  Optional. If set to true, the CSS will be added with !important. Default false.
	 *     @type string     $returnType Optional. This is the type of value that the function will return.
	 *                                  Can be either "string" or "key_value_pair". Default "string".
	 * }
	 *
	 * @throws Exception If the icon type is not supported.
	 *
	 * @return string|array The icon style declaration or key/value pairs.
	 */
	public static function icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
					'font-size'   => true,
					'line-height' => true,
				],
			]
		);

		// Skip icon styles when "Use Custom Styles For Button" is disabled.
		// This matches D4 behavior where disabling custom styles removes icon styles.
		$enable = $icon_attr['enable'] ?? 'off';
		if ( 'off' === $enable ) {
			return $style_declarations->value();
		}

		if ( ! empty( $icon_attr['icon']['settings'] ) ) {
			$icon_unicode = Utils::escape_font_icon( Utils::process_font_icon( $icon_attr['icon']['settings'] ) );

			$style_declarations->add( 'content', "'{$icon_unicode}'" );
		}

		if ( ! empty( $icon_attr['icon']['settings']['type'] ) ) {
			$font_family = 'fa' === $icon_attr['icon']['settings']['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		// Add margin-left or margin-right based on icon placement to position the icon correctly.
		$icon_placement  = $icon_attr['icon']['placement'] ?? 'right';
		$has_custom_icon = ! empty( $icon_attr['icon']['settings']['unicode'] );

		if ( 'left' === $icon_placement ) {
			$style_declarations->add( 'margin-left', '-1.3em' );
		} elseif ( $has_custom_icon ) {
			$style_declarations->add( 'margin-left', '0.3em' );
		}

		$style_declarations->add( 'line-height', '1em' );

		return $style_declarations->value();
	}

	/**
	 * FE specific Icon style declaration
	 *
	 * This function will declare FE specific Icon style for Button module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of module attribute.
	 * }
	 *
	 * @return string The icon style frontend declaration.
	 */
	public static function icon_style_fe_declaration( array $params ): string {
		$icon_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		// Skip icon frontend styles when "Use Custom Styles For Button" is disabled.
		// This matches D4 behavior where disabling custom styles removes icon styles.
		$enable = $icon_attr['enable'] ?? 'off';
		if ( 'off' === $enable ) {
			return $style_declarations->value();
		}

		$icon_placement = $icon_attr['icon']['placement'] ?? 'right';

		if ( 'left' === $icon_placement ) {
			$style_declarations->add( 'display', 'none' );
		}

		return $style_declarations->value();
	}

	/**
	 * FE specific hover Icon style declaration
	 *
	 * This function will declare FE specific Hover Icon style for Button module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of module attribute.
	 * }
	 *
	 * @return string The icon style hover declaration.
	 */
	public static function hover_icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		// Skip icon hover styles when "Use Custom Styles For Button" is disabled.
		// This matches D4 behavior where disabling custom styles removes icon styles.
		$enable = $icon_attr['enable'] ?? 'off';
		if ( 'off' === $enable ) {
			return $style_declarations->value();
		}

		$icon_placement = $icon_attr['icon']['placement'] ?? 'right';
		$hover          = $icon_attr['icon']['onHover'] ?? 'on';

		if ( 'on' === $hover && 'left' === $icon_placement ) {
			$style_declarations->add( 'padding-right', '.7em' );
			$style_declarations->add( 'padding-left', '2em' );
		}

		return $style_declarations->value();
	}

	/**
	 * Loads `ButtonModule` and registers the frontend render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/button/';

		add_filter( 'divi_conversion_presets_attrs_map', [ ButtonPresetAttrsMap::class, 'get_map' ], 10, 2 );

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
