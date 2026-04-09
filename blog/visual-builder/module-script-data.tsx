import React, { type ReactElement } from 'react';

import { type ModuleScriptDataProps } from '@divi/module';
import { type BlogAttrs } from '@divi/types';

/**
 * Blog module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = ({ elements }: ModuleScriptDataProps<BlogAttrs>): ReactElement => (
  <React.Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
    {elements.scriptData({
      attrName: 'blogGrid',
    })}
  </React.Fragment>
);
