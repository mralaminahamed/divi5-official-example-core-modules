import React, { Fragment, type ReactElement } from 'react';

import { useSelect } from '@divi/data';
import { processFontIcon } from '@divi/icon-library';
import { processCustomAttributesForElement } from '@divi/module';

import { type PostThumbnailProps } from './types';

/**
 * Post thumbnail component for the Blog module.
 *
 * @since ??
 *
 * @param {PostThumbnailProps} props Post thumbnail component props.
 *
 * @returns {ReactElement}
 */
const PostThumbnail = ({ post, overlayIcon, hasWrapper, showOverlay, moduleId }: PostThumbnailProps): ReactElement => {
  const iconValue = processFontIcon(overlayIcon);

  // Get module data for custom attributes at component level (not inside render function)
  const moduleData = useSelect(select => select('divi/edit-post').getModule(moduleId), [moduleId]);

  const renderOverlay = () => {
    if (!showOverlay) {
      return null;
    }

    return <span className="et_overlay et_pb_inline_icon" data-icon={iconValue} />;
  };

  const renderThumbnail = () => {
    if (!post.thumbnail?.src) {
      return null;
    }

    // Get custom attributes for the image element
    const altText = post.thumbnail?.alt || post.title || '';
    const existingAttrs = {
      src: post?.thumbnail?.src,
      className: post?.thumbnail?.class,
      srcSet: post.thumbnail?.srcset,
      sizes: post.thumbnail?.sizes,
      width: post.thumbnail?.width,
      height: post.thumbnail?.height,
    };

    // Process custom attributes with existing attrs to properly merge classes
    const allAttributes = moduleData
      ? processCustomAttributesForElement(moduleData, 'image', existingAttrs)
      : existingAttrs;

    return (
      <a href={post.permalink} className="entry-featured-image-url">
        <img
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...allAttributes}
          alt={altText}
        />
        {renderOverlay()}
      </a>
    );
  };

  if (hasWrapper) {
    return <div className="et_pb_image_container">{renderThumbnail()}</div>;
  }

  return <Fragment>{renderThumbnail()}</Fragment>;
};

export { PostThumbnail };
