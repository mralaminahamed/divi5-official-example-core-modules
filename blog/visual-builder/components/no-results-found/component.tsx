import React from 'react';

import { __ } from '@wordpress/i18n';

export const NoResultsFound = () => (
  <div className="entry">
    <h2 className="not-found-title">{__('No Results Found.', 'et_builder_5')}</h2>
    <p>
      {__('The page you requested could not be found.', 'et_builder_5')}
      {__('Try refining your search, or use the navigation above to locate the post.', 'et_builder_5')}
    </p>
  </div>
);
