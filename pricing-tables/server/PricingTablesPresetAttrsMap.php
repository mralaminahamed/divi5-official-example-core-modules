<?php
/**
 * Module Library: PricingTables Module Preset Attributes Map
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}


/**
 * Class PricingTablesPresetAttrsMap
 *
 * @since ??
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 */
class PricingTablesPresetAttrsMap {
	/**
	 * Get the preset attributes map for the Pricing Tables module.
	 *
	 * @since ??
	 *
	 * @param array  $map         The preset attributes map.
	 * @param string $module_name The module name.
	 *
	 * @return array
	 */
	public static function get_map( array $map, string $module_name ) {
		if ( 'divi/pricing-tables' !== $module_name ) {
			return $map;
		}

		// Keys to unset.
		$keys_to_unset = [
			'module.advanced.text.text__color',
			'featuredTitle.decoration.font__color',
			'featuredContent.decoration.font__color',
			'featuredSubtitle.decoration.font__color',
			'featuredPrice.decoration.font__color',
			'featuredCurrencyFrequency.decoration.font__color',
			'featuredExcluded.decoration.font__color',
			'button.decoration.button.innerContent__text',
			'button.decoration.button.innerContent__linkUrl',
			'button.decoration.button.innerContent__linkTarget',
			'button.decoration.button.innerContent__rel',
			'button.decoration.button.decoration.button__enable',
			'button.decoration.button.decoration.button__icon.enable',
			'button.decoration.button.decoration.button__icon.settings',
			'button.decoration.button.decoration.button__icon.color',
			'button.decoration.button.decoration.button__icon.placement',
			'button.decoration.button.decoration.button__icon.onHover',
			'button.decoration.button.decoration.button__alignment',
			'button.decoration.button.decoration.background__color',
			'button.decoration.button.decoration.background__gradient.stops',
			'button.decoration.button.decoration.background__gradient.enabled',
			'button.decoration.button.decoration.background__gradient.type',
			'button.decoration.button.decoration.background__gradient.direction',
			'button.decoration.button.decoration.background__gradient.directionRadial',
			'button.decoration.button.decoration.background__gradient.repeat',
			'button.decoration.button.decoration.background__gradient.length',
			'button.decoration.button.decoration.background__gradient.overlaysImage',
			'button.decoration.button.decoration.background__image.url',
			'button.decoration.button.decoration.background__image.parallax.enabled',
			'button.decoration.button.decoration.background__image.parallax.method',
			'button.decoration.button.decoration.background__image.size',
			'button.decoration.button.decoration.background__image.width',
			'button.decoration.button.decoration.background__image.height',
			'button.decoration.button.decoration.background__image.position',
			'button.decoration.button.decoration.background__image.horizontalOffset',
			'button.decoration.button.decoration.background__image.verticalOffset',
			'button.decoration.button.decoration.background__image.repeat',
			'button.decoration.button.decoration.background__image.blend',
			'button.decoration.button.decoration.background__video.mp4',
			'button.decoration.button.decoration.background__video.webm',
			'button.decoration.button.decoration.background__video.width',
			'button.decoration.button.decoration.background__video.height',
			'button.decoration.button.decoration.background__video.allowPlayerPause',
			'button.decoration.button.decoration.background__video.pauseOutsideViewport',
			'button.decoration.button.decoration.background__pattern.style',
			'button.decoration.button.decoration.background__pattern.enabled',
			'button.decoration.button.decoration.background__pattern.color',
			'button.decoration.button.decoration.background__pattern.transform',
			'button.decoration.button.decoration.background__pattern.size',
			'button.decoration.button.decoration.background__pattern.width',
			'button.decoration.button.decoration.background__pattern.height',
			'button.decoration.button.decoration.background__pattern.repeatOrigin',
			'button.decoration.button.decoration.background__pattern.horizontalOffset',
			'button.decoration.button.decoration.background__pattern.verticalOffset',
			'button.decoration.button.decoration.background__pattern.repeat',
			'button.decoration.button.decoration.background__pattern.blend',
			'button.decoration.button.decoration.background__mask.style',
			'button.decoration.button.decoration.background__mask.enabled',
			'button.decoration.button.decoration.background__mask.color',
			'button.decoration.button.decoration.background__mask.transform',
			'button.decoration.button.decoration.background__mask.aspectRatio',
			'button.decoration.button.decoration.background__mask.size',
			'button.decoration.button.decoration.background__mask.width',
			'button.decoration.button.decoration.background__mask.height',
			'button.decoration.button.decoration.background__mask.position',
			'button.decoration.button.decoration.background__mask.horizontalOffset',
			'button.decoration.button.decoration.background__mask.verticalOffset',
			'button.decoration.button.decoration.background__mask.blend',
			'button.decoration.button.decoration.border__radius',
			'button.decoration.button.decoration.border__styles',
			'button.decoration.button.decoration.border__styles.all.width',
			'button.decoration.button.decoration.border__styles.top.width',
			'button.decoration.button.decoration.border__styles.right.width',
			'button.decoration.button.decoration.border__styles.bottom.width',
			'button.decoration.button.decoration.border__styles.left.width',
			'button.decoration.button.decoration.border__styles.all.color',
			'button.decoration.button.decoration.border__styles.top.color',
			'button.decoration.button.decoration.border__styles.right.color',
			'button.decoration.button.decoration.border__styles.bottom.color',
			'button.decoration.button.decoration.border__styles.left.color',
			'button.decoration.button.decoration.border__styles.all.style',
			'button.decoration.button.decoration.border__styles.top.style',
			'button.decoration.button.decoration.border__styles.right.style',
			'button.decoration.button.decoration.border__styles.bottom.style',
			'button.decoration.button.decoration.border__styles.left.style',
			'button.decoration.button.decoration.spacing__margin',
			'button.decoration.button.decoration.spacing__padding',
			'button.decoration.button.decoration.boxShadow__style',
			'button.decoration.button.decoration.boxShadow__horizontal',
			'button.decoration.button.decoration.boxShadow__vertical',
			'button.decoration.button.decoration.boxShadow__blur',
			'button.decoration.button.decoration.boxShadow__spread',
			'button.decoration.button.decoration.boxShadow__color',
			'button.decoration.button.decoration.boxShadow__position',
			'button.decoration.button.decoration.font.font__family',
			'button.decoration.button.decoration.font.font__weight',
			'button.decoration.button.decoration.font.font__style',
			'button.decoration.button.decoration.font.font__lineColor',
			'button.decoration.button.decoration.font.font__lineStyle',
			'button.decoration.button.decoration.font.font__textAlign',
			'button.decoration.button.decoration.font.font__color',
			'button.decoration.button.decoration.font.font__size',
			'button.decoration.button.decoration.font.font__letterSpacing',
			'button.decoration.button.decoration.font.font__lineHeight',
			'button.decoration.button.decoration.font.textShadow__style',
			'button.decoration.button.decoration.font.textShadow__horizontal',
			'button.decoration.button.decoration.font.textShadow__vertical',
			'button.decoration.button.decoration.font.textShadow__blur',
			'button.decoration.button.decoration.font.textShadow__color',
			'button.decoration.font.font__lineHeight',
			'children.innerContent__rel',
			'button.innerContent__text',
			'button.innerContent__linkUrl',
			'button.innerContent__linkTarget',
			'module.advanced.featured',
			'button.innerContent__rel',
		];

		// Unset the keys.
		foreach ( $keys_to_unset as $key ) {
			unset( $map[ $key ] );
		}

		return array_merge(
			$map,
			[
				'content.advanced.bulletColor'             => [
					'attrName' => 'content.advanced.bulletColor',
					'preset'   => [ 'style' ],
				],
				'title.decoration.font.font__headingLevel' => [
					'attrName' => 'title.decoration.font.font',
					'preset'   => [ 'html' ],
					'subName'  => 'headingLevel',
				],
				'button.decoration.button__enable'         => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'enable',
				],
				'button.decoration.button__icon.enable'    => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.enable',
				],
				'button.decoration.button__icon.settings'  => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'html', 'style' ],
					'subName'  => 'icon.settings',
				],
				'button.decoration.button__icon.color'     => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.color',
				],
				'button.decoration.button__icon.placement' => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.placement',
				],
				'button.decoration.button__icon.onHover'   => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.onHover',
				],
				'button.decoration.button__alignment'      => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'alignment',
				],
				'content.advanced.showBullet'              => [
					'attrName' => 'content.advanced.showBullet',
					'preset'   => [ 'html' ],
				],
				'featuredTitle.decoration.font.font__color' => [
					'attrName' => 'featuredTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'featuredContent.decoration.font.font__color' => [
					'attrName' => 'featuredContent.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'featuredSubtitle.decoration.font.font__color' => [
					'attrName' => 'featuredSubtitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'featuredPrice.decoration.font.font__color' => [
					'attrName' => 'featuredPrice.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'featuredCurrencyFrequency.decoration.font.font__color' => [
					'attrName' => 'featuredCurrencyFrequency.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'featuredExcluded.decoration.font.font__color' => [
					'attrName' => 'featuredExcluded.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'children.button.innerContent__rel'        => [
					'attrName' => 'children.button.innerContent',
					'preset'   => [ 'html' ],
					'subName'  => 'rel',
				],
				'module.decoration.layout__alignContent'   => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'alignContent',
				],
				'module.decoration.layout__alignItems'     => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'alignItems',
				],
				'module.decoration.layout__collapseEmptyColumns' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'collapseEmptyColumns',
				],
				'module.decoration.layout__columnGap'      => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'columnGap',
				],
				'module.decoration.layout__display'        => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'display',
				],
				'module.decoration.layout__flexDirection'  => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'flexDirection',
				],
				'module.decoration.layout__flexWrap'       => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'flexWrap',
				],
				'module.decoration.layout__gridAutoColumns' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridAutoColumns',
				],
				'module.decoration.layout__gridAutoFlow'   => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridAutoFlow',
				],
				'module.decoration.layout__gridAutoRows'   => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridAutoRows',
				],
				'module.decoration.layout__gridColumnCount' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridColumnCount',
				],
				'module.decoration.layout__gridColumnMinWidth' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridColumnMinWidth',
				],
				'module.decoration.layout__gridColumnWidth' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridColumnWidth',
				],
				'module.decoration.layout__gridColumnWidths' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridColumnWidths',
				],
				'module.decoration.layout__gridDensity'    => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridDensity',
				],
				'module.decoration.layout__gridJustifyItems' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridJustifyItems',
				],
				'module.decoration.layout__gridOffsetRules' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridOffsetRules',
				],
				'module.decoration.layout__gridRowCount'   => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridRowCount',
				],
				'module.decoration.layout__gridRowHeight'  => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridRowHeight',
				],
				'module.decoration.layout__gridRowHeights' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridRowHeights',
				],
				'module.decoration.layout__gridRowMinHeight' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridRowMinHeight',
				],
				'module.decoration.layout__gridTemplateColumns' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridTemplateColumns',
				],
				'module.decoration.layout__gridTemplateRows' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'gridTemplateRows',
				],
				'module.decoration.layout__justifyContent' => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'justifyContent',
				],
				'module.decoration.layout__rowGap'         => [
					'attrName' => 'module.decoration.layout',
					'preset'   => [ 'style' ],
					'subName'  => 'rowGap',
				],
				'module.advanced.html__elementType'        => [
					'attrName' => 'module.advanced.html',
					'preset'   => [ 'html' ],
					'subName'  => 'elementType',
				],
				'module.advanced.html__htmlAfter'          => [
					'attrName' => 'module.advanced.html',
					'preset'   => [ 'html' ],
					'subName'  => 'htmlAfter',
				],
				'module.advanced.html__htmlBefore'         => [
					'attrName' => 'module.advanced.html',
					'preset'   => [ 'html' ],
					'subName'  => 'htmlBefore',
				],
			]
		);
	}
}
