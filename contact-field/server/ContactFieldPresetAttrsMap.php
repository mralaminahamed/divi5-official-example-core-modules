<?php
/**
 * Module Library: ContactField Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\ContactField;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}


/**
 * Class ContactFieldPresetAttrsMap
 *
 * @since ??
 *
 * @package ET\Builder\Packages\ModuleLibrary\ContactField
 */
class ContactFieldPresetAttrsMap {
	/**
	 * Get the preset attributes map for the ContactField module.
	 *
	 * @since ??
	 *
	 * @param array  $map         The preset attributes map.
	 * @param string $module_name The module name.
	 *
	 * @return array
	 */
	public static function get_map( array $map, string $module_name ) {
		if ( 'divi/contact-field' !== $module_name ) {
			return $map;
		}

		$keys_to_remove = [
			'module.advanced.text.text__orientation',
			'module.advanced.text.text__color',
			'module.advanced.text.textShadow__style',
			'module.advanced.text.textShadow__horizontal',
			'module.advanced.text.textShadow__vertical',
			'module.advanced.text.textShadow__blur',
			'module.advanced.text.textShadow__color',
			'module.decoration.disabledOn',
			'module.decoration.sticky__position',
			'module.decoration.sticky__offset.top',
			'module.decoration.sticky__offset.bottom',
			'module.decoration.sticky__limit.top',
			'module.decoration.sticky__limit.bottom',
			'module.decoration.sticky__offset.surrounding',
			'module.decoration.sticky__transition',
			'field.decoration.background__gradient.stops',
			'field.decoration.background__gradient.enabled',
			'field.decoration.background__gradient.type',
			'field.decoration.background__gradient.direction',
			'field.decoration.background__gradient.directionRadial',
			'field.decoration.background__gradient.repeat',
			'field.decoration.background__gradient.length',
			'field.decoration.background__gradient.overlaysImage',
			'field.decoration.background__image.url',
			'field.decoration.background__image.parallax.enabled',
			'field.decoration.background__image.parallax.method',
			'field.decoration.background__image.size',
			'field.decoration.background__image.width',
			'field.decoration.background__image.height',
			'field.decoration.background__image.position',
			'field.decoration.background__image.horizontalOffset',
			'field.decoration.background__image.verticalOffset',
			'field.decoration.background__image.repeat',
			'field.decoration.background__image.blend',
			'field.decoration.background__video.mp4',
			'field.decoration.background__video.webm',
			'field.decoration.background__video.width',
			'field.decoration.background__video.height',
			'field.decoration.background__video.allowPlayerPause',
			'field.decoration.background__video.pauseOutsideViewport',
			'field.decoration.background__pattern.style',
			'field.decoration.background__pattern.enabled',
			'field.decoration.background__pattern.color',
			'field.decoration.background__pattern.transform',
			'field.decoration.background__pattern.size',
			'field.decoration.background__pattern.width',
			'field.decoration.background__pattern.height',
			'field.decoration.background__pattern.repeatOrigin',
			'field.decoration.background__pattern.horizontalOffset',
			'field.decoration.background__pattern.verticalOffset',
			'field.decoration.background__pattern.repeat',
			'field.decoration.background__pattern.blend',
			'field.decoration.background__mask.style',
			'field.decoration.background__mask.enabled',
			'field.decoration.background__mask.color',
			'field.decoration.background__mask.transform',
			'field.decoration.background__mask.aspectRatio',
			'field.decoration.background__mask.size',
			'field.decoration.background__mask.width',
			'field.decoration.background__mask.height',
			'field.decoration.background__mask.position',
			'field.decoration.background__mask.horizontalOffset',
			'field.decoration.background__mask.verticalOffset',
			'field.decoration.background__mask.blend',
		];

		foreach ( $keys_to_remove as $key ) {
			unset( $map[ $key ] );
		}

		return array_merge(
			$map,
			[
				'field.advanced.focus.background__color'   => [
					'attrName' => 'field.advanced.focus.background',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'field.advanced.focus.font.font__color'    => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'field.advanced.focus.font.font__size'     => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'size',
				],
				'field.advanced.focus.font.font__letterSpacing' => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'letterSpacing',
				],
				'field.advanced.focus.font.font__lineHeight' => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineHeight',
				],
				'field.decoration.font.font__headingLevel' => [
					'attrName' => 'field.decoration.font.font',
					'preset'   => [ 'html' ],
					'subName'  => 'headingLevel',
				],
				'fieldTitle.decoration.font.font__color'   => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'fieldTitle.decoration.font.font__family'  => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'family',
				],
				'fieldTitle.decoration.font.font__letterSpacing' => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'letterSpacing',
				],
				'fieldTitle.decoration.font.font__lineColor' => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineColor',
				],
				'fieldTitle.decoration.font.font__lineHeight' => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineHeight',
				],
				'fieldTitle.decoration.font.font__lineStyle' => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineStyle',
				],
				'fieldTitle.decoration.font.font__size'    => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'size',
				],
				'fieldTitle.decoration.font.font__style'   => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'style',
				],
				'fieldTitle.decoration.font.font__textAlign' => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'textAlign',
				],
				'fieldTitle.decoration.font.font__weight'  => [
					'attrName' => 'fieldTitle.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'weight',
				],
				'fieldTitle.decoration.font.textShadow__blur' => [
					'attrName' => 'fieldTitle.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'blur',
				],
				'fieldTitle.decoration.font.textShadow__color' => [
					'attrName' => 'fieldTitle.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'fieldTitle.decoration.font.textShadow__horizontal' => [
					'attrName' => 'fieldTitle.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'horizontal',
				],
				'fieldTitle.decoration.font.textShadow__style' => [
					'attrName' => 'fieldTitle.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'style',
				],
				'fieldTitle.decoration.font.textShadow__vertical' => [
					'attrName' => 'fieldTitle.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'vertical',
				],
				'field.advanced.focus.border__radius'      => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'radius',
				],
				'field.advanced.focus.border__styles'      => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles',
				],
				'field.advanced.focus.border__styles.all.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.width',
				],
				'field.advanced.focus.border__styles.top.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.width',
				],
				'field.advanced.focus.border__styles.right.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.width',
				],
				'field.advanced.focus.border__styles.bottom.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.width',
				],
				'field.advanced.focus.border__styles.left.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.width',
				],
				'field.advanced.focus.border__styles.all.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.color',
				],
				'field.advanced.focus.border__styles.top.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.color',
				],
				'field.advanced.focus.border__styles.right.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.color',
				],
				'field.advanced.focus.border__styles.bottom.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.color',
				],
				'field.advanced.focus.border__styles.left.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.color',
				],
				'field.advanced.focus.border__styles.all.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.style',
				],
				'field.advanced.focus.border__styles.top.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.style',
				],
				'field.advanced.focus.border__styles.right.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.style',
				],
				'field.advanced.focus.border__styles.bottom.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.style',
				],
				'field.advanced.focus.border__styles.left.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.style',
				],
				'module.advanced.text__orientation'        => [
					'attrName' => 'module.advanced.text',
					'preset'   => [ 'html' ],
					'subName'  => 'orientation',
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
