import { type BlogPost, type Icon, type Module } from '@divi/types';

import { type PaginationProps } from '../pagination/types';

export interface PostFeedProps {
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  layoutDisplay?: string;
  overlayIcon: Icon.Font.AttributeValue;
  pagination: PaginationProps;
  moduleId: string;
  posts: BlogPost[];
  showOverlay: boolean;
  showPagination: boolean;
  showReadMore: boolean;
  showThumbnail: boolean;
  showAuthor: boolean;
  showDate: boolean;
  showCategories: boolean;
  showComments: boolean;
  containerClassNames?: string[];
  elements: Module.ModuleElements;
  childrenIds?: string[];
  isLooped?: boolean;
  loopIndex?: number;
}
