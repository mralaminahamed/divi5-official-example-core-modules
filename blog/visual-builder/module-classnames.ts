import { elementClassnames, type ModuleClassnamesParams, textOptionsClassnames } from '@divi/module';
import { type BlogAttrs } from '@divi/types';

/**
 * Module classnames function for Blog module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<BlogAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  state,
  breakpoint,
}: ModuleClassnamesParams<BlogAttrs>): void => {
  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text));

  // Add et_pb_posts class to match frontend behavior.
  // It is needed to set individual post's row width to 100%.
  classnamesInstance.add('et_pb_posts', true);

  // Determine which border attribute to use based on layout display:
  // - Grid layout: Use post.decoration.border (targets individual posts)
  // - Fullwidth/flex/block layout: Use fullwidth.decoration.border (targets posts in fullwidth mode)
  const layoutDisplay = attrs?.blogGrid?.decoration?.layout?.desktop?.value?.display ?? 'grid';
  const isGridLayout = 'grid' === layoutDisplay;
  const borderAttr = isGridLayout
    ? (attrs?.post?.decoration?.border ?? {})
    : (attrs?.fullwidth?.decoration?.border ?? {});

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: {
        ...(attrs?.module?.decoration ?? {}),
        border: borderAttr,
      },
      state,
      breakpoint,
    }),
  );
};
