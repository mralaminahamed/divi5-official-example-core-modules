import React, { type ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { type BackgroundVideoMediaElementPlayer } from '@divi/module';
import { type BlogPost } from '@divi/types';

/**
 * Audio post component for blog module.
 * Audio post needs to be abstracted into its own component so that media element initialize
 * can be executed in accurate timing which is right after the audioHTML is rendered as DOM.
 *
 * @since ??
 *
 * @param {object} props Component props.
 * @param {BlogPost} props.post The blog post data.
 *
 * @returns {ReactElement}
 */
export const AudioPost = ({ post }: { post: BlogPost }): ReactElement => {
  const audioContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize MediaElement.js after audio HTML is rendered.
    // Use jQuery to directly initialize audio elements, matching the pattern from Divi 4.
    if (post?.postFormat?.audio && audioContainerRef.current) {
      const $audioContent = jQuery(audioContainerRef.current);
      const $audioContainer = $audioContent.find('.et_audio_container');

      // Check if MediaElement.js is available and audio container exists.
      if ($audioContainer.length > 0 && 'function' === typeof jQuery.fn.mediaelementplayer) {
        // Check if already initialized (has .mejs-container).
        if (0 === $audioContainer.find('.mejs-container').length) {
          const $audio = $audioContainer.find('audio');

          if ($audio.length > 0) {
            // Initialize with WordPress MediaElement.js settings if available.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const settings = (window as Window & { _wpmejsSettings?: unknown })._wpmejsSettings;
            if (settings) {
              // WordPress MediaElement.js settings are compatible with BackgroundVideoMediaElementPlayer.
              $audio.mediaelementplayer(settings as BackgroundVideoMediaElementPlayer);
            } else {
              $audio.mediaelementplayer();
            }
          }
        }
      }
    }
  }, [post?.postFormat?.audio]);

  return (
    <div
      ref={audioContainerRef}
      className={classNames('et_audio_content', post?.postFormat?.textColorClass)}
      style={{ backgroundColor: post?.postFormat?.backgroundColor }}
    >
      <h2>
        <a href={post.permalink}>{post.title}</a>
      </h2>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post?.postFormat?.audio }}
      />
    </div>
  );
};
