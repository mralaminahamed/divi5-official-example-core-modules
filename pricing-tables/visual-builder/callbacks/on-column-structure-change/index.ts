import { dispatch } from '@divi/data';
import { type Module } from '@divi/types';

/**
 * Function callback for pricing tables column structure's change event.
 * When column structure is changed, update pricing table layout to match the new structure.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.OnChangeUnknownParams} event Callback event parameters.
 */
export const onColumnStructureChange = (event: Module.Settings.Field.OnChangeUnknownParams): void => {
  // Change table layout structure.
  /**
   * TODO(D5, ESLint): Refactor `.changeColumnStructure` for type safety and remove ESLint suppression.
   * The ESLint error related to this issue has been suppressed as a temporary measure and
   * was not visible during build time before ESLint refactoring. Address this issue in future refactoring efforts.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  dispatch('divi/edit-post').changeColumnStructure(event.moduleId, event.inputValue);
};
