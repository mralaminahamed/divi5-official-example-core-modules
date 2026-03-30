<?php
/**
 * Module Library: Accordion Item Module Utils
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\BlockParser\BlockParserBlock;

/**
 * AccordionItemModuleUtils class.
 *
 * This class provides utility functions for the Accordion Item module.
 *
 * @since ??
 */
class AccordionItemModuleUtils {

	/**
	 * Get toggle class name based on item position.
	 *
	 * Determines whether an accordion item should have the 'open' or 'close' class
	 * based on whether it is the first item in the accordion. The first item is
	 * marked as open by default.
	 *
	 * @since ??
	 *
	 * @param string           $id           The ID of the accordion item.
	 * @param BlockParserBlock $parent_block The parent block containing all accordion items.
	 *
	 * @return string|null The toggle class name ('et_pb_toggle_open' or 'et_pb_toggle_close'),
	 *                     or null if no accordion items are found.
	 */
	public static function get_toggle_class_name( string $id, BlockParserBlock $parent_block ): ?string {
		$all_items = array_filter(
			$parent_block->innerBlocks, // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- Matches WordPress block parser conventions.
			function ( array $child ) {
				return 'divi/accordion-item' === $child['blockName'];
			}
		);

		if ( empty( $all_items ) ) {
			return null;
		}

		$all_items_reindexed = array_values( $all_items );
		$first_item_id       = $all_items_reindexed[0]['id'];

		if ( $id === $first_item_id ) {
			return 'et_pb_toggle_open';
		}

		return 'et_pb_toggle_close';
	}
}
