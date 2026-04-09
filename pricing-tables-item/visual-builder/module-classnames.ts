import { type ModuleClassnamesParams } from '@divi/module';
import { type PricingTableAttrs, type PricingTablesAttrs } from '@divi/types';

/**
 * Module classnames function for pricing table module.
 *
 * Note: Flex column classes are handled by the generic Module component (component.tsx).
 * This function only handles pricing-table-specific classes.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<PricingTableAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  parentAttrs,
}: ModuleClassnamesParams<PricingTableAttrs, PricingTablesAttrs>): void => {
  // Featured Table.
  const featured = attrs?.module?.advanced?.featured?.desktop?.value;

  classnamesInstance.add('et_pb_featured_table', 'on' === featured);

  // Grid column class (only needed for grid layout).
  const parentLayoutDisplay = parentAttrs?.module?.decoration?.layout?.desktop?.value?.display ?? 'flex';

  if ('grid' === parentLayoutDisplay) {
    classnamesInstance.add('et_grid_column', true);
  }
};
