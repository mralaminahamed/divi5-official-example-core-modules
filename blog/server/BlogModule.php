<?php
/**
 * ModuleLibrary: Blog Module class.
 *
 * @package Builder\ModuleLibrary\BlogModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block.

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\PostUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\Assets\DetectFeature;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewUtils;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\Module\Options\Text\TextStyle;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\ModuleUtils\ImageUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Packages\StyleLibrary\Declarations\Declarations;
use WP_Query;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroupAttrNameResolver;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroupAttrNameResolved;
use ET\Builder\Framework\Utility\ArrayUtility;
use ET\Builder\Framework\Breakpoint\Breakpoint;

/**
 * `BlogModule` is consisted of functions used for Blog Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class BlogModule implements DependencyInterface {
	/**
	 * Track if the module is currently rendering to prevent unnecessary rendering and recursion.
	 *
	 * @var bool
	 */
	protected static $_rendering = false;

	/**
	 * Custom CSS fields
	 *
	 * This function is equivalent of JS const cssFields located in
	 * visual-builder/packages/module-library/src/components/blog/custom-css.ts.
	 *
	 * A minor difference with the JS const cssFields, this function did not have `label` property on each array item.
	 *
	 * @since ??
	 */
	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'divi/blog' )->customCssFields;
	}

	/**
	 * Keep Blog Custom CSS hover behavior scoped to the child element target.
	 *
	 * For hover-state custom CSS on multi-part selectors (e.g. title, content,
	 * postMeta, featuredImage, readMore), append `:hover` to the child element
	 * selector so frontend output targets only the hovered element. For sticky
	 * state, retain `.et_pb_sticky` targeting on the parent (module) selector.
	 * Single-part selectors pass through unchanged.
	 *
	 * @since ??
	 *
	 * @param array $params Selector function params.
	 *
	 * @return string
	 */
	public static function custom_css_selector_function( array $params ): string {
		$selector = (string) ( $params['selector'] ?? '' );
		$state    = (string) ( $params['state'] ?? 'value' );

		if ( ! str_contains( $selector, ' ' ) ) {
			return $selector;
		}

		if ( 'sticky' === $state ) {
			$selectors = array_filter(
				array_map( 'trim', explode( ',', $selector ) ),
				static function ( string $item ): bool {
					return '' !== $item;
				}
			);

			$sticky_selectors = array_map(
				static function ( string $item ): string {
					$parts = explode( ' ', $item );

					if ( count( $parts ) < 2 ) {
						return str_contains( $item, '.et_pb_sticky' ) ? $item : $item . '.et_pb_sticky';
					}

					$module_selector = $parts[0];
					$child_parts     = implode( ' ', array_slice( $parts, 1 ) );
					$sticky_module   = str_contains( $module_selector, '.et_pb_sticky' )
						? $module_selector
						: $module_selector . '.et_pb_sticky';

					return $sticky_module . ' ' . $child_parts;
				},
				$selectors
			);

			return implode( ', ', array_unique( $sticky_selectors ) );
		}

		if ( 'hover' !== $state ) {
			return $selector;
		}

		$selectors = array_filter(
			array_map( 'trim', explode( ',', $selector ) ),
			static function ( string $item ): bool {
				return '' !== $item;
			}
		);

		$hover_selectors = array_map(
			static function ( string $item ): string {
				if ( str_contains( $item, ':hover' ) ) {
					return $item;
				}

				return $item . ':hover';
			},
			$selectors
		);

		return implode( ', ', $hover_selectors );
	}


	/**
	 * Blog Grid Item's CSS declaration for horizontal gap.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of parameters.
	 *
	 *     @type string $selector    Selector.
	 *     @type array  $attr        Attribute.
	 *     @type bool   $important   Important.
	 *     @type string $returnType  Return type.
	 * }
	 *
	 * @return string
	 */
	public static function blog_grid_item_style_declaration( array $params ): string {
		$declarations = new StyleDeclarations( $params );
		$attr         = $params['attr'] ?? [];

		return $declarations->value();
	}

	/**
	 * Blog Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/cta/styles.tsx.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *      @type string         $id                Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *      @type string         $name              Module name.
	 *      @type string         $attrs             Module attributes.
	 *      @type string         $parentAttrs       Parent attrs.
	 *      @type string         $orderClass        Selector class name.
	 *      @type string         $parentOrderClass  Parent selector class name.
	 *      @type string         $wrapperOrderClass Wrapper selector class name.
	 *      @type string         $settings          Custom settings.
	 *      @type string         $state             Attributes state.
	 *      @type string         $mode              Style mode.
	 *      @type bool           $isInsideStickyModule Optional. Whether the module is inside a sticky module or not. Default `false`.
	 *      @type string|null    $stickyParentOrderClass Optional. The sticky parent order class name. Default `null`.
	 *      @type ModuleElements $elements          ModuleElements instance.
	 * }
	 */
	public static function module_styles( array $args ): void {
		$attrs                     = $args['attrs'] ?? [];
		$elements                  = $args['elements'];
		$settings                  = $args['settings'] ?? [];
		$order_class               = $args['orderClass'] ?? '';
		$is_inside_sticky_module   = $elements->get_is_inside_sticky_module();
		$sticky_parent_order_class = $elements->get_sticky_parent_order_class();
		$pagination_font_attr      = $attrs['pagination']['decoration']['font']['font'] ?? [];

		// Determine layout display for conditional border rendering.
		$layout_display = $attrs['blogGrid']['decoration']['layout']['desktop']['value']['display'] ?? 'grid';
		$is_grid_layout = 'grid' === $layout_display;

		// Build the border style element based on layout mode.
		if ( $is_grid_layout ) {
			// Post Item (Grid Layout).
			$border_style = $elements->style(
				[
					'attrName'   => 'post',
					'styleProps' => [
						'border'         => [
							'selector'         => "{$args['orderClass']} article.et_pb_post",
							'selectorFunction' => function ( $params ) use ( $args ) {
								$selector = $params['selector'];

								// Task 44550: Fix hover placement - move :hover to the end (on article, not module).
								if ( str_contains( $selector, ':hover' ) ) {
									// Remove :hover from wherever it is.
									$selector = str_replace( ':hover', '', $selector );
									// Add :hover at the end.
									$selector = $selector . ':hover';
								}

								return $selector;
							},
						],
						'advancedStyles' => [
							[
								'componentName' => 'divi/common',
								'props'         => [
									'selector'            => "{$args['orderClass']} article.et_pb_post",
									'attr'                => $attrs['post']['decoration']['border'] ?? [],
									'declarationFunction' => [ Declarations::class, 'overflow_for_border_radius_style_declaration' ],
								],
							],
						],
					],
				]
			);
		} else {
			// Fullwidth Item.
			$border_style = $elements->style(
				[
					'attrName'   => 'fullwidth',
					'styleProps' => [
						'border'         => [
							'selector'         => "{$args['orderClass']}:not(.et_pb_blog_grid_wrapper) article.et_pb_post",
							'selectorFunction' => function ( $params ) use ( $args ) {
								$selector = $params['selector'];

								// Task 44550: Fix hover placement - move :hover to the end (on article, not module).
								if ( str_contains( $selector, ':hover' ) ) {
									// Remove :hover from wherever it is.
									$selector = str_replace( ':hover', '', $selector );
									// Add :hover at the end.
									$selector = $selector . ':hover';
								}

								return $selector;
							},
						],
						'advancedStyles' => [
							[
								'componentName' => 'divi/common',
								'props'         => [
									'selector'            => "{$args['orderClass']}:not(.et_pb_blog_grid_wrapper) article.et_pb_post",
									'attr'                => $attrs['fullwidth']['decoration']['border'] ?? [],
									'declarationFunction' => [ Declarations::class, 'overflow_for_border_radius_style_declaration' ],
								],
							],
						],
					],
				]
			);
		}

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
								'disabledOn' => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'boxShadow'  => [
									'selectorFunction' => function ( $params ) use ( $is_grid_layout ) {
										if ( $is_grid_layout ) {
											return $params['selector'] . ' article.et_pb_post';
										}

										return $params['selector'];
									},
								],
							],
						]
					),
					TextStyle::style(
						[
							'selector'               => $args['orderClass'],
							'attr'                   => $attrs['module']['advanced']['text'] ?? [],
							'orderClass'             => $order_class,
							'isInsideStickyModule'   => $is_inside_sticky_module,
							'stickyParentOrderClass' => $sticky_parent_order_class,
						]
					),

					// Blog Grid.
					$elements->style(
						[
							'attrName'   => 'blogGrid',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'attr' => $attrs['blogGrid']['decoration']['layout'] ?? [],
											'declarationFunction' => [ self::class, 'blog_grid_item_style_declaration' ],
											'selectorFunction' => function ( $params ) {
												return $params['selector'] . ' > .et_flex_column';
											},
										],
									],
								],
							],
						]
					),

					// Image.
					$elements->style(
						[
							'attrName' => 'image',
						]
					),

					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']} .et_pb_post .entry-featured-image-url, {$args['orderClass']} .et_pb_post .et_pb_slides, {$args['orderClass']} .et_pb_post .et_pb_video_overlay",
							'attr'                => $attrs['image']['decoration']['border'] ?? [],
							'declarationFunction' => [ Declarations::class, 'overflow_for_border_radius_style_declaration' ],
							'orderClass'          => $order_class,
						]
					),

					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),

					// Meta.
					$elements->style(
						[
							'attrName' => 'meta',
						]
					),

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Read more.
					$elements->style(
						[
							'attrName' => 'readMore',
						]
					),

					// Conditionally rendered border (set above based on layout display).
					$border_style,

					// Overlay.
					$elements->style(
						[
							'attrName' => 'overlay',
						]
					),

					// Overlay Icon.
					$elements->style(
						[
							'attrName' => 'overlayIcon',
						]
					),

					// Masonry.
					$elements->style(
						[
							'attrName' => 'masonry',
						]
					),

					// Pagination.
					$elements->style(
						[
							'attrName' => 'pagination',
						]
					),
					CommonStyle::style(
						[
							'selector'               => "{$order_class} .wp-pagenavi",
							'attr'                   => $pagination_font_attr,
							'declarationFunction'    => function ( $params ) {
								$attr_value = $params['attrValue'] ?? [];
								$text_align = is_array( $attr_value ) ? ( $attr_value['textAlign'] ?? '' ) : '';

								return '' !== $text_align ? "text-align: {$text_align} !important;" : '';
							},
							'orderClass'             => $order_class,
							'isInsideStickyModule'   => $is_inside_sticky_module,
							'stickyParentOrderClass' => $sticky_parent_order_class,
						]
					),

					// Placed the very end only for custom css.
					CssStyle::style(
						[
							'selector'               => $args['orderClass'],
							'attr'                   => $attrs['css'] ?? [],
							'cssFields'              => self::custom_css(),
							'selectorFunction'       => [ self::class, 'custom_css_selector_function' ],
							'orderClass'             => $order_class,
							'isInsideStickyModule'   => $is_inside_sticky_module,
							'stickyParentOrderClass' => $sticky_parent_order_class,
						]
					),
				],
			]
		);
	}

	/**
	 * Module classnames function for call to action module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/blog/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array  $attrs              Block attributes data that being rendered.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		// Determine if layout is fullwidth based on Layout Style setting.
		$blog_grid_layout_display = $attrs['blogGrid']['decoration']['layout']['desktop']['value']['display'] ?? 'grid';
		$fullwidth                = 'grid' === $blog_grid_layout_display ? 'off' : 'on';

		// Select border based on layout display:
		// - Grid layout: Use post.decoration.border (targets individual posts).
		// - Fullwidth/flex/block layout: Use fullwidth.decoration.border (targets posts in fullwidth mode).
		$is_grid_layout = 'grid' === $blog_grid_layout_display;
		$border_attr    = $is_grid_layout
			? ( $attrs['post']['decoration']['border'] ?? [] )
			: ( $attrs['fullwidth']['decoration']['border'] ?? [] );

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		$classnames_instance->add( 'et_pb_posts', true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'border' => $border_attr,
							'link'   => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Set script data of used module options.
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
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;
		$post_ids       = $args['post_ids'] ?? [];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		// Blog Grid Script Data.
		$elements->script_data(
			[
				'attrName' => 'blogGrid',
			]
		);

		// Post meta set content.
		$set_content = [];

		$date_format = $attrs['post']['advanced']['dateFormat']['desktop']['value'] ?? '';

		if ( ! empty( $post_ids ) ) {
			foreach ( $post_ids as $post_id ) {
				$set_content[] = [
					'selector'      => $selector . ' .et_pb_post_id_' . $post_id . ' .post-meta',
					'data'          => MultiViewUtils::merge_values(
						[
							'showAuthor'     => $attrs['meta']['advanced']['showAuthor'] ?? [],
							'showDate'       => $attrs['meta']['advanced']['showDate'] ?? [],
							'showCategories' => $attrs['meta']['advanced']['showCategories'] ?? [],
							'showComments'   => $attrs['meta']['advanced']['showComments'] ?? [],
						]
					),
					'sanitizer'     => 'et_core_esc_previously',
					'valueResolver' => function ( $value ) use ( $date_format, $post_id ) {
						$show_author     = 'on' === ( $value['showAuthor'] ?? '' );
						$show_date       = 'on' === ( $value['showDate'] ?? '' );
						$show_categories = 'on' === ( $value['showCategories'] ?? '' );
						$show_comments   = 'on' === ( $value['showComments'] ?? '' );

						return BlogModule::render_meta(
							[
								'show_author'     => $show_author,
								'show_date'       => $show_date,
								'show_categories' => $show_categories,
								'show_comments'   => $show_comments,
								'post_id'         => $post_id,
								'date_format'     => $date_format,
							]
						);
					},
				];

				// Post excerpt.
				$set_content[] = [
					'selector'      => $selector . ' .et_pb_post_id_' . $post_id . ' .post-content-inner',
					'data'          => MultiViewUtils::merge_values(
						[
							'excerptContent' => $attrs['post']['advanced']['excerptContent'] ?? [],
							'showExcerpt'    => $attrs['post']['advanced']['showExcerpt'] ?? [],
							'excerptManual'  => $attrs['post']['advanced']['excerptManual'] ?? [],
							'excerptLength'  => $attrs['post']['advanced']['excerptLength'] ?? [],
						]
					),
					'sanitizer'     => 'wp_kses_post',
					'valueResolver' => function ( $value ) use ( $date_format, $post_id ) {
						$excerpt_content = $value['excerptContent'] ?? '';
						$show_excerpt    = $value['showExcerpt'] ?? '';
						$excerpt_manual  = $value['excerptManual'] ?? '';
						$excerpt_length  = $value['excerptLength'] ?? '';

						return BlogModule::render_content(
							[
								'excerpt_content' => $excerpt_content,
								'show_excerpt'    => $show_excerpt,
								'excerpt_manual'  => $excerpt_manual,
								'excerpt_length'  => $excerpt_length,
								'post_id'         => $post_id,
								'append_styles'   => true, // Blog module needs styles for full post content.
							]
						);
					},
				];
			}
		}

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => $set_content,
				'setVisibility' => [
					[
						'selector'      => $selector . ' .entry-featured-image-url',
						'data'          => $attrs['image']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .more-link',
						'data'          => $attrs['readMore']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .pagination',
						'data'          => $attrs['pagination']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}

	/**
	 * Blog module render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * This function is the equivalent of JS function CtaEdit located in
	 * visual-builder/packages/module-library/src/components/cta/edit.tsx.
	 *
	 * @since ??
	 *
	 * @param array          $attrs    Block attributes that were saved by VB.
	 * @param string         $content  Block content.
	 * @param \WP_Block      $block    Parsed block object that being rendered.
	 * @param ModuleElements $elements ModuleElements instance.
	 *
	 * @return string HTML rendered of Blog module.
	 */
	public static function render_callback( $attrs, $content, $block, $elements ) {
		global $post, $paged, $wp_query, $wp_the_query, $wp_filter, $__et_blog_module_paged;

		if ( self::$_rendering ) {
			return '';
		}

		self::$_rendering = true;

		// Fallback $__et_blog_module_paged; sometime it could be null.
		$et_blog_module_page = $__et_blog_module_paged > 1 ? $__et_blog_module_paged : absint( get_query_var( 'page' ) );
		$et_blog_module_page = max( 1, $et_blog_module_page );

		// Keep a reference to the real main query to restore from later.
		$main_query = $wp_the_query;

		$use_current_loop = $attrs['post']['advanced']['useCurrentLoop']['desktop']['value'] ?? 'off';

		$post_type      = $attrs['post']['advanced']['type']['desktop']['value'] ?? '';
		$posts_per_page = $attrs['post']['advanced']['number']['desktop']['value'] ?? '';
		$categories     = $attrs['post']['advanced']['categories']['desktop']['value'] ?? [];

		// Determine if layout is fullwidth based on Layout Style setting.
		$blog_grid_layout_display = $attrs['blogGrid']['decoration']['layout']['desktop']['value']['display'] ?? 'grid';
		$fullwidth                = 'grid' === $blog_grid_layout_display ? 'off' : 'on';

		$offset = $attrs['post']['advanced']['offset']['desktop']['value'] ?? '';

		$query_args = [
			'posts_per_page' => $posts_per_page,
			'post_status'    => [ 'publish', 'private', 'inherit' ],
			'perm'           => 'readable',
			'post_type'      => $post_type,
		];

		if ( $et_blog_module_page > 1 ) {
			$et_paged            = $et_blog_module_page;
			$paged               = $et_blog_module_page; //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.
			$query_args['paged'] = $et_blog_module_page;
		}

		// Check if "All Categories" is selected (either explicitly as 'all' or when categories is empty).
		$is_all_category_selected = empty( $categories ) || in_array( 'all', $categories, true );

		// Apply category filtering using the consolidated utility method.
		$query_args = ModuleUtils::add_category_query_args( $query_args, $categories, $post_type, self::_get_current_post_id_for_exclusion() );

		// Exclude current post when using "Current Category" on post pages or Theme Builder context.
		if ( is_array( $categories ) && in_array( 'current', $categories, true ) ) {
			$current_post_id = self::_get_current_post_id_for_exclusion();
			if ( $current_post_id > 0 ) {
				if ( isset( $query_args['post__not_in'] ) ) {
					$query_args['post__not_in'] = array_unique( array_merge( $query_args['post__not_in'], [ $current_post_id ] ) );
				} else {
					$query_args['post__not_in'] = [ $current_post_id ];
				}
			}
		}

		// Handle "All Categories" case - show all posts without category filtering.
		if ( $is_all_category_selected ) {
			// WP_Query doesn't return sticky posts when it performed via Ajax.
			// This happens because `is_home` is false in this case, but on FE it's true if no category set for the query.
			// Set `is_home` = true to emulate the FE behavior with sticky posts in VB.
			add_action(
				'pre_get_posts',
				function ( $query ) {
					if ( true === $query->get( 'et_is_home' ) ) {
						$query->is_home = true;
					}
				}
			);

			$query_args['et_is_home'] = true;
		}

		if ( '' !== $offset && ! empty( $offset ) ) {
			/**
			 * Offset + pagination don't play well. Manual offset calculation required
			 *
			 * @see: https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination
			 */
			if ( $paged > 1 ) {
				$query_args['offset'] = ( ( $paged - 1 ) * intval( $posts_per_page ) ) + intval( $offset );
			} else {
				$query_args['offset'] = intval( $offset );
			}
		}

		// Stash properties that will not be the same after wp_reset_query().
		$wp_query_props = [
			'current_post' => $wp_query->current_post,
			'in_the_loop'  => $wp_query->in_the_loop,
		];

		if ( 'off' === $use_current_loop ) {
			// Build module-driven query from module attrs (post type/count/categories/offset/pagination).
			// This ensures parity with VB/REST behavior for non-singular contexts like 404 pages.
			// Exclude current post from results when on singular pages (D4 pattern with Theme Builder support).
			if ( is_singular() ) {
				$current_post_id = self::_get_current_post_id_for_exclusion();
				if ( $current_post_id > 0 ) {
					if ( isset( $query_args['post__not_in'] ) ) {
						$query_args['post__not_in'] = array_unique( array_merge( $query_args['post__not_in'], [ $current_post_id ] ) );
					} else {
						$query_args['post__not_in'] = [ $current_post_id ];
					}
				}
			}

			query_posts( $query_args ); //phpcs:ignore WordPress.WP.DiscouragedFunctions.query_posts_query_posts -- intentionally done.
		} elseif ( is_singular() ) {
			// When `useCurrentLoop=on` on singular pages, force an empty result set to avoid loops over the current post.
			query_posts( [ 'post__in' => [ 0 ] ] ); //phpcs:ignore WordPress.WP.DiscouragedFunctions.query_posts_query_posts -- intentionally done.
		} else {
			// When `useCurrentLoop=on` on non-singular pages, use current page loop semantics.
			// Only allow certain args when `Posts For Current Page` is set.
			$original = $wp_query->query_vars;
			$custom   = array_intersect_key( $query_args, array_flip( [ 'posts_per_page', 'offset', 'paged' ] ) );

			// Trick WP into reporting this query as the main query so third party filters.
			// that check for is_main_query() are applied.
			$wp_the_query = $wp_query = new WP_Query( array_merge( $original, $custom ) ); //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited,Squiz.PHP.DisallowMultipleAssignments.Found -- intentionally done.
		}

		/**
		 * Filters Blog module's main query.
		 *
		 * @since ??
		 *
		 * @param WP_Query $wp_query
		 * @param array    $attrs    Modified module attributes.
		 */
		$wp_query = apply_filters( 'et_builder_blog_query', $wp_query, $attrs ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- We intend to override $wp_query for blog module.

		/**
		 * Renders Blog final HTML output.
		 */
		$output     = '';
		$pagination = '';

		$post_ids    = [];
		$items_count = 0;

		if ( $wp_query->have_posts() ) {
			$sticky_posts = get_option( 'sticky_posts' );
			if ( ! empty( $sticky_posts ) ) {
				$sticky_args = [
					'post_type'      => $post_type,
					'post__in'       => $sticky_posts,
					'posts_per_page' => -1,
					'orderby'        => 'post__in',
				];

				// Add category filtering for sticky posts using the consolidated utility method.
				$sticky_args = ModuleUtils::add_category_query_args( $sticky_args, $categories, $post_type, self::_get_current_post_id_for_exclusion() );

				// Exclude current post from sticky posts when using "Current Category".
				if ( is_array( $categories ) && in_array( 'current', $categories, true ) ) {
					$current_post_id_for_exclusion = self::_get_current_post_id_for_exclusion();
					if ( $current_post_id_for_exclusion > 0 ) {
						$sticky_args['post__not_in'] = [ $current_post_id_for_exclusion ];
					}
				}

				$sticky_query = new WP_Query( $sticky_args );
				while ( $sticky_query->have_posts() ) {
					$sticky_query->the_post();
					$post_ids[] = get_the_ID();
					$output    .= self::process_post_data( $sticky_query->post, $attrs, $block->parsed_block['orderIndex'], $items_count, $elements );

					++$items_count;
				}
				wp_reset_postdata();
			}

			while ( $wp_query->have_posts() ) {
				$wp_query->the_post();
				if ( ! in_array( get_the_ID(), $sticky_posts, true ) ) {
					$post_ids[] = get_the_ID();
					$output    .= self::process_post_data( $wp_query->post, $attrs, $block->parsed_block['orderIndex'], $items_count, $elements );

					++$items_count;
				}
			}

			$pagination .= self::render_pagination( $attrs );

			wp_reset_postdata();
		}

		unset( $wp_query->et_pb_blog_query );

		$wp_the_query = $wp_query = $main_query; //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited,Squiz.PHP.DisallowMultipleAssignments.Found -- intentionally done.
		wp_reset_query(); //phpcs:ignore WordPress.WP.DiscouragedFunctions.wp_reset_query_wp_reset_query -- intentionally done.

		// Restore stashed properties.
		foreach ( $wp_query_props as $prop => $value ) {
			$wp_query->{$prop} = $value;
		}

		$no_posts_output = '';

		ob_start();

		get_template_part( 'includes/no-results', 'index' );

		if ( ob_get_length() > 0 ) {
			$no_posts_output = ob_get_clean();
		}

		// Configure content wrapper class based on layout display.
		$layout_display  = $attrs['blogGrid']['decoration']['layout']['desktop']['value']['display'] ?? 'grid';
		$is_block_layout = 'block' === $layout_display;
		$is_flex_layout  = 'flex' === $layout_display;
		$is_grid_layout  = 'grid' === $layout_display;

		if ( $is_flex_layout ) {
			$content_wrapper_attributes = [
				'class' => 'et_pb_posts et_flex_module',
			];
		} elseif ( $is_grid_layout ) {
			$content_wrapper_attributes = [
				'class' => 'et_pb_posts et_grid_module',
			];
		} else {
			$content_wrapper_attributes = [
				'class' => 'et_pb_posts et_block_module',
			];
		}

		$posts_output = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_ajax_pagination_container',
				],
				'children'          => [
					HTMLUtility::render(
						[
							'tag'               => 'div',
							'attributes'        => $content_wrapper_attributes,
							'children'          => [
								$output,
								$content,
							],
							'childrenSanitizer' => 'et_core_esc_previously',
						]
					),
					$pagination,
				],
				'childrenSanitizer' => 'et_core_esc_previously',
			]
		);

		if ( empty( $post_ids ) ) {
			$posts_output = $no_posts_output;
		}

		// Extract child modules IDs using helper utility.
		$children_ids = ChildrenUtils::extract_children_ids( $block );

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$module_html = Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'               => $attrs,
				'id'                  => $block->parsed_block['id'],
				'elements'            => $elements,
				'name'                => $block->block_type->name,
				'classnamesFunction'  => [ self::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ self::class, 'module_styles' ],
				'scriptDataComponent' => function ( $args ) use ( $post_ids ) {
					self::module_script_data(
						array_merge(
							$args,
							[
								'post_ids' => $post_ids,
							]
						)
					);
				},
				'parentAttrs'         => $parent->attrs ?? [],
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'childrenIds'         => $children_ids,
				'children'            => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $posts_output,
			]
		);

		self::$_rendering = false;
		return $module_html;
	}

	/**
	 * Processes the data for a single post and returns the HTML for that post.
	 *
	 * This function is responsible for generating the HTML for a single post. It retrieves the post's ID, checks if the post has a thumbnail, and if the thumbnail should be shown. It then generates the HTML for the thumbnail, the post title, the post meta, and the post content. It also checks if a "Read More" link should be added to the post content. Finally, it generates the HTML for the entire post and returns it.
	 *
	 * @param \WP_Post $post The post-object.
	 * @param array    $attrs The attributes for the post.
	 * @param int      $order_index The order index of the post.
	 * @param int      $item_index The items index of the post.
	 * @param object   $elements The ModuleElements instance.
	 * @return string The HTML for the post.
	 */
	public static function process_post_data( \WP_Post $post, array $attrs, int $order_index, int $item_index, $elements ): string {

		// Determine if layout is fullwidth based on Layout Style setting.
		// Fullwidth if Layout Style is not set to 'grid'.
		$blog_grid_layout_display = $attrs['blogGrid']['decoration']['layout']['desktop']['value']['display'] ?? 'grid';
		$is_fullwidth             = 'grid' !== $blog_grid_layout_display;
		$fullwidth                = $is_fullwidth ? 'on' : 'off';

		$date_format     = $attrs['post']['advanced']['dateFormat']['desktop']['value'] ?? '';
		$excerpt_content = $attrs['post']['advanced']['excerptContent']['desktop']['value'] ?? 'off';
		$excerpt_length  = $attrs['post']['advanced']['excerptLength']['desktop']['value'] ?? '270';
		$excerpt_manual  = $attrs['post']['advanced']['excerptManual']['desktop']['value'] ?? 'on';
		$icon_value      = Utils::process_font_icon( $attrs['overlayIcon']['decoration']['icon']['desktop']['value'] ?? [] );
		$show_excerpt    = $attrs['post']['advanced']['showExcerpt']['desktop']['value'] ?? 'on';
		$show_overlay    = 'on' === ( $attrs['overlay']['advanced']['enable']['desktop']['value'] ?? 'off' );

		$post_format = et_pb_post_format();

		$show_title_meta_content = 'off' === $fullwidth || ! in_array( $post_format, [ 'link', 'audio', 'quote' ], true ) || post_password_required( $post );

		$show_thumbnail  = ModuleUtils::has_value(
			$attrs['image']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_read_more  = ModuleUtils::has_value(
			$attrs['readMore']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_author     = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showAuthor'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_date       = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showDate'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_categories = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showCategories'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_comments   = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showComments'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$heading_level   = $attrs['title']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? 'h2';

		$post_thumb = '';
		$thumb      = '';

		if ( ! in_array( $post_format, [ 'link', 'audio', 'quote' ], true ) || post_password_required( $post ) ) {

			// Determine layout based on Layout Style setting.
			// Grid mode uses smaller thumbnails, other modes (flex/block) use larger thumbnails.
			$blog_grid_layout_display = $attrs['blogGrid']['decoration']['layout']['desktop']['value']['display'] ?? 'grid';
			$is_grid_mode             = 'grid' === $blog_grid_layout_display;

			// Select image size directly based on layout mode.
			// Grid mode: 400×250, Flex/Block mode: 1080×675.
			$selected_image_size = $is_grid_mode ? 'et-pb-portfolio-image' : 'et-pb-post-main-image-fullwidth';

			// Get image dimensions from WordPress image size.
			$image_size_data = wp_get_attachment_image_src( get_post_thumbnail_id(), $selected_image_size );
			$width           = is_array( $image_size_data ) ? (int) $image_size_data[1] : ( $is_grid_mode ? 400 : 1080 );
			$height          = is_array( $image_size_data ) ? (int) $image_size_data[2] : ( $is_grid_mode ? 250 : 675 );

			// Apply legacy filters for backward compatibility.
			$width  = (int) apply_filters( 'et_pb_blog_image_width', $width );
			$height = (int) apply_filters( 'et_pb_blog_image_height', $height );
			$class  = $is_grid_mode ? '' : 'et_pb_post_main_image';
			$alt    = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );

			$thumbnail_data = get_thumbnail( $width, $height, $class, $alt, get_the_title(), false, 'Blogimage' );
			$thumb          = $thumbnail_data['thumb'];

			// Get actual image dimensions from WordPress attachment data.
			$actual_thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id(), [ $width, $height ] );
			$actual_width     = is_array( $actual_thumbnail ) ? (int) $actual_thumbnail[1] : $width;
			$actual_height    = is_array( $actual_thumbnail ) ? (int) $actual_thumbnail[2] : $height;

			$first_video = PostUtility::get_first_video();

			if ( 'video' === $post_format && false !== $first_video ) {

				$video_overlay = ! empty( $thumb ) ? HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'et_pb_video_overlay',
							'style' => 'background-image: url(' . $thumb . '); background-size: cover;',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'               => 'div',
								'attributes'        => [
									'class' => 'et_pb_video_overlay_hover',
								],
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => HTMLUtility::render(
									[
										'tag'        => 'a',
										'attributes' => [
											'class' => 'et_pb_video_play',
											'href'  => '#',
										],
									]
								),
							]
						),
					]
				) : '';

				$post_thumb = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'et_main_video_container',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							$video_overlay,
							$first_video,
						],
					]
				);
			} elseif ( 'gallery' === $post_format ) {
				ob_start();
				et_pb_gallery_images( 'slider' );
				$post_thumb = ob_get_clean();
			} elseif ( '' !== $thumb && $show_thumbnail ) {

				// Build responsive image attributes using actual image dimensions.
				$image_attributes = [
					'src'    => $thumb,
					'width'  => $actual_width,
					'height' => $actual_height,
					'alt'    => ! empty( $alt ) ? $alt : esc_attr( get_the_title() ),
					'class'  => $class,
				];

				// Add responsive image attributes (srcset and sizes) if enabled.
				if ( $width < 480 && et_is_responsive_images_enabled() ) {
					// Get thumbnail with size for responsive images.
					global $et_theme_image_sizes;
					$image_size_name                = $width . 'x' . $height;
					$et_size                        = isset( $et_theme_image_sizes ) && array_key_exists( $image_size_name, $et_theme_image_sizes ) ? $et_theme_image_sizes[ $image_size_name ] : [ $width, $height ];
					$et_attachment_image_attributes = wp_get_attachment_image_src( get_post_thumbnail_id(), $et_size );
					$thumbnail_with_size            = ! empty( $et_attachment_image_attributes[0] ) ? $et_attachment_image_attributes[0] : '';

					if ( $thumbnail_with_size ) {
						$image_attributes['srcset'] = $thumb . ' 479w, ' . $thumbnail_with_size . ' 480w';
						$image_attributes['sizes']  = '(max-width:479px) 479px, 100vw';
					}
				}

				$image_html = $elements->render(
					[
						'attrName'   => 'image',
						'tagName'    => 'img',
						'attributes' => $image_attributes,
					]
				);

				$post_thumbnail = HTMLUtility::render(
					[
						'tag'               => 'a',
						'attributes'        => [
							'href'  => get_permalink(),
							'class' => 'entry-featured-image-url',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							$image_html,
							HTMLUtility::render(
								[
									'tag'        => 'span',
									'attributes' => [
										'data-icon' => $icon_value,
										'class'     => 'et_overlay et_pb_inline_icon',
									],
								]
							),
						],
					]
				);

				$post_thumb = 'off' === $fullwidth ? HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'et_pb_image_container',
						],
						'children'          => $post_thumbnail,
						'childrenSanitizer' => 'et_core_esc_previously',
					]
				) : $post_thumbnail;
			}
		}

		$title = $show_title_meta_content && (
			! in_array( $post_format, [ 'link', 'audio' ], true ) ||
			post_password_required( $post )
		) ? $elements->render(
			[
				'attrName'          => 'title',
				'tagName'           => $heading_level,
				'attributes'        => [
					'class' => 'entry-title',
				],
				'skipAttrChildren'  => true,
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'        => 'a',
						'attributes' => [
							'href' => get_the_permalink(),
						],
						'children'   => get_the_title(),
					]
				),
			]
		) : '';

		$meta = $show_title_meta_content ? $elements->render(
			[
				'attrName'          => 'meta',
				'tagName'           => 'p',
				'attributes'        => [
					'class' => 'post-meta',
				],
				'skipAttrChildren'  => true,
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => self::render_meta(
					[
						'show_author'     => $show_author,
						'show_date'       => $show_date,
						'show_categories' => $show_categories,
						'show_comments'   => $show_comments,
						'post_id'         => $post->ID,
						'date_format'     => $date_format,
					]
				),
			]
		) : '';

		$post_content_render = $show_title_meta_content ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [

					'class' => 'post-content-inner',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => self::render_content(
					[
						'excerpt_content' => $excerpt_content,
						'show_excerpt'    => $show_excerpt,
						'excerpt_manual'  => $excerpt_manual,
						'excerpt_length'  => $excerpt_length,
						'post_id'         => $post->ID,
						'append_styles'   => true, // Blog module needs styles for full post content.
					]
				),
			]
		) : '';

		$read_more = $show_read_more ? $elements->render(
			[
				'attrName'          => 'readMore',
				'tagName'           => 'a',
				'attributes'        => [
					'href'  => get_permalink(),
					'class' => 'more-link',
				],
				'skipAttrChildren'  => true,
				'childrenSanitizer' => 'esc_html',
				'children'          => esc_html__( 'read more...', 'et_builder_5' ),
			]
		) : '';

		$content = $elements->render(
			[
				'attrName'          => 'content',
				'tagName'           => 'div',
				'attributes'        => [ 'class' => 'post-content' ],
				'skipAttrChildren'  => true,
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $post_content_render . $read_more,
			]
		);

		$post_id_class = 'et_pb_post_id_' . $post->ID;

		// add item order index class.
		$item_class = sprintf( ' et_pb_blog_item_%1$s_%2$s', (int) $order_index, (int) $item_index );

		// Post format content.
		ob_start();
		et_divi_post_format_content();
		$post_format_content = ob_get_clean();

		return HTMLUtility::render(
			[
				'tag'               => 'article',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_post'        => true,
							$post_id_class      => true,
							'clearfix'          => true,
							'et_pb_no_thumb'    => $show_thumbnail && '' === $thumb,
							'et_pb_has_overlay' => $show_overlay,
							$item_class         => true,
						],
						get_post_class()
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$post_format_content,
					$post_thumb,
					$title,
					$meta,
					$content,
				],
			]
		);
	}

	/**
	 * Render pagination.
	 *
	 * @since ??
	 *
	 * @param array $attrs The module attributes.
	 *
	 * @return string
	 */
	public static function render_pagination( array $attrs ): string {
		// Check if pagination is enabled across all breakpoints and states.
		$show_pagination = ModuleUtils::has_value(
			$attrs['pagination']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);

		if ( ! $show_pagination ) {
			return '';
		}

		ob_start();

		add_filter( 'get_pagenum_link', [ self::class, 'filter_pagination_url' ] );

		if ( function_exists( 'wp_pagenavi' ) ) {
			wp_pagenavi();
		} elseif ( et_is_builder_plugin_active() ) {
				include ET_BUILDER_PLUGIN_DIR . 'includes/navigation.php';
		} else {
			get_template_part( 'includes/navigation', 'index' );
		}

		remove_filter( 'get_pagenum_link', [ self::class, 'filter_pagination_url' ] );

		$output = ob_get_contents();
		ob_end_clean();

		$is_hidden_onload = 'on' !== ( $attrs['pagination']['advanced']['enable']['desktop']['value'] ?? 'on' );

		if ( $is_hidden_onload ) {
			$class_attributes = strpos( $output, 'class="' );

			if ( false !== $class_attributes ) {
				$output = substr_replace( $output, 'class="et_multi_view_hidden ', $class_attributes, strlen( 'class="' ) );
			}
		}

		return $output;
	}

	/**
	 * Filter the pagination url to add a flag so it can be filtered to avoid pagination clashes with the main query.
	 *
	 * @since ??
	 *
	 * @param string $result The URL.
	 *
	 * @return string
	 */
	public static function filter_pagination_url( $result ) {
		return add_query_arg( 'et_blog', '', $result );
	}

	/**
	 * Render Meta.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *    Optional. An array of arguments for render the post meta.
	 *    @type bool   $show_author     Show author.
	 *    @type bool   $show_date       Show date.
	 *    @type bool   $show_categories Show categories.
	 *    @type bool   $show_comments   Show comments.
	 *    @type int    $post_id         Post ID.
	 *    @type string $date_format     Date format.
	 * }
	 *
	 * @return string
	 */
	public static function render_meta( $args ) {
		$show_author     = $args['show_author'] ?? '';
		$show_date       = $args['show_date'] ?? '';
		$show_categories = $args['show_categories'] ?? '';
		$show_comments   = $args['show_comments'] ?? '';
		$post_id         = $args['post_id'] ?? 0;
		$date_format     = $args['date_format'] ?? '';

		$post_meta = [];

		$author = sprintf(
			__( 'by %s', 'et_builder_5' ),
			HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'author vcard',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => HTMLUtility::render(
						[
							'tag'        => 'a',
							'attributes' => [
								'href'  => get_author_posts_url( get_the_author_meta( 'ID' ) ),
								'title' => sprintf( __( 'Posts by %s', 'et_builder_5' ), get_the_author() ),
								'rel'   => 'author',
							],
							'children'   => get_the_author(),
						]
					),
				]
			)
		);

		if ( $show_author ) {
			$post_meta[] = $author;
		}

		$date = HTMLUtility::render(
			[
				'tag'        => 'span',
				'attributes' => [
					'class' => 'published',
				],
				'children'   => get_the_date( $date_format, $post_id ),
			]
		);

		if ( $show_date ) {
			$post_meta[] = $date;
		}

			$post_type  = get_post_type( $post_id );
			$taxonomy   = ModuleUtils::get_taxonomy_for_post_type( $post_type );
			$terms      = get_the_terms( $post_id, $taxonomy );
			$categories = [];

		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $term ) {
				if ( is_object( $term ) && property_exists( $term, 'name' ) ) {
					$categories[] = HTMLUtility::render(
						[
							'tag'        => 'a',
							'attributes' => [
								'href' => get_term_link( $term, $taxonomy ),
								'rel'  => 'tag',
							],
							'children'   => $term->name,
						]
					);
				}
			}
		}

		if ( $show_categories ) {
			$post_meta[] = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'entry-categories',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => implode( ', ', $categories ),
				]
			);
		}

		$comments = sprintf( esc_html( _nx( '%s Comment', '%s Comments', get_comments_number(), 'number of comments', 'et_builder_5' ) ), number_format_i18n( get_comments_number( $post_id ) ) );

		if ( $show_comments ) {
			$post_meta[] = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'entry-comments',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $comments,
				]
			);
		}

		return implode( ' | ', $post_meta );
	}

	/**
	 * Render Post Content.
	 *
	 * @since ??
	 *
	 * @param array       $args {
	 *          Optional. An array of arguments for render the post content.
	 *
	 *    @type string $excerpt_content Show content or excerpt. Could be 'on' or 'off'. Default is 'off'.
	 *    @type string $show_excerpt    Show or hide the excerpt. Could be 'on' or 'off'. Default is 'on'.
	 *    @type string $excerpt_manual  Show or hide the manual excerpt. Could be 'on' or 'off'. Default is 'on'.
	 *    @type string $excerpt_length  The length of the excerpt. Default is '270'.
	 *    @type string $post_id         The post ID. Default is '0'.
	 *    @type bool   $append_styles   Whether to append styles to content. Default is 'false'.
	 *                                   Only Blog module should set this to 'true' when rendering full post content.
	 * }
	 * @param string|null $styles Optional. Reference parameter to return styles when $append_styles is false.
	 *
	 * @return string
	 */
	public static function render_content( array $args, &$styles = null ) {
		$excerpt_content = $args['excerpt_content'] ?? 'off';
		$show_excerpt    = $args['show_excerpt'] ?? 'on';
		$excerpt_manual  = $args['excerpt_manual'] ?? 'on';
		$excerpt_length  = (int) $args['excerpt_length'] ?? 270;
		$post_id         = (int) $args['post_id'] ?? 0;
		$append_styles   = $args['append_styles'] ?? false;

		$post_content = et_strip_shortcodes( PostUtility::delete_post_first_video( get_the_content( null, false, $post_id ) ), true );
		$content      = '';

		if ( 'on' === $excerpt_content ) {
			// Detect module types for default preset style generation.
			// This ensures default preset styles are generated even if all module instances use explicit presets.
			$detected_module_names = DetectFeature::get_block_names( get_the_content( null, false, $post_id ) );
			$filtered_module_names = array_filter(
				$detected_module_names,
				function ( $module_name ) {
					return ! in_array( $module_name, [ 'divi/section', 'divi/row', 'divi/column' ], true );
				}
			);

			// Set detected module types for inner content rendering.
			Style::set_detected_module_types_for_inner_content( $filtered_module_names );

			global $more;

			if ( et_pb_is_pagebuilder_used( $post_id ) ) {
				$more = 1; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.

				$content = et_core_intentionally_unescaped( BlockParserStore::render_inner_content( $post_content ), 'html' );
			} else {
				$more    = null; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.
				$content = et_core_intentionally_unescaped( BlockParserStore::render_inner_content( PostUtility::delete_post_first_video( get_the_content( esc_html__( 'read more...', 'et_builder_5' ), false, $post_id ) ) ), 'html' );
			}

			// Capture styles generated during content rendering for this post.
			// Match VB approach: capture styles under 'post' key and output inline.
			$content_styles = Style::render( 'default', 'preset', 'post' )
				. Style::render( 'default', 'module', 'post' );

			// Include global color CSS variables inline.
			// Global colors are output in footer (when Dynamic Assets disabled) or head (when enabled),
			// but blog post content renders before footer, so we need to include them inline.
			$global_color_css = Style::get_global_colors_style();
			if ( ! empty( $global_color_css ) ) {
				// Prepend global color CSS variables before the styles that use them.
				$content_styles = $global_color_css . $content_styles;
			}

			// Clear detected module types after rendering to prevent affecting other posts.
			Style::set_detected_module_types_for_inner_content( [] );

			// Return styles via reference if not appending to content.
			if ( ! $append_styles ) {
				$styles = $content_styles;
			} elseif ( ! empty( $content_styles ) ) {
				// Append inline styles to content if styles were generated.
				$content .= sprintf(
					'<style id="et-blog-post-content-%d">%s</style>',
					$post_id,
					$content_styles
				);
			}
		} elseif ( 'on' === $show_excerpt ) {
			if ( has_excerpt( $post_id ) && 'off' !== $excerpt_manual ) {
				$manual_excerpt = get_the_excerpt( $post_id );

				// Apply excerpt length truncation to manual excerpts if excerpt_length is set and greater than 0.
				// Use character-based truncation instead of word-based truncation.
				if ( $excerpt_length > 0 && strlen( $manual_excerpt ) > $excerpt_length ) {
					$excerpt_more    = apply_filters( 'excerpt_more', '&hellip;' );
					$manual_excerpt  = substr( $manual_excerpt, 0, $excerpt_length );
					$manual_excerpt .= $excerpt_more;
				}

				$content = apply_filters( 'the_excerpt', $manual_excerpt );
			} elseif ( '' !== $post_content ) {
					$content = et_core_intentionally_unescaped( wpautop( PostUtility::delete_post_first_video( strip_shortcodes( PostUtility::truncate_post( $excerpt_length, false, get_post( $post_id ), true ) ) ) ), 'html' );
			}
		}

		return $content;
	}

	/**
	 * Check if the Blog module is currently rendering content.
	 *
	 * This method is used by other modules to determine if they should use
	 * descendant selectors instead of direct child selectors for proper CSS generation.
	 *
	 * @since ??
	 * @return bool True if Blog module is rendering content, false otherwise.
	 */
	public static function is_rendering_content(): bool {
		return BlockParserStore::is_rendering_inner_content();
	}

	/**
	 * Loads `BlogModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @return void
	 */
	public function load() {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/blog/';

		add_filter( 'divi_conversion_presets_attrs_map', [ BlogPresetAttrsMap::class, 'get_map' ], 10, 2 );

		// Ensure that all filters and actions applied during module registration are registered before calling `ModuleRegistration::register_module()`.
		// However, for consistency, register all module-specific filters and actions prior to invoking `ModuleRegistration::register_module()`.
		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);
	}

	/**
	 * Resolve the group preset attribute name for the Blog module.
	 *
	 * @param GlobalPresetItemGroupAttrNameResolved $attr_name_to_resolve The attribute name to be resolved.
	 * @param array                                 $params               The filter parameters.
	 *
	 * @return GlobalPresetItemGroupAttrNameResolved The resolved attribute name.
	 */
	public static function option_group_preset_resolver_attr_name( $attr_name_to_resolve, array $params ): ?GlobalPresetItemGroupAttrNameResolved {
		// Bydefault, $attr_name_to_resolve is a null value.
		// If it is not null, it means that the attribute name is already resolved.
		// In this case, we return the resolved attribute name.
		if ( null !== $attr_name_to_resolve ) {
			return $attr_name_to_resolve;
		}

		if ( $params['moduleName'] !== $params['dataModuleName'] ) {
			if ( 'divi/blog' === $params['moduleName'] ) {
				if ( strpos( $params['attrName'], '.decoration.border' ) ) {
					$attr_names_to_pairs = GlobalPresetItemGroupAttrNameResolver::get_attr_names_by_group( $params['dataModuleName'], $params['dataGroupId'] );
					$attr_name_match     = ArrayUtility::find(
						$attr_names_to_pairs,
						function ( $attr_name ) use ( $params ) {
							return GlobalPresetItemGroupAttrNameResolver::is_attr_name_suffix_matched( $attr_name, $params['attrName'] );
						}
					);

					return new GlobalPresetItemGroupAttrNameResolved(
						[
							'attrName'    => $attr_name_match,
							'attrSubName' => $params['attrSubName'] ?? null,
						]
					);
				}
			}
		}

		return $attr_name_to_resolve;
	}

	/**
	 * Get the current post ID for exclusion, handling Theme Builder context.
	 *
	 * In Theme Builder context, the global $post is the template post, not the displayed post.
	 * This method gets the actual post being displayed for proper post exclusion.
	 *
	 * @since ??
	 *
	 * @return int Current post ID, or 0 if not found.
	 */
	private static function _get_current_post_id_for_exclusion(): int {
		// Check if we're in Theme Builder context.
		$is_theme_builder = class_exists( '\ET_Theme_Builder_Layout' ) && \ET_Theme_Builder_Layout::is_theme_builder_layout();

		if ( $is_theme_builder ) {
			// In Theme Builder, get the main post ID (the actual post being displayed).
			$main_post_id = class_exists( '\ET_Post_Stack' ) ? \ET_Post_Stack::get_main_post_id() : 0;
			if ( $main_post_id > 0 ) {
				return $main_post_id;
			}
		}

		// Standard context - use global $post on singular pages.
		if ( is_singular() ) {
			global $post;
			if ( $post && $post->ID > 0 ) {
				return $post->ID;
			}
		}

		// Fallback to get_the_ID() but only return it if we're on a singular page.
		// On archive/category pages, get_the_ID() returns random loop post IDs which would cause unintended exclusions.
		$post_id = get_the_ID();
		return $post_id > 0 && is_singular() ? $post_id : 0;
	}
}
