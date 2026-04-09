import { __ } from '@wordpress/i18n';

import { type SlideAttrs } from '@divi/types';

export const itemTitleCallback = (attrs: SlideAttrs) => {
  const heading = attrs?.title?.innerContent?.desktop?.value;
  const adminTitle = attrs?.module?.meta?.adminLabel?.desktop?.value;
  let title = __('New Slide', 'et_builder_5');

  if (heading) {
    title = heading;
  } else if (adminTitle) {
    title = adminTitle;
  }

  return title;
};
