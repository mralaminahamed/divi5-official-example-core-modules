import { type BlogAttrs, type Module } from '@divi/types';

import { type ModuleEditProps } from '../types-module';

export type BlogEditProps = ModuleEditProps<BlogAttrs>;

export type BlogFieldCallbackParams = Module.Settings.Field.CallbackParams<BlogAttrs>;
