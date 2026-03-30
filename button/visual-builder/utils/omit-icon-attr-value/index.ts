import { omit, set } from 'lodash';

import { type AttrState, type Breakpoint, type Module } from '@divi/types';

/**
 * Removes the 'icon' property from button attributes across all breakpoints and attribute states.
 *
 * This function iterates through all breakpoints and attribute states in the provided button
 * attributes and creates a new attributes object with the 'icon' property omitted from each
 * attribute state object.
 *
 * @since ??
 *
 * @param {Module.Element.Decoration.Button.Attributes} buttonAttrs The button attributes object
 * containing breakpoint and attribute state data.
 *
 * @returns {Module.Element.Decoration.Button.Attributes} A new button attributes object with the
 * 'icon' property removed from all attribute states across all breakpoints.
 */
export const removeIconAttrValue = (
  buttonAttrs: Module.Element.Decoration.Button.Attributes,
): Module.Element.Decoration.Button.Attributes => {
  const removedIconAttrs: Module.Element.Decoration.Button.Attributes = {};

  Object.keys(buttonAttrs).forEach((breakpointName: Breakpoint.Name) => {
    Object.keys(buttonAttrs[breakpointName]).forEach((attrStateName: AttrState) => {
      set(removedIconAttrs, [breakpointName, attrStateName], {
        ...omit(buttonAttrs[breakpointName][attrStateName], ['icon']),
      });
    });
  });

  return removedIconAttrs;
};
