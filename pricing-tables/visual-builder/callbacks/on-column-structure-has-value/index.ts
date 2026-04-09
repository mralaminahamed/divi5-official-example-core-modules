import { type Module } from '@divi/types';

/**
 * Function callback to check if column structure field has value.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.OnHasValueParams} param0 Callback parameters.
 *
 * @returns {boolean} Whether the field has value.
 */
export const onColumnStructureHasValue = ({ value }: Module.Settings.Field.OnHasValueParams): boolean =>
  '4_4' !== value;
