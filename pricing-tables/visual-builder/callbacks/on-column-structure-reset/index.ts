import { dispatch } from '@divi/data';
import { type Module } from '@divi/types';

/**
 * Function callback for column structure's reset button.
 * When clicked, reset table layout to one table (`4_4`) layout.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.OnResetParams} param0 Callback parameters.
 */
export const onColumnStructureReset = ({ moduleId }: Module.Settings.Field.OnResetParams): void => {
  dispatch('divi/edit-post').changeColumnStructure(moduleId, '4_4');
};
