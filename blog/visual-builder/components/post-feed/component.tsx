import React, { createElement, type ReactElement, useEffect, useRef } from 'react';

import { ChildModulesContainer } from '@divi/module';

import { Pagination } from '../pagination/component';
import { Posts } from '../posts/component';
import { type PostFeedProps } from './types';

/**
 * Renders a post feed for a blog component.
 *
 * @since ??
 *
 * @param {PostFeedProps} props The component props.
 *
 * @returns {ReactElement}
 */
const PostFeed = ({
  moduleId,
  posts,
  showOverlay,
  overlayIcon,
  headingLevel,
  showThumbnail,
  showReadMore,
  pagination,
  showPagination,
  showAuthor,
  showDate,
  showCategories,
  showComments,
  layoutDisplay = 'flex',
  elements,
  childrenIds,
  isLooped,
  loopIndex,
}: PostFeedProps): ReactElement => {
  const postsWrapRef = useRef<HTMLDivElement>(null);

  // Initialize fitVids for video post formats.
  useEffect(() => {
    if (postsWrapRef?.current) {
      const $postsWrap = jQuery(postsWrapRef.current);

      // Apply fitVids to all video containers within the posts wrapper.
      $postsWrap.find('.et_main_video_container').fitVids();
    }
  });

  const renderPagination = () => {
    if (!showPagination) {
      return null;
    }

    return (
      <Pagination paged={pagination?.paged} onChangePage={pagination?.onChangePage} metadata={pagination?.metadata} />
    );
  };

  // Determine layout type.
  const isFlexLayout = 'flex' === layoutDisplay;
  const isGridLayout = 'grid' === layoutDisplay;

  // Configure content wrapper class based on layout display.
  let contentWrapperClass;
  if (isFlexLayout) {
    contentWrapperClass = 'et_pb_posts et_flex_module';
  } else if (isGridLayout) {
    contentWrapperClass = 'et_pb_posts et_grid_module';
  } else {
    contentWrapperClass = 'et_pb_posts et_block_module';
  }

  // Build props object conditionally to avoid prop spreading.
  const contentWrapperProps: Record<string, unknown> = {
    className: contentWrapperClass,
    ref: postsWrapRef,
  };

  return (
    <div className="et_pb_ajax_pagination_container">
      {createElement(
        'div',
        contentWrapperProps,
        <React.Fragment>
          <Posts
            headingLevel={headingLevel}
            overlayIcon={overlayIcon}
            moduleId={moduleId}
            posts={posts}
            showOverlay={showOverlay}
            showReadMore={showReadMore}
            showThumbnail={showThumbnail}
            showThumbnailWithWrapper
            showAuthor={showAuthor}
            showDate={showDate}
            showCategories={showCategories}
            showComments={showComments}
            elements={elements}
          />
          {childrenIds && childrenIds.length > 0 && (
            <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} />
          )}
        </React.Fragment>,
      )}
      {renderPagination()}
    </div>
  );
};

export { PostFeed };
