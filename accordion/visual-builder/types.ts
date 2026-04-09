import { type AccordionAttrs, type Module } from '@divi/types';

import { type ModuleEditProps } from '../types-module';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    et_pb_accordion_item_expand: ToggleAccordionItemExpandFn;
  }
}

export type AccordionEditProps = ModuleEditProps<AccordionAttrs>;

export type AccordionFieldCallbackParams = Module.Settings.Field.CallbackParams<AccordionAttrs>;

export type ToggleAccordionItemExpandFn = ($accordion_item: JQuery<HTMLElement>, onExpandCallback?: () => void) => void;
