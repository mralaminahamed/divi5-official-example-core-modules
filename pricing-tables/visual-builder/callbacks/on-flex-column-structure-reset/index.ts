import { dispatch, select } from '@divi/data';
import { type Module } from '@divi/types';

/**
 * Function callback for flex column structure's reset button.
 * When clicked, reset flex table layout to equal columns layout.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.OnResetParams} param0 Callback parameters.
 */
export const onFlexColumnStructureReset = ({ moduleId }: Module.Settings.Field.OnResetParams): void => {
  const breakpoint = select('divi/app-ui').getBreakpoint();
  const state = select('divi/app-ui').getAttributeState();

  dispatch('divi/edit-post').changeFlexColumnStructure({
    id: moduleId,
    breakpoint,
    state,
    value: 'equal-columns_1',
  });
};
