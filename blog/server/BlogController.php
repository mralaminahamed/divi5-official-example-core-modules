<?php
/**
 * Blog: BlogController.
 *
 * @package Builder\Framework\Route
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\Controllers\RESTController;
use ET\Builder\Framework\UserRole\UserRole;
use ET\Builder\Framework\Utility\PostUtility;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\FrontEnd\Assets\DetectFeature;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\ModuleUtils\ImageUtils;
use WP_REST_Request;
use WP_REST_Response;

// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited -- disabled intentionally.

/**
 * Blog REST Controller class.
 *
 * @since ??
 */
class BlogController extends RESTController {
	/**
	 * Return posts/pages for Blog module.
	 *
	 * @since ??
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public static function index( WP_REST_Request $request ): WP_REST_Response {
		$posts = [];

		// Determine if layout is fullwidth based on Layout Style setting.
		// Fullwidth if Layout Style is not set to 'grid'.
		$layout_display = $request->get_param( 'layoutDisplay' ) ?? 'grid';
		$is_fullwidth   = 'grid' !== $layout_display;
		$fullwidth      = $is_fullwidth ? 'on' : 'off';

		$args = [
			'post_type'        => $request->get_param( 'postType' ),
			'posts_per_page'   => $request->get_param( 'postsPerPage' ),
			'paged'            => $request->get_param( 'paged' ),
			'categories'       => $request->get_param( 'categories' ),
			'fullwidth'        => $fullwidth,
			'date_format'      => $request->get_param( 'dateFormat' ),
			'excerpt_content'  => $request->get_param( 'excerptContent' ),
			'excerpt_length'   => $request->get_param( 'excerptLength' ),
			'show_excerpt'     => $request->get_param( 'showExcerpt' ),
			'manual_excerpt'   => $request->get_param( 'manualExcerpt' ),
			'offset'           => $request->get_param( 'offset' ),
			'orderby'          => $request->get_param( 'orderby' ),
			'is_theme_builder' => $request->get_param( 'isThemeBuilder' ) ?? false,
		];

		$query_args = [
			'posts_per_page' => $args['posts_per_page'],
			'post_status'    => [ 'publish', 'private' ],
			'perm'           => 'readable',
			'post_type'      => $args['post_type'],
			'paged'          => $args['paged'],
		];

		if ( 'date_desc' !== $args['orderby'] ) {
			switch ( $args['orderby'] ) {
				case 'date_asc':
					$query_args['orderby'] = 'date';
					$query_args['order']   = 'ASC';
					break;
				case 'title_asc':
					$query_args['orderby'] = 'title';
					$query_args['order']   = 'ASC';
					break;
				case 'title_desc':
					$query_args['orderby'] = 'title';
					$query_args['order']   = 'DESC';
					break;
				case 'rand':
					$query_args['orderby'] = 'rand';
					break;
			}
		}

		// Get current post ID from request parameter for Visual Builder context.
		$current_post_id = absint( $request->get_param( 'currentPageId' ) ?? 0 );
		// Store original VB context ID before it gets overwritten later (line 160).
		$vb_current_post_id = $current_post_id;

		// Apply category filtering using the consolidated utility method.
		$query_args = ModuleUtils::add_category_query_args( $query_args, $args['categories'], $args['post_type'], $vb_current_post_id );

		// Check if "current" category is selected before applying category filtering.
		$normalized_categories = is_string( $args['categories'] ) ? explode( ',', $args['categories'] ) : $args['categories'];
		if ( ! is_array( $normalized_categories ) ) {
			$normalized_categories = [];
		}
		$has_current_category = in_array( 'current', $normalized_categories, true );

		// Exclude current post when using "Current Category" on post pages.
		if ( $has_current_category && $vb_current_post_id > 0 ) {
			if ( isset( $query_args['post__not_in'] ) ) {
				$query_args['post__not_in'] = array_unique( array_merge( $query_args['post__not_in'], [ $vb_current_post_id ] ) );
			} else {
				$query_args['post__not_in'] = [ $vb_current_post_id ];
			}
		}

		// Check if "All Categories" is selected for sticky posts logic.
		$categories_normalized = $args['categories'];
		if ( is_string( $categories_normalized ) ) {
			$categories_normalized = trim( $categories_normalized );
			if ( empty( $categories_normalized ) || 'undefined' === $categories_normalized || 'null' === $categories_normalized ) {
				$categories_normalized = [];
			} else {
				// Convert comma-separated string to array.
				$categories_normalized = array_map( 'trim', explode( ',', $categories_normalized ) );
			}
		}

		$is_all_category_selected = empty( $categories_normalized ) || in_array( 'all', $categories_normalized, true );

		// WP_Query doesn't return sticky posts when it performed via Ajax and no filtering is applied.
		// This happens because `is_home` is false in this case, but on FE it's true if no category set for the query.
		// Set `is_home` = true to emulate the FE behavior with sticky posts in VB when showing all posts.
		if ( $is_all_category_selected && 'post' === $args['post_type'] ) {
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

		if ( '' !== $args['offset'] && ! empty( $args['offset'] ) ) {
			/**
			 * Offset + pagination don't play well. Manual offset calculation required.
			 *
			 * @see: https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination.
			 */
			if ( $args['paged'] > 1 ) {
				$query_args['offset'] = ( ( $args['paged'] - 1 ) * $args['posts_per_page'] ) + $args['offset'];
			} else {
				$query_args['offset'] = $args['offset'];
			}
		}

		// Exclude current post from results if we're on a single post (similar to D4 pattern).
		// In REST/AJAX context, try multiple ways to get current post ID.
		$current_post_id = self::_get_current_post_id( $request );
		if ( $current_post_id > 0 ) {
			if ( isset( $query_args['post__not_in'] ) ) {
				$query_args['post__not_in'] = array_unique( array_merge( $query_args['post__not_in'], [ $current_post_id ] ) );
			} else {
				$query_args['post__not_in'] = [ $current_post_id ];
			}
		}

		// Get query.
		$query = new \WP_Query( $query_args );

		$sticky_posts = get_option( 'sticky_posts' );

		if ( $query->have_posts() ) {
			// Display sticky posts first.
			if ( ! empty( $sticky_posts ) ) {
				$sticky_args = [
					'post_type'      => $args['post_type'],
					'post__in'       => $sticky_posts,
					'posts_per_page' => -1,
				];

				// Add category filtering for sticky posts if categories are specified.
				$sticky_args = ModuleUtils::add_category_query_args( $sticky_args, $args['categories'], $args['post_type'], $vb_current_post_id );

				// Exclude current post from sticky posts when using "Current Category".
				if ( $has_current_category && $vb_current_post_id > 0 ) {
					$sticky_args['post__not_in'] = [ $vb_current_post_id ];
				}

				$sticky_query = new \WP_Query( $sticky_args );
				while ( $sticky_query->have_posts() ) {
					$sticky_query->the_post();
					$posts[] = self::process_post_data( $sticky_query->post, $args );
				}
				wp_reset_postdata();
			}

			// Display non-sticky posts.
			while ( $query->have_posts() ) {
				$query->the_post();
				if ( ! in_array( get_the_ID(), $sticky_posts, true ) ) {
					$posts[] = self::process_post_data( $query->post, $args );
				}
			}
		}

		$metadata = [
			'maxNumPages' => $query->max_num_pages,
		];

		// Adds WP-PageNavi plugin support.
		$metadata['wpPagenavi'] = function_exists( 'wp_pagenavi' ) ? \wp_pagenavi(
			[
				'query' => $query,
				'echo'  => false,
			]
		) : null;

		wp_reset_postdata();

		$response = [
			'posts'    => $posts,
			'metadata' => $metadata,
		];

		return self::response_success( $response );
	}
	/**
	 * Index action arguments.
	 *
	 * Endpoint arguments as used in `register_rest_route()`.
	 *
	 * @return array
	 */
	public static function index_args(): array {
		return [
			'postType'        => [
				'type'              => 'string',
				'default'           => 'post',
				'validate_callback' => function ( $param ) {
					return is_string( $param );
				},
			],
			'postsPerPage'    => [
				'type'              => 'string',
				'default'           => '10',
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function ( $value ) {
					return (int) $value;
				},
			],
			'paged'           => [
				'type'              => 'string',
				'default'           => '1',
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function ( $value ) {
					return (int) $value;
				},
			],
			'categories'      => [
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => function ( $value ) {
					return explode( ',', $value );
				},
			],
			'currentPageId'   => [
				'type'              => 'string',
				'default'           => '0',
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function ( $value ) {
					return (int) $value;
				},
			],
			'layoutDisplay'   => [
				'type'              => 'string',
				'default'           => 'flex',
				'validate_callback' => function ( $param ) {
					return in_array( $param, [ 'flex', 'grid', 'block' ], true );
				},
			],
			'dateFormat'      => [
				'type'              => 'string',
				'default'           => 'M j, Y',
				'validate_callback' => function ( $param ) {
					return is_string( $param );
				},
			],
			'excerptContent'  => [
				'type'              => 'string',
				'default'           => 'off',
				'validate_callback' => function ( $param ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'excerptLength'   => [
				'type'              => 'string',
				'default'           => '270',
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function ( $value ) {
					return (int) $value;
				},
			],
			'showExcerpt'     => [
				'type'              => 'string',
				'default'           => 'on',
				'validate_callback' => function ( $param ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'manualExcerpt'   => [
				'type'              => 'string',
				'default'           => 'on',
				'validate_callback' => function ( $param ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'offset'          => [
				'type'              => 'string',
				'default'           => '0',
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function ( $value ) {
					return (int) $value;
				},
			],
			'orderby'         => [
				'type'              => 'string',
				'default'           => 'date_desc',
				'validate_callback' => function ( $param ) {
					return is_string( $param );
				},
			],
			'current_post_id' => [
				'type'              => 'integer',
				'default'           => 0,
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function ( $value ) {
					return (int) $value;
				},
			],
		];
	}
	/**
	 * Index action permission.
	 *
	 * Endpoint permission callback as used in `register_rest_route()`.
	 *
	 * @return bool
	 */
	public static function index_permission(): bool {
		return UserRole::can_current_user_use_visual_builder();
	}

	/**
	 * Process post data.
	 *
	 * @param \WP_Post $post Post object.
	 * @param array    $args Arguments.
	 *
	 * @return array
	 */
	public static function process_post_data( $post, $args ) {
		global $et_theme_image_sizes;
		$title = get_the_title( $post );

		$thumbnail = [];
		$thumb     = '';
		$layout    = 'on' === $args['fullwidth'] ? 'fullwidth' : 'grid';

		// Check if post has featured image OR is an attachment post type (attachment is the image itself).
		$has_featured_image = has_post_thumbnail( $post ) || 'attachment' === get_post_type( $post );

		// Use ImageUtils if flexType data is provided by Visual Builder.
		if ( isset( $args['flexType'] ) && ! empty( $args['flexType'] ) ) {
			// Decode JSON flexType data from Visual Builder.
			$flex_type_data = json_decode( $args['flexType'], true );

			// Create attrs structure for ImageUtils with complete responsive object.
			$attrs = [
				'blogGrid' => [
					'advanced' => [
						'flexType' => ! empty( $flex_type_data ) ? $flex_type_data : [],
					],
				],
			];

			$selected_image_size = ImageUtils::select_optimal_image_size( $attrs, $layout, 'blogGrid' );

			// Get image dimensions from WordPress image size (only for featured images).
			if ( $has_featured_image ) {
				$image_size_data = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), $selected_image_size );
				$width           = is_array( $image_size_data ) ? (int) $image_size_data[1] : ( 'fullwidth' === $layout ? 1080 : 400 );
				$height          = is_array( $image_size_data ) ? (int) $image_size_data[2] : ( 'fullwidth' === $layout ? 675 : 250 );
			} else {
				// Fallback dimensions for grabbed images.
				$width  = 'fullwidth' === $layout ? 1080 : 400;
				$height = 'fullwidth' === $layout ? 675 : 250;
			}
		} else {
			// Fallback: Conservative approach for backward compatibility when flexType is not provided.
			$width  = 'on' === $args['fullwidth'] ? 1080 : 400;
			$height = 'on' === $args['fullwidth'] ? 675 : 250;
		}

		$width  = (int) apply_filters( 'et_pb_blog_image_width', $width );
		$height = (int) apply_filters( 'et_pb_blog_image_height', $height );
		$class  = 'on' === $args['fullwidth'] ? 'et_pb_post_main_image' : '';

		// Get alt text from featured image if available.
		$alt = $has_featured_image ? get_post_meta( get_post_thumbnail_id( $post ), '_wp_attachment_image_alt', true ) : '';

		$thumbnail_data = get_thumbnail( $width, $height, $class, $alt, $title, false, 'Blogimage' );
		$thumb          = $thumbnail_data['thumb'];

		if ( '' !== $thumb ) {
			// Get alt text (from featured image if available, otherwise use post title).
			$alt_text = $has_featured_image ? get_post_meta( get_post_thumbnail_id( $post ), '_wp_attachment_image_alt', true ) : '';

			$thumbnail = [
				'src'    => $thumb,
				'alt'    => ! empty( $alt_text ) ? $alt_text : esc_attr( get_the_title( $post ) ),
				'width'  => $width,
				'height' => $height,
				'class'  => $class,
			];

			// Only add srcset for featured images (requires attachment data).
			if ( $has_featured_image && $width < 480 && et_is_responsive_images_enabled() ) {
				$image_size_name = $width . 'x' . $height;
				$et_size         = isset( $et_theme_image_sizes ) && array_key_exists( $image_size_name, $et_theme_image_sizes ) ? $et_theme_image_sizes[ $image_size_name ] : [ $width, $height ];

				$et_attachment_image_attributes = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), $et_size );
				$thumbnail_with_size            = ! empty( $et_attachment_image_attributes[0] ) ? $et_attachment_image_attributes[0] : '';

				if ( $thumbnail_with_size ) {
					$thumbnail['srcset'] = $thumb . ' 479w, ' . $thumbnail_with_size . ' 480w';
					$thumbnail['sizes']  = '(max-width:479px) 479px, 100vw';
				}
			}
		}

		$post_type  = get_post_type( $post );
		$taxonomy   = ModuleUtils::get_taxonomy_for_post_type( $post_type );
		$terms      = get_the_terms( $post, $taxonomy );
		$categories = [];

		if ( ! empty( $terms ) ) {
			foreach ( $terms as $term ) {
				$categories[] = [
					'id'   => $term->term_id,
					'name' => $term->name,
					'slug' => $term->slug,
					'link' => get_term_link( $term, $taxonomy ),
				];
			}
		}

		// Detect module types in blog post content before rendering.
		// This ensures default preset styles are generated for all detected module types,
		// even if individual module instances use explicit presets.
		$detected_module_types = [];
		if ( 'on' === $args['excerpt_content'] ) {
			$post_content_raw = get_post_field( 'post_content', $post->ID );
			if ( ! empty( $post_content_raw ) ) {
				$all_detected_modules = DetectFeature::get_block_names( $post_content_raw );

				// Filter out structural modules (section, row, column).
				// Only content modules need default preset styles.
				$structural_modules    = [ 'divi/section', 'divi/row', 'divi/column' ];
				$detected_module_types = array_filter(
					$all_detected_modules,
					function ( $module_name ) use ( $structural_modules ) {
						return ! in_array( $module_name, $structural_modules, true );
					}
				);

				// Store detected module types for default preset style generation.
				// This will be used during rendering to ensure default preset styles are generated.
				Style::set_detected_module_types_for_inner_content( array_values( $detected_module_types ) );
			}
		}

		// Store Theme Builder context flag for selector prefix determination.
		// This is passed from VB which knows its own context reliably.
		// Set it before rendering inner content, clear it after.
		$is_theme_builder = ! empty( $args['is_theme_builder'] );
		if ( $is_theme_builder ) {
			Style::set_is_theme_builder_context_for_inner_content( true );
		}

		$content = BlogModule::render_content(
			[
				'excerpt_content' => $args['excerpt_content'],
				'show_excerpt'    => $args['show_excerpt'],
				'excerpt_manual'  => $args['manual_excerpt'],
				'excerpt_length'  => $args['excerpt_length'],
				'post_id'         => $post->ID,
				'append_styles'   => true, // Blog module needs styles for full post content.
			]
		);

		// Clear Theme Builder context flag after rendering.
		if ( $is_theme_builder ) {
			Style::set_is_theme_builder_context_for_inner_content( false );
		}

		// Capture styles generated during content rendering for Visual Builder.
		// Note: This is VB-only. Frontend renders styles differently via wp_footer.
		$content_styles = '';
		if ( 'on' === $args['excerpt_content'] ) {
			// Render all style groups under the 'post' key.
			$content_styles = Style::render( 'default', 'presetNested', 'post' )
				. Style::render( 'default', 'preset', 'post' )
				. Style::render( 'default', 'presetGroup', 'post' )
				. Style::render( 'default', 'module', 'post' );

			// In Theme Builder VB, increase specificity for inner content styles.
			// Replace `body #page-container .et_pb_section` with `.et-db #et-boc .et-l .et_pb_posts .et_pb_post`.
			// This ensures inner content styles override static CSS.
			// Specificity: (1 ID, 5 classes) which beats static CSS (1 ID, 4 classes).
			$is_theme_builder_vb = ! empty( $args['is_theme_builder'] );
			if ( $is_theme_builder_vb && ! empty( $content_styles ) ) {
				// Replace the standard selector prefix with Theme Builder + blog-specific prefix.
				// Module.php already applies `.et-db #et-boc .et-l` for modules without customPostTypeSelector,
				// so we only need to replace selectors that use the standard `body #page-container .et_pb_section` prefix.
				$content_styles = preg_replace(
					'/body\s+#page-container\s+\.et_pb_section\s+/',
					'.et-db #et-boc .et-l .et_pb_posts .et_pb_post ',
					$content_styles
				);
			}

			// Clear the styles for this post to prevent duplication across multiple posts in REST API.
			// This is necessary because multiple posts are processed in a single request (REST API),
			// and styles would accumulate across posts without clearing.
			Style::clear_styles_for_key( 'post' );

			// Clear detected module types after rendering to prevent affecting other posts.
			Style::set_detected_module_types_for_inner_content( [] );
		}

		ob_start();
		et_pb_gallery_images( 'slider' );
		$post_gallery = ob_get_clean();

		// Post background color.
		$post_use_background_color = get_post_meta( $post->ID, '_et_post_use_bg_color', true ) ? true : false;
		$background_color          = get_post_meta( $post->ID, '_et_post_bg_color', true );
		$post_background_color     = $background_color && '' !== $background_color ? $background_color : '#ffffff';

		return [
			'id'                 => $post->ID,
			'classNames'         => get_post_class( '', $post->ID ),
			/**
			 * Process the data with the html_entity_decode function.
			 *
			 * This function is used to decode HTML entities in the given data.
			 * It is specifically required for data consumed by VB REST requests.
			 * HTML entities are special characters that are represented in HTML using entity references,
			 * such as `&amp;` for the ampersand character (&).
			 * By decoding these entities, the original characters are restored,
			 * ensuring that the data is correctly interpreted by the VB REST requests.
			 */
			'title'              => html_entity_decode( get_the_title( $post ) ),
			'isPasswordRequired' => post_password_required( $post ),
			'permalink'          => get_permalink( $post ),
			'thumbnail'          => ! empty( $thumb ) ? $thumbnail : null,
			'content'            => $content,
			'styles'             => $content_styles,
			'date'               => get_the_date( $args['date_format'], $post ),
			'comment'            => sprintf( esc_html( _nx( '%s Comment', '%s Comments', get_comments_number( $post ), 'number of comments', 'et_builder_5' ) ), number_format_i18n( get_comments_number( $post ) ) ),
			'author'             => [
				'name' => get_the_author_meta( 'display_name', $post->post_author ),
				'link' => get_author_posts_url( $post->post_author ),
			],
			'categories'         => $categories,
			'postFormat'         => [
				'type'            => et_pb_post_format(),
				'video'           => PostUtility::get_first_video(),
				'gallery'         => $post_gallery,
				'audio'           => et_core_intentionally_unescaped( et_pb_get_audio_player(), 'html' ),
				'quote'           => et_core_intentionally_unescaped( et_get_blockquote_in_content(), 'html' ),
				'link'            => esc_html( et_get_link_url() ),
				'textColorClass'  => et_divi_get_post_text_color(),
				'backgroundColor' => $post_use_background_color ? $post_background_color : '',
			],
		];
	}

	/**
	 * Get the current post ID from various sources in REST/AJAX context.
	 *
	 * @since ??
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return int Current post ID, or 0 if not found.
	 */
	private static function _get_current_post_id( WP_REST_Request $request ): int {
		// Try multiple parameter names that might contain current post ID.
		$param_names = [ 'current_post_id', 'currentPostId', 'et_post_id', 'post' ];
		foreach ( $param_names as $param_name ) {
			$post_id = $request->get_param( $param_name );
			if ( ! empty( $post_id ) && is_numeric( $post_id ) ) {
				return (int) $post_id;
			}
		}

		// Try to get from global state as fallback.
		$current_post_id = get_the_ID();
		if ( ! empty( $current_post_id ) ) {
			return (int) $current_post_id;
		}

		return 0;
	}
}
