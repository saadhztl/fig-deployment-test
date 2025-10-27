// Description: Type definitions for the Contentstack API

import { IColorDropdown } from './generated';

export interface IExtendedProps {
  extendedProps?: Record<string, any>;
}

// PublishDetails object - Represents the details of publish functionality
export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

// File object - Represents a file in Contentstack
export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  publish_details: PublishDetails;
  $: any;
}

// Link object - Represents a hyperlink in Contentstack
export interface Link {
  title: string;
  href: string;
}

// Taxonomy object - Represents a taxonomy in Contentstack
export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

// Block object - Represents a modular block in Contentstack
export interface Block {
  _version?: number;
  _metadata: any;
  $: any;
  title?: string;
  copy?: string;
  image?: File | null;
  layout?: ('image_left' | 'image_right') | null;
}

export interface Blocks {
  block: Block;
}

// Page object - Represents a page in Contentstack
export interface Page {
  uid: string;
  $: any;
  _version?: number;
  title: string;
  url?: string;
  components: Array<Record<string, any>>;
}

export interface Header {
  uid: string;
  _version: number;
  locale: string;
  title: string;
  logo?: File;
  ACL: any[] | object;
  _in_progress: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  language_group?: {
    language: string[];
  };
  tags: string[];
  publish_details: PublishDetails;
  $?: any;
}

export type GetEntries = {
  contentTypeUid: string;
  referencesToInclude?: string | Array<string>;
  siteName?: string;
};

export type GetEntryByUid = {
  contentTypeUid: string;
  referencesToInclude?: string | Array<string>;
  entryUid: string;
  siteName?: string;
};

export interface IReference {
  uid: string;
  _content_type_uid: string;
}
export interface References {
  references: Array<IReference>;
}

export interface JobType {
  jobId: number;
  title: string;
  companyName: string;
  applyUrl: string;
  createdUtc: string;
  publishedDate: string;
  description: string;
  displayUrl: string;
  jobLocation: {
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    metro: string;
    locationDisplayName: string;
  };
  jobCode: string;
  listUrl: string;
  requirements: string;
  salaryDescription: string;
  hiringDepartment: string;
  jobTypes: string;
  jobTypesArray: string[];
}

export type TextStylingOptions = {
  font_style?: string | null;
  font_weight?: string | null;
  font_size?: string | null;
  text_color?: IColorDropdown;
  glowing_text?: boolean;
  blinking_text?: boolean;
  glow_color?: string | null;
  light_glow_css_property?: string;
};

export type StylingOptions = {
  text_color?: IColorDropdown;
  hover_text_color?: IColorDropdown;
  background_color?: IColorDropdown;
  hover_background_color?: IColorDropdown;
  border_color?: IColorDropdown;
  hover_border_color?: IColorDropdown;
  answer_text_color?: IColorDropdown;
  answer_background_color?: IColorDropdown;
  faq_accordion_icon_color?: IColorDropdown;
  container_background_color?: IColorDropdown;
  rounded_border_banner?: boolean;
  bottom_strip?: boolean;
  strip_color?: IColorDropdown;
};

export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
