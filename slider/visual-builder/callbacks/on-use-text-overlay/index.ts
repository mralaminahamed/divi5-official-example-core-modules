import { select } from '@divi/data';
import { isOnOff } from '@divi/script-library';
import { type FormatBreakpointStateAttr, type GlobalData, type Module, type SliderAttrs } from '@divi/types';

/**
 * Determine whether text overlay color field should be visible or not.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.CallbackParams<SliderAttrs>} params Function parameters.
 *
 * @returns {boolean}
 */
export const onUseTextOverlay = (params: Module.Settings.Field.CallbackParams<SliderAttrs>): boolean => {
  const { attrs } = params;
  const useOverlayFromAttrs = attrs?.children?.contentOverlay?.advanced?.use?.desktop?.value;

  // If the use overlay is set to on or off, return the value.
  // This ensure any value set at module level take priority over the preset value.
  if ('string' === typeof useOverlayFromAttrs && isOnOff(useOverlayFromAttrs)) {
    return 'on' === useOverlayFromAttrs;
  }

  const presetData: GlobalData.Store.Selectors.GetMergedModulePresetAttrs.ReturnValue = select(
    'divi/global-data',
  ).getMergedModulePresetAttrs({
    moduleName: 'divi/slider',
    presetIds: attrs?.modulePreset ?? [],
    useDefaultFallback: true,
  });
  const presetUseOverlayAttr = presetData?.attrs?.getIn([
    'children',
    'contentOverlay',
    'advanced',
    'use',
  ]) as FormatBreakpointStateAttr<string>;
  const useOverlayFromPreset = presetUseOverlayAttr?.desktop?.value;

  return 'on' === useOverlayFromPreset;
};
