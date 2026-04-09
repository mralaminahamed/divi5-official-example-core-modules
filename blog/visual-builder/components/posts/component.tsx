import React, { Fragment, type ReactElement } from 'react';
import classNames from 'classnames';
import { includes, isEmpty } from 'lodash';

import { __ } from '@wordpress/i18n';

import { type BlogPost } from '@divi/types';

import { PostMeta } from '../post-meta/component';
import { PostThumbnail } from '../post-thumbnail/component';
import { AudioPost } from './audio-post';
import { type PostsProps } from './types';

/**
 * Renders a list of blog posts.
 *
 * @since ??
 *
 * @param {PostsProps} props The component props.
 *
 * @returns {ReactElement} The rendered blog posts.
 */
const Posts = ({
  moduleId,
  posts,
  showOverlay,
  overlayIcon,
  headingLevel,
  showThumbnail,
  showThumbnailWithWrapper,
  showReadMore,
  showAuthor,
  showDate,
  showCategories,
  showComments,
  isFullwidth,
  elements,
}: PostsProps): ReactElement => {
  const renderThumbnail = (post: BlogPost) => {
    if ('video' === post?.postFormat?.type && !isEmpty(post?.postFormat?.video)) {
      return (
        <div className="et_main_video_container">
          {!isEmpty(post?.thumbnail?.src) && (
            <div
              className="et_pb_video_overlay"
              style={{
                backgroundImage: `url(${post?.thumbnail?.src})`,
                backgroundSize: 'cover',
              }}
            >
              <div className="et_pb_video_overlay_hover">
                {/* eslint-disable */}
                <a href="#" className="et_pb_video_play" />
                {/* eslint-enable */}
              </div>
            </div>
          )}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post?.postFormat?.video }}
          />
        </div>
      );
    }

    if ('gallery' === post?.postFormat?.type && !isEmpty(post?.postFormat?.gallery)) {
      return (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post?.postFormat?.gallery }}
        />
      );
    }

    if (showThumbnail) {
      return (
        <PostThumbnail
          post={post}
          showOverlay={showOverlay}
          overlayIcon={overlayIcon}
          hasWrapper={showThumbnailWithWrapper}
          moduleId={moduleId}
        />
      );
    }

    return null;
  };

  const renderPosts = () => {
    if (!posts) {
      return null;
    }

    return posts.map((post, index) => {
      // Inject post content styles if available.
      if (post.styles && post.styles.trim()) {
        const styleId = `et-blog-post-content-${post.id}`;

        // Check if styles already injected.
        if (!document.getElementById(styleId)) {
          const styleElement = document.createElement('style');

          styleElement.id = styleId;
          styleElement.textContent = post.styles;
          document.head.appendChild(styleElement);
        }
      }

      const showTitleMetaContent =
        !isFullwidth || !includes(['link', 'audio', 'quote'], post?.postFormat?.type) || post?.isPasswordRequired;

      return (
        <article
          key={post.id}
          className={classNames(post?.classNames, {
            /* eslint-disable @typescript-eslint/naming-convention */
            et_pb_post: true,
            clearfix: true,
            et_pb_no_thumb: showThumbnail && !post?.thumbnail?.src,
            et_pb_has_overlay: showOverlay,
            [`et_pb_blog_item_${moduleId}_${index}`]: true,
            /* eslint-enable @typescript-eslint/naming-convention */
          })}
        >
          {'audio' === post?.postFormat?.type && <AudioPost post={post} />}
          {'quote' === post?.postFormat?.type && (
            <div
              className={classNames('et_quote_content', post?.postFormat?.textColorClass)}
              style={{ backgroundColor: post?.postFormat?.backgroundColor }}
            >
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: post?.postFormat?.quote }}
              />
              <a className="et_quote_main_link" href={post?.permalink}>
                {__('Read more', 'et_builder_5')}
              </a>
            </div>
          )}
          {'link' === post?.postFormat?.type && (
            <div
              className={classNames('et_link_content', post?.postFormat?.textColorClass)}
              style={{ backgroundColor: post?.postFormat?.backgroundColor }}
            >
              <h2>
                <a href={post.permalink}>{post.title}</a>
              </h2>
              <a className="et_link_main_url" href={post?.postFormat?.link}>
                {post?.postFormat?.link}
              </a>
            </div>
          )}
          {(!includes(['link', 'audio', 'quote'], post?.postFormat?.type) || post?.isPasswordRequired) &&
            renderThumbnail(post)}
          {showTitleMetaContent &&
            (!includes(['link', 'audio'], post.postFormat?.type) || post?.isPasswordRequired) &&
            elements.render({
              attrName: 'title',
              tagName: headingLevel,
              className: 'entry-title',
              skipChildren: true,
              children: <a href={post.permalink}>{post.title}</a>,
            })}
          {showTitleMetaContent &&
            elements.render({
              attrName: 'meta',
              tagName: 'p',
              className: 'post-meta',
              skipChildren: true,
              children: (
                <PostMeta
                  post={post}
                  showAuthor={showAuthor}
                  showDate={showDate}
                  showCategories={showCategories}
                  showComments={showComments}
                />
              ),
            })}
          {showTitleMetaContent &&
            elements.render({
              attrName: 'content',
              tagName: 'div',
              className: 'post-content',
              skipChildren: true,
              children: (
                <React.Fragment>
                  <div
                    className="post-content-inner"
                    // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  {showReadMore &&
                    elements.render({
                      attrName: 'readMore',
                      tagName: 'a',
                      htmlAttributes: {
                        href: post.permalink,
                      },
                      className: 'more-link',
                      skipChildren: true,
                      children: __('read more', 'et_builder_5'),
                    })}
                </React.Fragment>
              ),
            })}
        </article>
      );
    });
  };

  return <Fragment>{renderPosts()}</Fragment>;
};

export { Posts };
