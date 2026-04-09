import { __ } from '@wordpress/i18n';

import { type AccordionItemAttrs } from '@divi/types';

export const itemTitleCallback = (attrs: AccordionItemAttrs) => {
  const heading = attrs?.title?.innerContent?.desktop?.value;
  const adminTitle = attrs?.module?.meta?.adminLabel?.desktop?.value;
  let title = __('New Accordion Item', 'et_builder_5');

  if (adminTitle) {
    title = adminTitle;
  } else if (heading) {
    title = heading;
  }

  return title;
};
