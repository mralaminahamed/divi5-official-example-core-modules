import { mapValues } from 'lodash';

import { __ } from '@wordpress/i18n';

import { blogModuleMetaData } from './module.json-source';

const { customCssFields } = blogModuleMetaData;

const labels: Record<string, string> = {
  title: __('Title', 'et_builder_5'),
  content: __('Body', 'et_builder_5'),
  postMeta: __('Post Meta', 'et_builder_5'),
  pagenavi: __('Pagenavi', 'et_builder_5'),
  featuredImage: __('Featured Image', 'et_builder_5'),
  readMore: __('Read More Button', 'et_builder_5'),
};

const cssFields = mapValues(customCssFields, (field, key) => ({
  ...field,
  label: labels[key],
}));

export { cssFields };
