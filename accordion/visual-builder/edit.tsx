import React, { type ReactElement, useEffect, useRef } from 'react';
import $ from 'jquery';

import { ChildModulesContainer, ModuleContainer } from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type AccordionEditProps } from './types';
import { isAccordionItem, isAccordionItemOpened, setAccordionItemOpen } from './utils';

/**
 * Accordion component of visual builder.
 *
 * @since ??
 *
 * @param {AccordionEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const AccordionEdit = ({
  attrs,
  defaultPrintedStyleAttrs,
  id,
  isFirst,
  isLast,
  name,
  childrenIds,
  elements,
  isLooped,
  loopIndex,
  canvasId,
}: AccordionEditProps): ReactElement => {
  const accordionRef = useRef<HTMLDivElement>(null);

  // On mount, set the open state of the accordion items based on the index.
  // The first item should be open by default.
  useEffect(() => {
    const accordionItems = childrenIds.filter(isAccordionItem);

    if (accordionItems.length > 0) {
      accordionItems.forEach((childId, childIndex) => {
        setAccordionItemOpen(childId, 0 === childIndex ? 'on' : 'off');
      });
    }
  }, []);

  /**
   * Manages accordion item open state and handles click events.
   * Ensures only one accordion item is open at a time,
   * opens the first item if none are open,
   * and sets up click event handling for accordion item expansion.
   *
   * @since ??
   *
   * @param {string[]} childrenIds Array of child module IDs.
   */
  useEffect(() => {
    // Handle only if there are children items.
    if (childrenIds.length > 0) {
      // Get the opened item IDs.
      const openedItemIds = childrenIds.filter(isAccordionItemOpened);

      // If there are more than one opened item, set the first item to open and close the others.
      if (openedItemIds.length > 1) {
        openedItemIds.forEach((childId, childIndex) => {
          setAccordionItemOpen(childId, 0 === childIndex ? 'on' : 'off');
        });
      }

      // If there are no opened items, set the first item to open.
      if (openedItemIds.length < 1) {
        // Find the first accordion item.
        const firstAccordionItemId = childrenIds.find(isAccordionItem);

        // If a accordion item is found, expand it and set its open state to 'on'.
        if (firstAccordionItemId && window.et_pb_accordion_item_expand) {
          window.et_pb_accordion_item_expand($(`[data-id="${firstAccordionItemId}"]`), () => {
            setAccordionItemOpen(firstAccordionItemId, 'on');
          });
        }
      }
    }

    // Handle the click event on the accordion item.
    const handleOnclick = (event: PointerEvent) => {
      const $clickedElement = $(event.target as HTMLDivElement);

      // Check if the clicked element is a toggle title.
      if ($clickedElement.hasClass('et_pb_toggle_title')) {
        const $accordionItem = $clickedElement.closest('.et_pb_accordion_item');

        // Only proceed if the accordion item exists and is not already open.
        if (
          $accordionItem.length > 0 &&
          !$accordionItem.hasClass('et_pb_toggle_open') &&
          window.et_pb_accordion_item_expand
        ) {
          window.et_pb_accordion_item_expand($accordionItem, () => {
            if (childrenIds.length > 0) {
              childrenIds.forEach(childId => {
                setAccordionItemOpen(childId, childId === $accordionItem.data('id') ? 'on' : 'off');
              });
            }
          });
        }
      }
    };

    // Add the click event listener to the accordion item.
    if (accordionRef.current) {
      accordionRef.current?.addEventListener('click', handleOnclick);
    }

    return () => {
      // Remove the click event listener from the accordion item.
      if (accordionRef.current) {
        accordionRef.current?.removeEventListener('click', handleOnclick);
      }
    };
  }, [childrenIds]);

  return (
    <ModuleContainer
      attrs={attrs}
      domRef={accordionRef}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {childrenIds && childrenIds.length > 0 && (
        <ChildModulesContainer ids={childrenIds} isLooped={isLooped} loopIndex={loopIndex} canvasId={canvasId} />
      )}
    </ModuleContainer>
  );
};

export { AccordionEdit };
