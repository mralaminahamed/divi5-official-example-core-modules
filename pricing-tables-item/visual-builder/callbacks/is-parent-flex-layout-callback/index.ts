import { isParentFlexLayout } from '@divi/module-utils';
import { type Module, type PricingTableAttrs } from '@divi/types';

/**
 * Determines if the parent module of the current module is using a flex layout.
 *
 * @param {Module.Settings.Field.CallbackParams<PricingTableAttrs>} params The callback function parameters.
 * @returns {boolean} `true` if the parent module's layout style is `flex`, otherwise `false`.
 */
export const isParentFlexLayoutCallback = ({
  moduleId,
  baseBreakpoint,
  breakpointNames,
  responsiveMode,
  stateMode,
}: Module.Settings.Field.CallbackParams<PricingTableAttrs>) =>
  isParentFlexLayout({
    moduleId,
    baseBreakpoint,
    breakpointNames,
    breakpoint: responsiveMode,
    state: stateMode,
  });
