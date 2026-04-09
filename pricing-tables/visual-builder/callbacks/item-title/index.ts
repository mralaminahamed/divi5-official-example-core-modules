import { __ } from '@wordpress/i18n';

import { type PricingTableAttrs } from '@divi/types';

export const itemTitleCallback = (attrs: PricingTableAttrs) => {
  const title = attrs?.title?.innerContent?.desktop?.value;
  const adminTitle = attrs?.module?.meta?.adminLabel?.desktop?.value;
  let displayTitle = __('New Pricing Table', 'et_builder_5');

  if (title) {
    displayTitle = title;
  } else if (adminTitle) {
    displayTitle = adminTitle;
  }

  return displayTitle;
};
