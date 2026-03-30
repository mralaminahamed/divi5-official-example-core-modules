import React, { type ReactElement } from 'react';
import { map } from 'lodash';

import { __, sprintf } from '@wordpress/i18n';

import { type PostMetaProps } from './types';

/**
 * Post meta component for the Blog module.
 *
 * @since ??
 *
 * @param {PostMetaProps} props Post meta component props.
 *
 * @returns {ReactElement}
 */
const PostMeta = ({ post, showAuthor, showDate, showCategories, showComments }: PostMetaProps): ReactElement => {
  const postMetaElements: { key: string; element: ReactElement }[] = [];

  if (showAuthor) {
    postMetaElements.push({
      key: 'author',
      element: (
        <React.Fragment>
          {__('by ')}
          <span className="author vcard">
            <a
              href={post?.author?.link}
              title={sprintf(__('Posts by %s', 'et_builder_5'), post?.author?.name)}
              rel="author"
            >
              {post?.author?.name}
            </a>
          </span>
        </React.Fragment>
      ),
    });
  }

  if (showDate) {
    postMetaElements.push({
      key: 'date',
      element: <span className="published">{post.date}</span>,
    });
  }

  if (showCategories) {
    postMetaElements.push({
      key: 'categories',
      element: (
        <span className="entry-categories">
          {map(post.categories, (category, index) => (
            <React.Fragment key={category.link}>
              {index > 0 && ', '}
              <a href={category.link} rel="tag">
                {category.name}
              </a>
            </React.Fragment>
          ))}
        </span>
      ),
    });
  }

  if (showComments) {
    postMetaElements.push({
      key: 'comments',
      // eslint-disable-next-line react/no-danger
      element: <span dangerouslySetInnerHTML={{ __html: post.comment }} />,
    });
  }

  return (
    <React.Fragment>
      {postMetaElements.map((item, index) => (
        <React.Fragment key={item.key}>
          {index > 0 && ' | '}
          {item.element}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export { PostMeta };
