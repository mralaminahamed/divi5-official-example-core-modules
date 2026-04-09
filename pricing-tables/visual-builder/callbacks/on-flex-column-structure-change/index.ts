import { dispatch } from '@divi/data';
import { type Module } from '@divi/types';

/**
 * Function callback for onChange event of flex column structure field.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.OnChangeParams<undefined, string>} params Callback parameters.
 */
export const onFlexColumnStructureChange = (params: Module.Settings.Field.OnChangeParams<undefined, string>): void => {
  dispatch('divi/edit-post').changePricingTablesFlexColumnStructure({
    id: params.moduleId,
    breakpoint: params.responsiveMode,
    state: params.stateMode,
    value: params.inputValue,
  });
};
