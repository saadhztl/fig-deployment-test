type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

export interface IPublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface IFile {
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
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details: IPublishDetails;
}

export interface ILink {
  title: string;
  href: string;
}

export interface ITaxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export type ITaxonomyEntry = ITaxonomy & { term_uid: string };

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}
export type CSLPFieldMapping = CSLPAttribute | string;

export interface ISystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: IPublishDetails;
  title?: string;
}

export interface IStyledSingleLineText {
  _version?: number;
  text?: string;
  styling_options?: {
    font_style?:
      | (
          | "font-rawson"
          | "font-softcore-black"
          | "font-matty-sans"
          | "font-dead-stock"
        )
      | null;
    font_weight?:
      | (
          | "font-extralight"
          | "font-light"
          | "font-normal"
          | "font-medium"
          | "font-semibold"
          | "font-bold"
          | "font-extrabold"
          | "font-black"
        )
      | null;
    font_size?:
      | (
          | "text-lg md:text-xl"
          | "text-lg md:text-2xl"
          | "text-lg md:text-2xl lg:text-[28px]"
          | "text-xl md:text-2xl lg:text-[32px]"
          | "text-xl md:text-2xl lg:text-[36px]"
          | "text-3xl content:text-[40px]"
          | "text-2xl md:text-3xl lg:text-[44px]"
          | "text-3xl md:text-4xl lg:text-5xl"
          | "text-3xl md:text-4xl lg:text-[56px]"
          | "text-3xl md:text-4xl lg:text-6xl"
          | "text-3xl md:text-4xl lg:text-[64px]"
          | "text-4xl md:text-6xl lg:text-[80px]!"
        )
      | null;
    text_color?: IColorDropdown;
    glowing_text: boolean;
    blinking_text: boolean;
    glow_color?:
      | (
          | "cyan"
          | "green"
          | "pink"
          | "orange"
          | "soft-pink"
          | "light-cyan"
          | "green-tint"
        )
      | null;
    light_glow_css_property?: string;
    $?: {
      font_style?: CSLPFieldMapping;
      font_weight?: CSLPFieldMapping;
      font_size?: CSLPFieldMapping;
      text_color?: CSLPFieldMapping;
      glowing_text?: CSLPFieldMapping;
      blinking_text?: CSLPFieldMapping;
      glow_color?: CSLPFieldMapping;
      light_glow_css_property?: CSLPFieldMapping;
    };
  };
  $?: {
    text?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IColorDropdown {
  _version?: number;
  dropdown?:
    | (
        | "#bff300"
        | "#1bc931"
        | "#03481c"
        | "#ff4800"
        | "#ffa500"
        | "#00f1f1"
        | "#ff7da7"
        | "#000000"
        | "#fff730"
        | "#333333"
        | "#777777"
        | "#fd4a5c"
        | "#eb80a8"
        | "#a2d45e"
        | "#18988b"
        | "#592c82"
        | "#1c355e"
        | "#ffd900"
        | "#e64b38"
        | "#ffffff"
        | "#eb2f5b"
        | "#1c1c1c"
        | "#08c6b3"
        | "#5fcbc5"
        | "#048dca"
        | "#2b2e31"
        | "#bababa"
        | "#ECECEC"
        | "#111111"
        | "#5b5b5b"
        | "#06538c"
        | "#1e2600"
        | "#f6f9f7"
        | "#575757"
        | "transparent"
        | "#CB1947"
        | "#221414"
        | "#71D0F6"
        | "#c93392"
        | "#ffd048"
        | "#002E1C"
        | "#99ff99"
        | "#aeefff"
        | "#fccaff"
      )
    | null;
  $?: {
    dropdown?: CSLPFieldMapping;
  };
}

export interface IImageField {
  _version?: number;
  image?: IFile | null;
  image_alt_text?: string;
  height?: number | null;
  width?: number | null;
  object_fit?: ("fill" | "contain" | "cover" | "none" | "scale-down") | null;
  object_position?: ("top" | "bottom" | "left" | "right" | "center") | null;
  $?: {
    image?: CSLPFieldMapping;
    image_alt_text?: CSLPFieldMapping;
    height?: CSLPFieldMapping;
    width?: CSLPFieldMapping;
    object_fit?: CSLPFieldMapping;
    object_position?: CSLPFieldMapping;
  };
}

export interface ISpacingOptions {
  _version?: number;
  block_padding?:
    | (
        | "py-0"
        | "py-0.5"
        | "py-1"
        | "py-1.5"
        | "py-2"
        | "py-2.5"
        | "py-3"
        | "py-3.5"
        | "py-4"
        | "py-5"
        | "py-6"
        | "py-7"
        | "py-8"
        | "py-9"
        | "py-10"
        | "py-11"
        | "py-12"
        | "py-14"
        | "py-16"
        | "py-20"
      )
    | null;
  inline_padding?:
    | (
        | "px-0"
        | "px-0.5"
        | "px-1"
        | "px-1.5"
        | "px-2"
        | "px-2.5"
        | "px-3"
        | "px-3.5"
        | "px-4"
        | "px-5"
        | "px-6"
        | "px-7"
        | "px-8"
        | "px-9"
        | "px-10"
        | "px-11"
        | "px-12"
        | "px-14"
        | "px-16"
        | "px-20"
      )
    | null;
  $?: {
    block_padding?: CSLPFieldMapping;
    inline_padding?: CSLPFieldMapping;
  };
}

export interface ICallToAction {
  _version?: number;
  link?: ILink;
  open_in_new_window: boolean;
  font_awesome_icon_code?: string;
  styling_options?: {
    text_color?: IColorDropdown;
    hover_text_color?: IColorDropdown;
    background_color?: IColorDropdown;
    hover_background_color?: IColorDropdown;
    border_color?: IColorDropdown;
    hover_border_color?: IColorDropdown;
    $?: {
      text_color?: CSLPFieldMapping;
      hover_text_color?: CSLPFieldMapping;
      background_color?: CSLPFieldMapping;
      hover_background_color?: CSLPFieldMapping;
      border_color?: CSLPFieldMapping;
      hover_border_color?: CSLPFieldMapping;
    };
  };
  $?: {
    link?: CSLPFieldMapping;
    open_in_new_window?: CSLPFieldMapping;
    font_awesome_icon_code?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface ISocialMediaAccounts {
  _version?: number;
  social_media_accounts?: {
    link?: ILink;
    open_in_new_window: boolean;
    font_awesome_icon_code?: string;
    $?: {
      link?: CSLPFieldMapping;
      open_in_new_window?: CSLPFieldMapping;
      font_awesome_icon_code?: CSLPFieldMapping;
    };
  }[];
  $?: {
    social_media_accounts?: CSLPFieldMapping;
  };
}

export interface ISeo {
  _version?: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  enable_search_indexing: boolean;
  $?: {
    meta_title?: CSLPFieldMapping;
    meta_description?: CSLPFieldMapping;
    meta_keywords?: CSLPFieldMapping;
    enable_search_indexing?: CSLPFieldMapping;
  };
}

export interface ISiteLogoDetails {
  _version?: number;
  site_logo?: IImageField;
  menu_logo?: IImageField;
  $?: {
    site_logo?: CSLPFieldMapping;
    menu_logo?: CSLPFieldMapping;
  };
}

export interface IDuckpinSection extends ISystemFields {
  _version?: number;
  title: string;
  duckpin_icon_images?: {
    instance5?: IImageField;
    instance4?: IImageField;
    instance3?: IImageField;
    instance2?: IImageField;
    instance1?: IImageField;
    $?: {
      instance5?: CSLPFieldMapping;
      instance4?: CSLPFieldMapping;
      instance3?: CSLPFieldMapping;
      instance2?: CSLPFieldMapping;
      instance1?: CSLPFieldMapping;
    };
  };
  background_image?: IImageField;
  heading?: {
    heading?: IStyledSingleLineText;
    $?: {
      heading?: CSLPFieldMapping;
    };
  };
  layout?: ILayout[];
  $?: {
    title?: CSLPFieldMapping;
    duckpin_icon_images?: CSLPFieldMapping;
    background_image?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface IStatsSection extends ISystemFields {
  _version?: number;
  title: string;
  heading?: IStyledSingleLineText;
  statistics?: {
    main_stat?: string;
    description?: string;
    $?: {
      main_stat?: CSLPFieldMapping;
      description?: CSLPFieldMapping;
    };
  }[];
  styling_options?: {
    stat_text_color?: IColorDropdown;
    stat_description_color?: IColorDropdown;
    stat_stroke_color?: IColorDropdown;
    $?: {
      stat_text_color?: CSLPFieldMapping;
      stat_description_color?: CSLPFieldMapping;
      stat_stroke_color?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    statistics?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface ILayout extends ISystemFields {
  _version?: number;
  title: string;
  layout_type?: ("25/75" | "40/60" | "50/50" | "60/40" | "75/25") | null;
  left_column_items?: (
    | IVideoItem
    | IPopupCta
    | ILocationDropdown
    | IImageItem
    | IFaq
    | IContentRte
    | IContent
  )[];
  right_column_items?: (
    | IVideoItem
    | IPopupCta
    | ILocationDropdown
    | IImageItem
    | IFaq
    | IContentRte
    | IContent
  )[];
  enable_reverse_layout_for_small_screens: boolean;
  inline_navigation_id?: string;
  $?: {
    title?: CSLPFieldMapping;
    layout_type?: CSLPFieldMapping;
    left_column_items?: CSLPFieldMapping;
    right_column_items?: CSLPFieldMapping;
    enable_reverse_layout_for_small_screens?: CSLPFieldMapping;
    inline_navigation_id?: CSLPFieldMapping;
  };
}

export interface IPopupCta extends ISystemFields {
  _version?: number;
  title: string;
  cta_label?: string;
  popup_heading?: IStyledSingleLineText;
  popup_content?: string;
  cta_styling_options?: {
    text_color?: IColorDropdown;
    hover_text_color?: IColorDropdown;
    border_color?: IColorDropdown;
    hover_border_color?: IColorDropdown;
    cta_horizontal_alignment?:
      | ("justify-start" | "justify-center" | "justify-end")
      | null;
    $?: {
      text_color?: CSLPFieldMapping;
      hover_text_color?: CSLPFieldMapping;
      border_color?: CSLPFieldMapping;
      hover_border_color?: CSLPFieldMapping;
      cta_horizontal_alignment?: CSLPFieldMapping;
    };
  };
  popup_styling_options?: {
    text_color?: IColorDropdown;
    background_color?: IColorDropdown;
    border_color?: IColorDropdown;
    $?: {
      text_color?: CSLPFieldMapping;
      background_color?: CSLPFieldMapping;
      border_color?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    cta_label?: CSLPFieldMapping;
    popup_heading?: CSLPFieldMapping;
    popup_content?: CSLPFieldMapping;
    cta_styling_options?: CSLPFieldMapping;
    popup_styling_options?: CSLPFieldMapping;
  };
}

export interface ICookiePolicy extends ISystemFields {
  _version?: number;
  title: string;
  disable_cookie_policy: boolean;
  cookie_policy_content?: string;
  agree_button_text?: string;
  disagree_button_text?: string;
  $?: {
    title?: CSLPFieldMapping;
    disable_cookie_policy?: CSLPFieldMapping;
    cookie_policy_content?: CSLPFieldMapping;
    agree_button_text?: CSLPFieldMapping;
    disagree_button_text?: CSLPFieldMapping;
  };
}

export interface IUpcomingSessionCard extends ISystemFields {
  _version?: number;
  title: string;
  card_image?: IImageField;
  heading?: string;
  session_details?: {
    age_range?: string;
    date_range?: string;
    $?: {
      age_range?: CSLPFieldMapping;
      date_range?: CSLPFieldMapping;
    };
  }[];
  call_to_action?: ILink;
  $?: {
    title?: CSLPFieldMapping;
    card_image?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    session_details?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
  };
}

export interface ILocationBookingBanner extends ISystemFields {
  _version?: number;
  title: string;
  logo?: IImageField;
  animated_svg_file?: IFile | null;
  heading?: IStyledSingleLineText;
  description?: string;
  location_dropdown?: ILocationDropdown[];
  call_to_action?: {
    link?: ILink;
    opens_in_new_window: boolean;
    styling_options?: {
      text_color?: IColorDropdown;
      hover_text_color?: IColorDropdown;
      border_color?: IColorDropdown;
      $?: {
        text_color?: CSLPFieldMapping;
        hover_text_color?: CSLPFieldMapping;
        border_color?: CSLPFieldMapping;
      };
    };
    $?: {
      link?: CSLPFieldMapping;
      opens_in_new_window?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    logo?: CSLPFieldMapping;
    animated_svg_file?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    location_dropdown?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
  };
}

export interface IRteStrip extends ISystemFields {
  _version?: number;
  title: string;
  left_text_content?: string;
  right_text_content?: string;
  styling_options?: {
    text_color?: IColorDropdown;
    container_background_color?: IColorDropdown;
    spacing_options?: ISpacingOptions;
    disable_bottom_spacing: boolean;
    $?: {
      text_color?: CSLPFieldMapping;
      container_background_color?: CSLPFieldMapping;
      spacing_options?: CSLPFieldMapping;
      disable_bottom_spacing?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    left_text_content?: CSLPFieldMapping;
    right_text_content?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IEventsCard extends ISystemFields {
  _version?: number;
  title: string;
  card_heading?: string;
  card_image?: IImageField;
  call_to_action?: ILink;
  styling_options?: {
    theme_color?: IColorDropdown;
    $?: {
      theme_color?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    card_heading?: CSLPFieldMapping;
    card_image?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IMembershipContent extends ISystemFields {
  _version?: number;
  title: string;
  heading?: IStyledSingleLineText;
  sub_heading?: IStyledSingleLineText;
  background_image?: IImageField;
  content?: string;
  membership_perks?: {
    member_item_image?: IImageField;
    member_item_title?: string;
    member_item_text?: string;
    $?: {
      member_item_image?: CSLPFieldMapping;
      member_item_title?: CSLPFieldMapping;
      member_item_text?: CSLPFieldMapping;
    };
  }[];
  call_to_actions?: {
    cta?: ICallToAction;
    $?: {
      cta?: CSLPFieldMapping;
    };
  }[];
  $?: {
    title?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    sub_heading?: CSLPFieldMapping;
    background_image?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
    membership_perks?: CSLPFieldMapping;
    call_to_actions?: CSLPFieldMapping;
  };
}

export interface IInlineBanner extends ISystemFields {
  _version?: number;
  title: string;
  fullscreen_banner: boolean;
  banner_heading?: IStyledSingleLineText;
  banner_description?: string;
  banner_cta?: ICallToAction;
  styling_options?: {
    container_background_color?: IColorDropdown;
    container_text_color?: IColorDropdown;
    rounded_border_banner: boolean;
    spacing?: ISpacingOptions;
    disable_bottom_spacing: boolean;
    $?: {
      container_background_color?: CSLPFieldMapping;
      container_text_color?: CSLPFieldMapping;
      rounded_border_banner?: CSLPFieldMapping;
      spacing?: CSLPFieldMapping;
      disable_bottom_spacing?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    fullscreen_banner?: CSLPFieldMapping;
    banner_heading?: CSLPFieldMapping;
    banner_description?: CSLPFieldMapping;
    banner_cta?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IContentRte extends ISystemFields {
  _version?: number;
  title: string;
  rich_text_editor?: string;
  styling_options?: {
    disable_bottom_spacing: boolean;
    content_alignment?: ("text-start" | "text-center" | "text-end") | null;
    $?: {
      disable_bottom_spacing?: CSLPFieldMapping;
      content_alignment?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    rich_text_editor?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IIconlist extends ISystemFields {
  _version?: number;
  title: string;
  heading?: IStyledSingleLineText;
  icon_list?: {
    icon_image?: IImageField;
    icon_title?: string;
    icon_description?: string;
    $?: {
      icon_image?: CSLPFieldMapping;
      icon_title?: CSLPFieldMapping;
      icon_description?: CSLPFieldMapping;
    };
  }[];
  styling_options?: {
    text_color?: IColorDropdown;
    $?: {
      text_color?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    icon_list?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IGamesBoxCard extends ISystemFields {
  _version?: number;
  title: string;
  card_heading?: IStyledSingleLineText;
  card_sub_heading?: string;
  card_description?: string;
  card_image?: IImageField;
  card_difficulty_level?: (0 | 1 | 2 | 3) | null;
  card_characteristics?: {
    text?: string;
    $?: {
      text?: CSLPFieldMapping;
    };
  }[];
  $?: {
    title?: CSLPFieldMapping;
    card_heading?: CSLPFieldMapping;
    card_sub_heading?: CSLPFieldMapping;
    card_description?: CSLPFieldMapping;
    card_image?: CSLPFieldMapping;
    card_difficulty_level?: CSLPFieldMapping;
    card_characteristics?: CSLPFieldMapping;
  };
}

export interface IEventsDetailComponents extends ISystemFields {
  rte_strip_component: {
    reference?: IRteStrip[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  hero_banner_component: {
    hero_banner_reference?: IHeroBanner[];
    $?: {
      hero_banner_reference?: CSLPFieldMapping;
    };
  };
  single_testimonial: {
    background_image?: IImageField;
    testimonial_item?: {
      rating?: number | null;
      content?: string;
      author?: string;
      footer_note?: string;
      $?: {
        rating?: CSLPFieldMapping;
        content?: CSLPFieldMapping;
        author?: CSLPFieldMapping;
        footer_note?: CSLPFieldMapping;
      };
    };
    styling_options?: {
      theme_color?: IColorDropdown;
      disable_bottom_spacing: boolean;
      $?: {
        theme_color?: CSLPFieldMapping;
        disable_bottom_spacing?: CSLPFieldMapping;
      };
    };
    $?: {
      background_image?: CSLPFieldMapping;
      testimonial_item?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  layout: {
    layout_type?: ("25/75" | "40/60" | "50/50" | "60/40" | "75/25") | null;
    left_column_items?: (
      | IVideoItem
      | ILocationDropdown
      | IImageItem
      | IFaq
      | IContentRte
      | IContent
    )[];
    right_column_items?: (
      | IVideoItem
      | ILocationDropdown
      | IImageItem
      | IFaq
      | IContentRte
      | IContent
    )[];
    inline_navigation_id?: string;
    enable_reverse_layout_for_small_screens: boolean;
    $?: {
      layout_type?: CSLPFieldMapping;
      left_column_items?: CSLPFieldMapping;
      right_column_items?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      enable_reverse_layout_for_small_screens?: CSLPFieldMapping;
    };
  };
  content_rte_component: {
    content_rte_reference?: IContentRte[];
    $?: {
      content_rte_reference?: CSLPFieldMapping;
    };
  };
  slider_component: {
    slider_type?: ISlider[];
    $?: {
      slider_type?: CSLPFieldMapping;
    };
  };
  section: {
    section_items?: (
      | ISlider
      | ILocationDropdown
      | IImageItem
      | IIconlist
      | IFaq
      | IContentRte
      | IContent
    )[];
    styling_options?: {
      disable_section_block_padding: boolean;
      disable_section_bottom_spacing: boolean;
      container_background_color?: IColorDropdown;
      $?: {
        disable_section_block_padding?: CSLPFieldMapping;
        disable_section_bottom_spacing?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
      };
    };
    inline_navigation_id?: string;
    container_background_image?: IImageField;
    $?: {
      section_items?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      container_background_image?: CSLPFieldMapping;
    };
  };
  inline_banner_component: {
    reference?: IInlineBanner[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  events_list: {
    heading?: IStyledSingleLineText;
    reference?: IEventsCard[];
    cards_per_column?:
      | (
          | "grid-cols-1"
          | "grid-cols-1 md:grid-cols-2"
          | "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          | "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )
      | null;
    $?: {
      heading?: CSLPFieldMapping;
      reference?: CSLPFieldMapping;
      cards_per_column?: CSLPFieldMapping;
    };
  };
  testimonials: {
    heading?: IStyledSingleLineText;
    testimonial_item?: {
      rating?: number | null;
      content?: string;
      author?: string;
      $?: {
        rating?: CSLPFieldMapping;
        content?: CSLPFieldMapping;
        author?: CSLPFieldMapping;
      };
    }[];
    call_to_actions?: {
      cta?: ICallToAction;
      $?: {
        cta?: CSLPFieldMapping;
      };
    }[];
    $?: {
      heading?: CSLPFieldMapping;
      testimonial_item?: CSLPFieldMapping;
      call_to_actions?: CSLPFieldMapping;
    };
  };
  horizontal_divider: {
    divider_height?: number | null;
    divider_color?: IColorDropdown;
    divider_block_top_spacing?: number | null;
    divider_block_bottom_spacing?: number | null;
    inline_navigation_id?: string;
    $?: {
      divider_height?: CSLPFieldMapping;
      divider_color?: CSLPFieldMapping;
      divider_block_top_spacing?: CSLPFieldMapping;
      divider_block_bottom_spacing?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
    };
  };
  box_cards: {
    reference?: IBoxCardList[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
}

export interface IEventsDetailPage extends ISystemFields {
  _version?: number;
  title: string;
  url: string;
  events_detail_components?: IEventsDetailComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    events_detail_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface IEventsLandingComponents extends ISystemFields {
  hero_banner_component: {
    hero_banner_reference?: IHeroBanner[];
    $?: {
      hero_banner_reference?: CSLPFieldMapping;
    };
  };
  content_rte_component: {
    content_rte_reference?: IContentRte[];
    $?: {
      content_rte_reference?: CSLPFieldMapping;
    };
  };
  layout: {
    layout_type?: ("25/75" | "40/60" | "50/50" | "60/40" | "75/25") | null;
    left_column_items?: (IVideoItem | IImageItem | IFaq | IContent)[];
    right_column_items?: (IVideoItem | IImageItem | IFaq | IContent)[];
    inline_navigation_id?: string;
    enable_reverse_layout_for_small_screens: boolean;
    $?: {
      layout_type?: CSLPFieldMapping;
      left_column_items?: CSLPFieldMapping;
      right_column_items?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      enable_reverse_layout_for_small_screens?: CSLPFieldMapping;
    };
  };
  testimonials: {
    heading?: IStyledSingleLineText;
    testimonial_item?: {
      rating?: number | null;
      content?: string;
      author?: string;
      $?: {
        rating?: CSLPFieldMapping;
        content?: CSLPFieldMapping;
        author?: CSLPFieldMapping;
      };
    }[];
    call_to_actions?: {
      cta?: ICallToAction;
      $?: {
        cta?: CSLPFieldMapping;
      };
    }[];
    $?: {
      heading?: CSLPFieldMapping;
      testimonial_item?: CSLPFieldMapping;
      call_to_actions?: CSLPFieldMapping;
    };
  };
  events_list: {
    heading?: IStyledSingleLineText;
    reference?: IEventsCard[];
    cards_per_column?:
      | (
          | "grid-cols-1"
          | "grid-cols-1 md:grid-cols-2"
          | "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          | "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )
      | null;
    $?: {
      heading?: CSLPFieldMapping;
      reference?: CSLPFieldMapping;
      cards_per_column?: CSLPFieldMapping;
    };
  };
  horizontal_divider: {
    divider_height?: number | null;
    divider_color?: IColorDropdown;
    divider_block_top_spacing?: number | null;
    divider_block_bottom_spacing?: number | null;
    inline_navigation_id?: string;
    $?: {
      divider_height?: CSLPFieldMapping;
      divider_color?: CSLPFieldMapping;
      divider_block_top_spacing?: CSLPFieldMapping;
      divider_block_bottom_spacing?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
    };
  };
  section: {
    section_items?: (
      | ISlider
      | ILocationDropdown
      | IInlineBanner
      | IIconlist
      | IForm
      | IContentRte
      | IContent
    )[];
    styling_options?: {
      disable_section_block_padding: boolean;
      disable_section_bottom_spacing: boolean;
      container_background_color?: IColorDropdown;
      $?: {
        disable_section_block_padding?: CSLPFieldMapping;
        disable_section_bottom_spacing?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
      };
    };
    inline_navigation_id?: string;
    container_background_image?: IImageField;
    $?: {
      section_items?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      container_background_image?: CSLPFieldMapping;
    };
  };
  inline_banner_component: {
    reference?: IInlineBanner[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  video_banner: {
    video_file?: IFile | null;
    main_logo_animation_json?: IFile | null;
    bottom_logo_animation_json?: IFile | null;
    fullscreen_banner: boolean;
    video_player_options?: {
      autoplay_video: boolean;
      video_controls: boolean;
      looped_video: boolean;
      muted_video: boolean;
      video_preload?: ("auto" | "metada" | "none") | null;
      video_poster?: IImageField;
      $?: {
        autoplay_video?: CSLPFieldMapping;
        video_controls?: CSLPFieldMapping;
        looped_video?: CSLPFieldMapping;
        muted_video?: CSLPFieldMapping;
        video_preload?: CSLPFieldMapping;
        video_poster?: CSLPFieldMapping;
      };
    };
    styling_options?: {
      border_color?: IColorDropdown;
      background_color?: IColorDropdown;
      $?: {
        border_color?: CSLPFieldMapping;
        background_color?: CSLPFieldMapping;
      };
    };
    $?: {
      video_file?: CSLPFieldMapping;
      main_logo_animation_json?: CSLPFieldMapping;
      bottom_logo_animation_json?: CSLPFieldMapping;
      fullscreen_banner?: CSLPFieldMapping;
      video_player_options?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
}

export interface IEventsLandingPage extends ISystemFields {
  _version?: number;
  title: string;
  url: string;
  events_landing_components?: IEventsLandingComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    events_landing_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface ILocationDropdown extends ISystemFields {
  _version?: number;
  title: string;
  dropdown_label?: string;
  location_url_type?:
    | (
        | "location_url"
        | "location_simulator_url"
        | "location_league_url"
        | "location_events_inquiry_url"
        | "location_lesson_url"
        | "location_calender_url"
        | "location_internal_page_url"
        | "mindbody_popup"
      )
    | null;
  reference?: ILocationEntity[];
  styling_options?: {
    dropdown_icon_options?: {
      icon_color?: IColorDropdown;
      hover_icon_color?: IColorDropdown;
      background_color?: IColorDropdown;
      hover_background_color?: IColorDropdown;
      $?: {
        icon_color?: CSLPFieldMapping;
        hover_icon_color?: CSLPFieldMapping;
        background_color?: CSLPFieldMapping;
        hover_background_color?: CSLPFieldMapping;
      };
    };
    dropdown_list_options?: {
      text_color?: IColorDropdown;
      hover_text_color?: IColorDropdown;
      background_color?: IColorDropdown;
      hover_background_color?: IColorDropdown;
      $?: {
        text_color?: CSLPFieldMapping;
        hover_text_color?: CSLPFieldMapping;
        background_color?: CSLPFieldMapping;
        hover_background_color?: CSLPFieldMapping;
      };
    };
    dropdown_button_options?: {
      text_color?: IColorDropdown;
      hover_text_color?: IColorDropdown;
      background_color?: IColorDropdown;
      hover_background_color?: IColorDropdown;
      $?: {
        text_color?: CSLPFieldMapping;
        hover_text_color?: CSLPFieldMapping;
        background_color?: CSLPFieldMapping;
        hover_background_color?: CSLPFieldMapping;
      };
    };
    border_color?: IColorDropdown;
    dropdown_horizontal_alignment?:
      | ("justify-start" | "justify-center" | "justify-end")
      | null;
    disable_bottom_spacing: boolean;
    $?: {
      dropdown_icon_options?: CSLPFieldMapping;
      dropdown_list_options?: CSLPFieldMapping;
      dropdown_button_options?: CSLPFieldMapping;
      border_color?: CSLPFieldMapping;
      dropdown_horizontal_alignment?: CSLPFieldMapping;
      disable_bottom_spacing?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    dropdown_label?: CSLPFieldMapping;
    location_url_type?: CSLPFieldMapping;
    reference?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface ILocationsLandingComponents extends ISystemFields {
  locations_list: {
    list_title?: IStyledSingleLineText;
    no_result_found_message?: string;
    left_column_state_display_count: number;
    $?: {
      list_title?: CSLPFieldMapping;
      no_result_found_message?: CSLPFieldMapping;
      left_column_state_display_count?: CSLPFieldMapping;
    };
  };
  inline_banner: {
    banner_active: boolean;
    fullscreen_banner: boolean;
    banner_heading?: IStyledSingleLineText;
    banner_description?: string;
    banner_cta?: ICallToAction;
    styling_options?: {
      container_text_color?: IColorDropdown;
      container_background_color?: IColorDropdown;
      rounded_border_banner: boolean;
      spacing?: ISpacingOptions;
      $?: {
        container_text_color?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
        rounded_border_banner?: CSLPFieldMapping;
        spacing?: CSLPFieldMapping;
      };
    };
    $?: {
      banner_active?: CSLPFieldMapping;
      fullscreen_banner?: CSLPFieldMapping;
      banner_heading?: CSLPFieldMapping;
      banner_description?: CSLPFieldMapping;
      banner_cta?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  promo_cards_list: {
    reference?: IPromoCards[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
}

export interface ILocationsLandingPage extends ISystemFields {
  _version?: number;
  title: string;
  url: string;
  locations_landing_components?: ILocationsLandingComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    locations_landing_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface IPromosComponents extends ISystemFields {
  hero_banner_component: {
    hero_banner_reference?: IHeroBanner[];
    $?: {
      hero_banner_reference?: CSLPFieldMapping;
    };
  };
  promo_twocol_cards: {
    reference?: IPromosTwoColCard[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  promo_cards_list: {
    reference?: IPromoCards[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  inline_banner_component: {
    reference?: IInlineBanner[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
}

export interface IPromosLandingPage extends ISystemFields {
  _version?: number;
  title: string;
  url?: string;
  promos_components?: IPromosComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    promos_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface IPromosTwoColCard extends ISystemFields {
  _version?: number;
  title: string;
  promo_image?: IImageField;
  promo_title?: IStyledSingleLineText;
  promo_subtitle?: string;
  promo_content?: string;
  promo_cta?: ICallToAction;
  foot_note?: string;
  highlight_this_promo_item: boolean;
  date?: string | null;
  $?: {
    title?: CSLPFieldMapping;
    promo_image?: CSLPFieldMapping;
    promo_title?: CSLPFieldMapping;
    promo_subtitle?: CSLPFieldMapping;
    promo_content?: CSLPFieldMapping;
    promo_cta?: CSLPFieldMapping;
    foot_note?: CSLPFieldMapping;
    highlight_this_promo_item?: CSLPFieldMapping;
    date?: CSLPFieldMapping;
  };
}

export interface IFaq extends ISystemFields {
  _version?: number;
  title: string;
  heading?: IStyledSingleLineText;
  faq_list?: {
    faq_item?: {
      question?: string;
      answer?: string;
      $?: {
        question?: CSLPFieldMapping;
        answer?: CSLPFieldMapping;
      };
    }[];
    $?: {
      faq_item?: CSLPFieldMapping;
    };
  };
  allow_multiple_open_faqs: boolean;
  call_to_actions?: {
    cta?: ICallToAction[];
    $?: {
      cta?: CSLPFieldMapping;
    };
  };
  styling_options?: {
    text_color?: IColorDropdown;
    hover_text_color?: IColorDropdown;
    background_color?: IColorDropdown;
    hover_background_color?: IColorDropdown;
    border_color?: IColorDropdown;
    answer_text_color?: IColorDropdown;
    answer_background_color?: IColorDropdown;
    faq_accordion_icon_color?: IColorDropdown;
    container_background_color?: IColorDropdown;
    container_spacing_options?: ISpacingOptions;
    $?: {
      text_color?: CSLPFieldMapping;
      hover_text_color?: CSLPFieldMapping;
      background_color?: CSLPFieldMapping;
      hover_background_color?: CSLPFieldMapping;
      border_color?: CSLPFieldMapping;
      answer_text_color?: CSLPFieldMapping;
      answer_background_color?: CSLPFieldMapping;
      faq_accordion_icon_color?: CSLPFieldMapping;
      container_background_color?: CSLPFieldMapping;
      container_spacing_options?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    faq_list?: CSLPFieldMapping;
    allow_multiple_open_faqs?: CSLPFieldMapping;
    call_to_actions?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IContent extends ISystemFields {
  _version?: number;
  title: string;
  heading?: IStyledSingleLineText;
  sub_heading?: IStyledSingleLineText;
  rich_text_editor?: string;
  content_cta?: {
    cta?: ICallToAction[];
    $?: {
      cta?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    sub_heading?: CSLPFieldMapping;
    rich_text_editor?: CSLPFieldMapping;
    content_cta?: CSLPFieldMapping;
  };
}

export interface IVideoItem extends ISystemFields {
  _version?: number;
  title: string;
  iframe_content?: string;
  $?: {
    title?: CSLPFieldMapping;
    iframe_content?: CSLPFieldMapping;
  };
}

export interface IImageItem extends ISystemFields {
  _version?: number;
  title: string;
  image?: IImageField;
  styling_options?: {
    rounded_image: boolean;
    enable_image_border: boolean;
    border_color?: IColorDropdown;
    $?: {
      rounded_image?: CSLPFieldMapping;
      enable_image_border?: CSLPFieldMapping;
      border_color?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface IBoxCardList extends ISystemFields {
  _version?: number;
  title: string;
  heading?: IStyledSingleLineText;
  description?: string;
  box_cards?: {
    card_heading?: IStyledSingleLineText;
    card_sub_heading?: string;
    card_description?: string;
    card_image?: IImageField;
    card_cta?: {
      link?: ILink;
      opens_in_new_window: boolean;
      font_awesome_icon_code?: string;
      $?: {
        link?: CSLPFieldMapping;
        opens_in_new_window?: CSLPFieldMapping;
        font_awesome_icon_code?: CSLPFieldMapping;
      };
    };
    $?: {
      card_heading?: CSLPFieldMapping;
      card_sub_heading?: CSLPFieldMapping;
      card_description?: CSLPFieldMapping;
      card_image?: CSLPFieldMapping;
      card_cta?: CSLPFieldMapping;
    };
  }[];
  card_list_cta?: {
    call_to_actions?: ICallToAction;
    $?: {
      call_to_actions?: CSLPFieldMapping;
    };
  }[];
  five_box_layout: boolean;
  five_box_layout_image?: IImageField;
  $?: {
    title?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    box_cards?: CSLPFieldMapping;
    card_list_cta?: CSLPFieldMapping;
    five_box_layout?: CSLPFieldMapping;
    five_box_layout_image?: CSLPFieldMapping;
  };
}

export interface IPromoCards extends ISystemFields {
  _version?: number;
  title: string;
  card_title?: IStyledSingleLineText;
  content?: string;
  link_options?: {
    cta?: ILink;
    open_in_new_window: boolean;
    font_awesome_icon_code?: string;
    $?: {
      cta?: CSLPFieldMapping;
      open_in_new_window?: CSLPFieldMapping;
      font_awesome_icon_code?: CSLPFieldMapping;
    };
  };
  menu_image?: {
    enable_menu_image: boolean;
    menu_images?: IImageField[];
    $?: {
      enable_menu_image?: CSLPFieldMapping;
      menu_images?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    card_title?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
    link_options?: CSLPFieldMapping;
    menu_image?: CSLPFieldMapping;
  };
}

export interface ILocationEntity extends ISystemFields {
  _version?: number;
  title: string;
  location_area?: string;
  location_url?: string;
  location_simulator_url?: string;
  location_league_url?: string;
  location_events_inquiry_url?: string;
  location_lesson_url?: string;
  location_calendar_url?: string;
  location_internal_page_url?: string;
  widget_id?: string;
  widget_type?: string;
  widget_partner?: string;
  $?: {
    title?: CSLPFieldMapping;
    location_area?: CSLPFieldMapping;
    location_url?: CSLPFieldMapping;
    location_simulator_url?: CSLPFieldMapping;
    location_league_url?: CSLPFieldMapping;
    location_events_inquiry_url?: CSLPFieldMapping;
    location_lesson_url?: CSLPFieldMapping;
    location_calendar_url?: CSLPFieldMapping;
    location_internal_page_url?: CSLPFieldMapping;
    widget_id?: CSLPFieldMapping;
    widget_type?: CSLPFieldMapping;
    widget_partner?: CSLPFieldMapping;
  };
}

export interface IBlogDetailComponents extends ISystemFields {
  promo_cards_list: {
    reference?: IPromoCards[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
}

export interface IBlogDetailPage extends ISystemFields {
  _version?: number;
  title: string;
  url: string;
  disable_blog: boolean;
  taxonomies?: ITaxonomy | ITaxonomyEntry[];
  blog_data?: {
    date?: string | null;
    featured_image?: IImageField;
    content?: string;
    content_part_2?: string;
    blog_detail_hero_banner_image?: IImageField;
    content_banner?: {
      enable_content_banner: boolean;
      banner_intro_text?: string;
      banner_title?: string;
      banner_description?: string;
      banner_button?: ICallToAction;
      banner_styling_options?: {
        intro_color?: IColorDropdown;
        text_color?: IColorDropdown;
        background_color?: IColorDropdown;
        $?: {
          intro_color?: CSLPFieldMapping;
          text_color?: CSLPFieldMapping;
          background_color?: CSLPFieldMapping;
        };
      };
      $?: {
        enable_content_banner?: CSLPFieldMapping;
        banner_intro_text?: CSLPFieldMapping;
        banner_title?: CSLPFieldMapping;
        banner_description?: CSLPFieldMapping;
        banner_button?: CSLPFieldMapping;
        banner_styling_options?: CSLPFieldMapping;
      };
    };
    author_details?: {
      author_name?: string;
      author_image?: IImageField;
      $?: {
        author_name?: CSLPFieldMapping;
        author_image?: CSLPFieldMapping;
      };
    };
    social_media_accounts?: ISocialMediaAccounts;
    $?: {
      date?: CSLPFieldMapping;
      featured_image?: CSLPFieldMapping;
      content?: CSLPFieldMapping;
      content_part_2?: CSLPFieldMapping;
      blog_detail_hero_banner_image?: CSLPFieldMapping;
      content_banner?: CSLPFieldMapping;
      author_details?: CSLPFieldMapping;
      social_media_accounts?: CSLPFieldMapping;
    };
  };
  blog_detail_components?: IBlogDetailComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    disable_blog?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    blog_data?: CSLPFieldMapping;
    blog_detail_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface ILocationComponents extends ISystemFields {
  testimonials: {
    heading?: IStyledSingleLineText;
    testimonial_item?: {
      rating?: number | null;
      content?: string;
      author?: string;
      $?: {
        rating?: CSLPFieldMapping;
        content?: CSLPFieldMapping;
        author?: CSLPFieldMapping;
      };
    }[];
    call_to_actions?: {
      cta?: ICallToAction;
      $?: {
        cta?: CSLPFieldMapping;
      };
    }[];
    $?: {
      heading?: CSLPFieldMapping;
      testimonial_item?: CSLPFieldMapping;
      call_to_actions?: CSLPFieldMapping;
    };
  };
  coaches: {
    head_title?: string;
    coaches?: ICoach[];
    cta_1?: ILink;
    cta_2?: ILink;
    $?: {
      head_title?: CSLPFieldMapping;
      coaches?: CSLPFieldMapping;
      cta_1?: CSLPFieldMapping;
      cta_2?: CSLPFieldMapping;
    };
  };
  location_hero_banner: {
    banner_title?: string;
    banner_sub_title?: string;
    hero_image?: IImageField;
    rich_text_editor?: string;
    address_location?: ILink;
    address_zipcode?: ILink;
    phone?: string;
    email?: string;
    sms?: string;
    floor_plan?: {
      enable_floorplan: boolean;
      floor_plan_image?: IImageField;
      $?: {
        enable_floorplan?: CSLPFieldMapping;
        floor_plan_image?: CSLPFieldMapping;
      };
    };
    parking_info?: {
      enable_parking_info: boolean;
      parking_info_text?: string;
      $?: {
        enable_parking_info?: CSLPFieldMapping;
        parking_info_text?: CSLPFieldMapping;
      };
    };
    styling_options?: {
      spacing?: ISpacingOptions;
      disable_bottom_spacing: boolean;
      $?: {
        spacing?: CSLPFieldMapping;
        disable_bottom_spacing?: CSLPFieldMapping;
      };
    };
    $?: {
      banner_title?: CSLPFieldMapping;
      banner_sub_title?: CSLPFieldMapping;
      hero_image?: CSLPFieldMapping;
      rich_text_editor?: CSLPFieldMapping;
      address_location?: CSLPFieldMapping;
      address_zipcode?: CSLPFieldMapping;
      phone?: CSLPFieldMapping;
      email?: CSLPFieldMapping;
      sms?: CSLPFieldMapping;
      floor_plan?: CSLPFieldMapping;
      parking_info?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  contact_information: {
    contact_background_image?: IImageField;
    adress_location?: string;
    zip_code?: string;
    google_charts_tab_name?: string;
    url_map?: ILink;
    show_parking_info: boolean;
    parking_address_free?: string;
    day_1?: string;
    hour_1?: string;
    day_2?: string;
    hour_2?: string;
    day_3?: string;
    hour_3?: string;
    day_4?: string;
    hour_4?: string;
    day_5?: string;
    hour_5?: string;
    day_6?: string;
    hour_6?: string;
    horario_fm?: string;
    horario_sunday_fm?: string;
    styling_options?: {
      disable_bottom_spacing: boolean;
      $?: {
        disable_bottom_spacing?: CSLPFieldMapping;
      };
    };
    $?: {
      contact_background_image?: CSLPFieldMapping;
      adress_location?: CSLPFieldMapping;
      zip_code?: CSLPFieldMapping;
      google_charts_tab_name?: CSLPFieldMapping;
      url_map?: CSLPFieldMapping;
      show_parking_info?: CSLPFieldMapping;
      parking_address_free?: CSLPFieldMapping;
      day_1?: CSLPFieldMapping;
      hour_1?: CSLPFieldMapping;
      day_2?: CSLPFieldMapping;
      hour_2?: CSLPFieldMapping;
      day_3?: CSLPFieldMapping;
      hour_3?: CSLPFieldMapping;
      day_4?: CSLPFieldMapping;
      hour_4?: CSLPFieldMapping;
      day_5?: CSLPFieldMapping;
      hour_5?: CSLPFieldMapping;
      day_6?: CSLPFieldMapping;
      hour_6?: CSLPFieldMapping;
      horario_fm?: CSLPFieldMapping;
      horario_sunday_fm?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  inline_banner: {
    fullscreen_banner: boolean;
    banner_heading?: IStyledSingleLineText;
    banner_description?: string;
    banner_cta?: ICallToAction;
    styling_options?: {
      container_text_color?: IColorDropdown;
      container_background_color?: IColorDropdown;
      rounded_border_banner: boolean;
      spacing?: ISpacingOptions;
      disable_bottom_spacing: boolean;
      $?: {
        container_text_color?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
        rounded_border_banner?: CSLPFieldMapping;
        spacing?: CSLPFieldMapping;
        disable_bottom_spacing?: CSLPFieldMapping;
      };
    };
    $?: {
      fullscreen_banner?: CSLPFieldMapping;
      banner_heading?: CSLPFieldMapping;
      banner_description?: CSLPFieldMapping;
      banner_cta?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  duckpin_bowling: {
    enable_duckpin_bowling: boolean;
    duckpin_bowling_link?: ILink;
    description_duckpin_bowling?: string;
    cta_1_duckpin_bowling?: ILink;
    cta_2_duckpin_bowling?: ILink;
    show_learn_more: boolean;
    learn_more_link?: ILink;
    color_theme?:
      | (
          | "cyan-#00f1f1"
          | "green-#bff300"
          | "pink-#ff7da7"
          | "orange-#ffa500"
          | "yellow-#fff730"
        )
      | null;
    $?: {
      enable_duckpin_bowling?: CSLPFieldMapping;
      duckpin_bowling_link?: CSLPFieldMapping;
      description_duckpin_bowling?: CSLPFieldMapping;
      cta_1_duckpin_bowling?: CSLPFieldMapping;
      cta_2_duckpin_bowling?: CSLPFieldMapping;
      show_learn_more?: CSLPFieldMapping;
      learn_more_link?: CSLPFieldMapping;
      color_theme?: CSLPFieldMapping;
    };
  };
  free_parking: {
    activate_free_parking: boolean;
    title_parking?: string;
    parking_image?: IImageField;
    parking_description?: string;
    parking_logo?: IImageField;
    $?: {
      activate_free_parking?: CSLPFieldMapping;
      title_parking?: CSLPFieldMapping;
      parking_image?: CSLPFieldMapping;
      parking_description?: CSLPFieldMapping;
      parking_logo?: CSLPFieldMapping;
    };
  };
  slider_component: {
    slider_type?: ISlider[];
    $?: {
      slider_type?: CSLPFieldMapping;
    };
  };
  multisport: {
    activate_multisport_section: boolean;
    title_banner_games?: {
      title_header?: string;
      $?: {
        title_header?: CSLPFieldMapping;
      };
    };
    selection_multisport?: {
      slider_images?: {
        images?: IImageField[];
        $?: {
          images?: CSLPFieldMapping;
        };
      };
      title_section_multisport?: string;
      subtitle_multisport?: string;
      description_multisport_bold?: string;
      description_multisport_regular?: string;
      enable_mindbody_sliding_cta: boolean;
      mindbody_widget_url?: string;
      multisport_cta?: ICallToAction;
      $?: {
        slider_images?: CSLPFieldMapping;
        title_section_multisport?: CSLPFieldMapping;
        subtitle_multisport?: CSLPFieldMapping;
        description_multisport_bold?: CSLPFieldMapping;
        description_multisport_regular?: CSLPFieldMapping;
        enable_mindbody_sliding_cta?: CSLPFieldMapping;
        mindbody_widget_url?: CSLPFieldMapping;
        multisport_cta?: CSLPFieldMapping;
      };
    };
    games?: {
      game_1?: string;
      game_2?: string;
      game_3?: string;
      game_4?: string;
      game_5?: string;
      game_6?: string;
      $?: {
        game_1?: CSLPFieldMapping;
        game_2?: CSLPFieldMapping;
        game_3?: CSLPFieldMapping;
        game_4?: CSLPFieldMapping;
        game_5?: CSLPFieldMapping;
        game_6?: CSLPFieldMapping;
      };
    };
    $?: {
      activate_multisport_section?: CSLPFieldMapping;
      title_banner_games?: CSLPFieldMapping;
      selection_multisport?: CSLPFieldMapping;
      games?: CSLPFieldMapping;
    };
  };
  play_and_practice: {
    enable_play_and_practice: boolean;
    play_and_practice_link?: ILink;
    description_play_and_practice?: string;
    cta_1_play_and_practice?: ILink;
    cta_2_play_and_practice?: ILink;
    activate_cta_3: boolean;
    cta_3_play_and_practice?: ILink;
    google_charts_tab_name?: string;
    color_theme?:
      | (
          | "green-#bff300"
          | "cyan-#00f1f1"
          | "orange-#ffa500"
          | "pink-#ff7da7"
          | "yellow-#fff730"
        )
      | null;
    $?: {
      enable_play_and_practice?: CSLPFieldMapping;
      play_and_practice_link?: CSLPFieldMapping;
      description_play_and_practice?: CSLPFieldMapping;
      cta_1_play_and_practice?: CSLPFieldMapping;
      cta_2_play_and_practice?: CSLPFieldMapping;
      activate_cta_3?: CSLPFieldMapping;
      cta_3_play_and_practice?: CSLPFieldMapping;
      google_charts_tab_name?: CSLPFieldMapping;
      color_theme?: CSLPFieldMapping;
    };
  };
  golf_instruction: {
    enable_golf_instruction: boolean;
    golf_instruction_link?: ILink;
    description_golf_instruction?: string;
    cta_1_golf_instruction?: ILink;
    cta_2_golf_instruction?: ILink;
    enable_lesson_pricing: boolean;
    enable_meet_the_coaches: boolean;
    lesson_pricing?: string;
    color_theme?:
      | (
          | "green-#bff300"
          | "cyan-#00f1f1"
          | "orange-#ffa500"
          | "pink-#ff7da7"
          | "yellow-#fff730"
        )
      | null;
    $?: {
      enable_golf_instruction?: CSLPFieldMapping;
      golf_instruction_link?: CSLPFieldMapping;
      description_golf_instruction?: CSLPFieldMapping;
      cta_1_golf_instruction?: CSLPFieldMapping;
      cta_2_golf_instruction?: CSLPFieldMapping;
      enable_lesson_pricing?: CSLPFieldMapping;
      enable_meet_the_coaches?: CSLPFieldMapping;
      lesson_pricing?: CSLPFieldMapping;
      color_theme?: CSLPFieldMapping;
    };
  };
  custom_club_fitting: {
    enable_custom_club_fitting: boolean;
    custom_club_fitting_link?: ILink;
    subtitle_custom_club_fitting?: string;
    description_custom_club_fitting?: string;
    cta_1_custom_club_fitting?: ILink;
    cta_2_custom_club_fitting?: ILink;
    color_theme?:
      | (
          | "green-#bff300"
          | "cyan-#00f1f1"
          | "orange-#ffa500"
          | "pink-#ff7da7"
          | "yellow-#fff730"
        )
      | null;
    $?: {
      enable_custom_club_fitting?: CSLPFieldMapping;
      custom_club_fitting_link?: CSLPFieldMapping;
      subtitle_custom_club_fitting?: CSLPFieldMapping;
      description_custom_club_fitting?: CSLPFieldMapping;
      cta_1_custom_club_fitting?: CSLPFieldMapping;
      cta_2_custom_club_fitting?: CSLPFieldMapping;
      color_theme?: CSLPFieldMapping;
    };
  };
  make_it_a_party: {
    enable_make_it_a_party: boolean;
    make_it_a_party_link?: ILink;
    subtitle_make_it_a_party?: string;
    description_make_it_a_party?: string;
    cta_1_make_it_a_party?: ILink;
    cta_2_make_it_a_party?: ILink;
    color_theme?:
      | (
          | "green-#bff300"
          | "cyan-#00f1f1"
          | "orange-#ffa500"
          | "pink-#ff7da7"
          | "yellow-#fff730"
        )
      | null;
    $?: {
      enable_make_it_a_party?: CSLPFieldMapping;
      make_it_a_party_link?: CSLPFieldMapping;
      subtitle_make_it_a_party?: CSLPFieldMapping;
      description_make_it_a_party?: CSLPFieldMapping;
      cta_1_make_it_a_party?: CSLPFieldMapping;
      cta_2_make_it_a_party?: CSLPFieldMapping;
      color_theme?: CSLPFieldMapping;
    };
  };
  promo_cards_list: {
    reference?: IPromoCards[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  form_wrapper: {
    reference?: IForm[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  membership_section: {
    enable_membership_section: boolean;
    section_background_image?: IImageField;
    founding_member?: {
      title_founding_member_box?: string;
      subtitle_founding_member_box?: string;
      founding_member_description?: string;
      no_initiation_fee?: string;
      founding_member_monthly_value?: string;
      founding_member_fm_offer?: string;
      $?: {
        title_founding_member_box?: CSLPFieldMapping;
        subtitle_founding_member_box?: CSLPFieldMapping;
        founding_member_description?: CSLPFieldMapping;
        no_initiation_fee?: CSLPFieldMapping;
        founding_member_monthly_value?: CSLPFieldMapping;
        founding_member_fm_offer?: CSLPFieldMapping;
      };
    };
    membership_perks?: {
      member_item_image?: IImageField;
      member_item_title?: string;
      member_item_text?: string;
      $?: {
        member_item_image?: CSLPFieldMapping;
        member_item_title?: CSLPFieldMapping;
        member_item_text?: CSLPFieldMapping;
      };
    }[];
    location_membership_form?: IForm[];
    buttons_founding_member?: {
      member_cta_1?: ICallToAction;
      member_cta_2?: ICallToAction;
      $?: {
        member_cta_1?: CSLPFieldMapping;
        member_cta_2?: CSLPFieldMapping;
      };
    };
    $?: {
      enable_membership_section?: CSLPFieldMapping;
      section_background_image?: CSLPFieldMapping;
      founding_member?: CSLPFieldMapping;
      membership_perks?: CSLPFieldMapping;
      location_membership_form?: CSLPFieldMapping;
      buttons_founding_member?: CSLPFieldMapping;
    };
  };
  coming_soon: {
    coming_soon_text?: string;
    $?: {
      coming_soon_text?: CSLPFieldMapping;
    };
  };
  section: {
    section_items?: (ISlider | ILocationDropdown | IIconlist | IContentRte)[];
    styling_options?: {
      disable_section_block_padding: boolean;
      disable_section_bottom_spacing: boolean;
      container_background_color?: IColorDropdown;
      $?: {
        disable_section_block_padding?: CSLPFieldMapping;
        disable_section_bottom_spacing?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
      };
    };
    inline_navigation_id?: string;
    container_background_image?: IImageField;
    $?: {
      section_items?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      container_background_image?: CSLPFieldMapping;
    };
  };
  horizontal_divider: {
    divider_height?: number | null;
    divider_color?: IColorDropdown;
    divider_block_top_spacing?: number | null;
    divider_block_bottom_spacing?: number | null;
    inline_navigation_id?: string;
    $?: {
      divider_height?: CSLPFieldMapping;
      divider_color?: CSLPFieldMapping;
      divider_block_top_spacing?: CSLPFieldMapping;
      divider_block_bottom_spacing?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
    };
  };
  layout: {
    layout_type?: ("25/75" | "40/60" | "50/50" | "60/40" | "75/25") | null;
    left_column_items?: (
      | IVideoItem
      | IPopupCta
      | ILocationDropdown
      | IImageItem
      | IFaq
      | IContentRte
      | IContent
    )[];
    right_column_items?: (
      | IVideoItem
      | IPopupCta
      | ILocationDropdown
      | IImageItem
      | IFaq
      | IContentRte
      | IContent
    )[];
    inline_navigation_id?: string;
    enable_reverse_layout_for_small_screens: boolean;
    $?: {
      layout_type?: CSLPFieldMapping;
      left_column_items?: CSLPFieldMapping;
      right_column_items?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      enable_reverse_layout_for_small_screens?: CSLPFieldMapping;
    };
  };
  box_cards: {
    reference?: IBoxCardList[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  single_rte_strip: {
    rte_content?: string;
    styling_options?: {
      text_color?: IColorDropdown;
      container_background_color?: IColorDropdown;
      spacing_options?: ISpacingOptions;
      $?: {
        text_color?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
        spacing_options?: CSLPFieldMapping;
      };
    };
    $?: {
      rte_content?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  duckpin_bowling_section: {
    layout?: ILayout[];
    heading?: IStyledSingleLineText;
    duckpin_icon_images?: {
      icon_image?: IImageField;
      $?: {
        icon_image?: CSLPFieldMapping;
      };
    }[];
    background_image?: IImageField;
    $?: {
      layout?: CSLPFieldMapping;
      heading?: CSLPFieldMapping;
      duckpin_icon_images?: CSLPFieldMapping;
      background_image?: CSLPFieldMapping;
    };
  };
}

export interface ILocationDetailPage extends ISystemFields {
  _version?: number;
  title: string;
  url?: string;
  enable_coming_soon: boolean;
  location_states?:
    | (
        | "Connecticut"
        | "District of Columbia"
        | "Florida"
        | "Georgia"
        | "Illinois"
        | "Indiana"
        | "Kentucky"
        | "Maryland"
        | "Massachusetts"
        | "Michigan"
        | "Minnesota"
        | "Missouri"
        | "Nevada"
        | "New York"
        | "Ohio"
        | "Oklahoma"
        | "Pennsylvania"
        | "Tennessee"
        | "Texas"
        | "Washington"
      )
    | null;
  location_city?: string;
  location_neighbourhood?: string;
  location_components?: ILocationComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    enable_coming_soon?: CSLPFieldMapping;
    location_states?: CSLPFieldMapping;
    location_city?: CSLPFieldMapping;
    location_neighbourhood?: CSLPFieldMapping;
    location_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface IHeroBanner extends ISystemFields {
  _version?: number;
  title: string;
  background_image?: IImageField;
  top_logo?: IImageField;
  bottom_logo?: IImageField;
  top_rich_text?: string;
  top_text?: string;
  heading?: IStyledSingleLineText;
  bottom_text?: string;
  bottom_rich_text?: string;
  stroke_image?: IImageField;
  banner_call_to_actions?: {
    call_to_actions?: ICallToAction[];
    $?: {
      call_to_actions?: CSLPFieldMapping;
    };
  };
  call_to_action_with_background_image?: {
    link?: ILink;
    background_image?: IImageField;
    $?: {
      link?: CSLPFieldMapping;
      background_image?: CSLPFieldMapping;
    };
  }[];
  video_call_to_action?: {
    call_to_action?: ICallToAction;
    video_iframe_embed?: string;
    $?: {
      call_to_action?: CSLPFieldMapping;
      video_iframe_embed?: CSLPFieldMapping;
    };
  }[];
  styling_options?: {
    bottom_strip: boolean;
    strip_color?: IColorDropdown;
    content_alignment?: ("left50" | "right50" | "center") | null;
    disable_bottom_spacing: boolean;
    $?: {
      bottom_strip?: CSLPFieldMapping;
      strip_color?: CSLPFieldMapping;
      content_alignment?: CSLPFieldMapping;
      disable_bottom_spacing?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    background_image?: CSLPFieldMapping;
    top_logo?: CSLPFieldMapping;
    bottom_logo?: CSLPFieldMapping;
    top_rich_text?: CSLPFieldMapping;
    top_text?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    bottom_text?: CSLPFieldMapping;
    bottom_rich_text?: CSLPFieldMapping;
    stroke_image?: CSLPFieldMapping;
    banner_call_to_actions?: CSLPFieldMapping;
    call_to_action_with_background_image?: CSLPFieldMapping;
    video_call_to_action?: CSLPFieldMapping;
    styling_options?: CSLPFieldMapping;
  };
}

export interface ICoach extends ISystemFields {
  _version?: number;
  title: string;
  display_name?: string;
  content?: string;
  taxonomies?: ITaxonomy | ITaxonomyEntry[];
  featured_image?: IImageField;
  book_link?: ICallToAction;
  certification_badgets?: IImageField[];
  $?: {
    title?: CSLPFieldMapping;
    display_name?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    featured_image?: CSLPFieldMapping;
    book_link?: CSLPFieldMapping;
    certification_badgets?: CSLPFieldMapping;
  };
}

export interface IDictionaryItems extends ISystemFields {
  _version?: number;
  title: string;
  all_text?: string;
  apply_now_text?: string;
  back_to_blog_text?: string;
  benefit_hours_text?: string;
  careers_detail_page_banner_image?: IImageField;
  description_text?: string;
  difficulty_label?: string;
  floor_plan_label?: string;
  go_back_to_careers_text?: string;
  hours_text?: string;
  job_types_text?: string;
  lesson_pricing_label?: string;
  location_text?: string;
  meet_the_coaches_text?: string;
  membership_text?: string;
  no_results_found_label?: string;
  parking_available_text?: string;
  please_select_text?: string;
  salary_description_text?: string;
  search_by_keywords_text?: string;
  search_button_text?: string;
  see_map_text?: string;
  share_this_post_text?: string;
  sim_rental_pricing_label?: string;
  see_more_text?: string;
  thanks_for_signing_up_label?: string;
  no_jobs_found_label?: string;
  $?: {
    title?: CSLPFieldMapping;
    all_text?: CSLPFieldMapping;
    apply_now_text?: CSLPFieldMapping;
    back_to_blog_text?: CSLPFieldMapping;
    benefit_hours_text?: CSLPFieldMapping;
    careers_detail_page_banner_image?: CSLPFieldMapping;
    description_text?: CSLPFieldMapping;
    difficulty_label?: CSLPFieldMapping;
    floor_plan_label?: CSLPFieldMapping;
    go_back_to_careers_text?: CSLPFieldMapping;
    hours_text?: CSLPFieldMapping;
    job_types_text?: CSLPFieldMapping;
    lesson_pricing_label?: CSLPFieldMapping;
    location_text?: CSLPFieldMapping;
    meet_the_coaches_text?: CSLPFieldMapping;
    membership_text?: CSLPFieldMapping;
    no_results_found_label?: CSLPFieldMapping;
    parking_available_text?: CSLPFieldMapping;
    please_select_text?: CSLPFieldMapping;
    salary_description_text?: CSLPFieldMapping;
    search_by_keywords_text?: CSLPFieldMapping;
    search_button_text?: CSLPFieldMapping;
    see_map_text?: CSLPFieldMapping;
    share_this_post_text?: CSLPFieldMapping;
    sim_rental_pricing_label?: CSLPFieldMapping;
    see_more_text?: CSLPFieldMapping;
    thanks_for_signing_up_label?: CSLPFieldMapping;
    no_jobs_found_label?: CSLPFieldMapping;
  };
}

export interface ISlider extends ISystemFields {
  _version?: number;
  title: string;
  slider_images?: {
    image?: IImageField[];
    $?: {
      image?: CSLPFieldMapping;
    };
  };
  slider_type: "Gallery Slider" | "Auto play Slider" | "Infinite Slider";
  autoplay_sliding_duration?: number | null;
  fullwidth_slider: boolean;
  heading?: IStyledSingleLineText;
  top_content?: string;
  bottom_content?: string;
  keep_gap_between_images: boolean;
  slider_styling_options?: {
    default_slides_per_view?: number | null;
    mobile_slides_per_view?: number | null;
    tablet_slides_per_view?: number | null;
    desktop_slides_per_view?: number | null;
    autoplay_delay?: number | null;
    slider_height?: number | null;
    $?: {
      default_slides_per_view?: CSLPFieldMapping;
      mobile_slides_per_view?: CSLPFieldMapping;
      tablet_slides_per_view?: CSLPFieldMapping;
      desktop_slides_per_view?: CSLPFieldMapping;
      autoplay_delay?: CSLPFieldMapping;
      slider_height?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    slider_images?: CSLPFieldMapping;
    slider_type?: CSLPFieldMapping;
    autoplay_sliding_duration?: CSLPFieldMapping;
    fullwidth_slider?: CSLPFieldMapping;
    heading?: CSLPFieldMapping;
    top_content?: CSLPFieldMapping;
    bottom_content?: CSLPFieldMapping;
    keep_gap_between_images?: CSLPFieldMapping;
    slider_styling_options?: CSLPFieldMapping;
  };
}

export interface IFields extends ISystemFields {
  input: {
    name: string;
    label?: string;
    placeholder_text?: string;
    validation?: string;
    required: boolean;
    input_type?:
      | ("text" | "password" | "number" | "email" | "tel" | "hidden" | "date")
      | null;
    value?: string;
    $?: {
      name?: CSLPFieldMapping;
      label?: CSLPFieldMapping;
      placeholder_text?: CSLPFieldMapping;
      validation?: CSLPFieldMapping;
      required?: CSLPFieldMapping;
      input_type?: CSLPFieldMapping;
      value?: CSLPFieldMapping;
    };
  };
  text_area: {
    name: string;
    label?: string;
    palceholder_text?: string;
    required: boolean;
    max_length?: number | null;
    $?: {
      name?: CSLPFieldMapping;
      label?: CSLPFieldMapping;
      palceholder_text?: CSLPFieldMapping;
      required?: CSLPFieldMapping;
      max_length?: CSLPFieldMapping;
    };
  };
  dropdown: {
    name: string;
    label?: string;
    placeholder_text?: string;
    required: boolean;
    options_group?: {
      value: string;
      text?: string;
      $?: {
        value?: CSLPFieldMapping;
        text?: CSLPFieldMapping;
      };
    }[];
    $?: {
      name?: CSLPFieldMapping;
      label?: CSLPFieldMapping;
      placeholder_text?: CSLPFieldMapping;
      required?: CSLPFieldMapping;
      options_group?: CSLPFieldMapping;
    };
  };
  radio_checkbox: {
    name: string;
    label?: string;
    type?: ("Radio" | "Checkbox") | null;
    required: boolean;
    options_group?: {
      item_id: string;
      value: string;
      label?: string;
      checked: boolean;
      $?: {
        item_id?: CSLPFieldMapping;
        value?: CSLPFieldMapping;
        label?: CSLPFieldMapping;
        checked?: CSLPFieldMapping;
      };
    }[];
    $?: {
      name?: CSLPFieldMapping;
      label?: CSLPFieldMapping;
      type?: CSLPFieldMapping;
      required?: CSLPFieldMapping;
      options_group?: CSLPFieldMapping;
    };
  };
  locations: {
    name: string;
    label?: string;
    location_name_type?: ("Short" | "Long") | null;
    reference: ILocationEntity[];
    required: boolean;
    $?: {
      name?: CSLPFieldMapping;
      label?: CSLPFieldMapping;
      location_name_type?: CSLPFieldMapping;
      reference?: CSLPFieldMapping;
      required?: CSLPFieldMapping;
    };
  };
  disclaimer: {
    disclaimer_content?: string;
    $?: {
      disclaimer_content?: CSLPFieldMapping;
    };
  };
  submit: {
    submit_type?: ("Redirect" | "Action") | null;
    redirect_link?: ILink;
    $?: {
      submit_type?: CSLPFieldMapping;
      redirect_link?: CSLPFieldMapping;
    };
  };
}

export interface IForm extends ISystemFields {
  _version?: number;
  title: string;
  form_name:
    | "Contactus"
    | "Subscribe"
    | "Leagues"
    | "Lessons"
    | "Membership"
    | "LocationMembership"
    | "EventsInquiry";
  method?: ("post" | "get" | "dialog") | null;
  action?: ILink;
  enable_recaptcha: boolean;
  fields?: IFields[];
  $?: {
    title?: CSLPFieldMapping;
    form_name?: CSLPFieldMapping;
    method?: CSLPFieldMapping;
    action?: CSLPFieldMapping;
    enable_recaptcha?: CSLPFieldMapping;
    fields?: CSLPFieldMapping;
  };
}

export interface IFooter extends ISystemFields {
  _version?: number;
  title: string;
  site_logo_details?: ISiteLogoDetails;
  site_name?: string;
  site_tagline?: string;
  social_media?: ISocialMediaAccounts;
  footer_navigation?: {
    footer_navigation_items?: {
      link?: ILink;
      opens_in_new_window: boolean;
      $?: {
        link?: CSLPFieldMapping;
        opens_in_new_window?: CSLPFieldMapping;
      };
    }[];
    $?: {
      footer_navigation_items?: CSLPFieldMapping;
    };
  }[];
  contact_column_title?: string;
  footer_email?: ICallToAction;
  footer_call?: ICallToAction;
  copyright_text?: string;
  subscribe_form?: {
    form_title?: string;
    form_disclaimer?: string;
    form_fields?: IForm[];
    $?: {
      form_title?: CSLPFieldMapping;
      form_disclaimer?: CSLPFieldMapping;
      form_fields?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    site_logo_details?: CSLPFieldMapping;
    site_name?: CSLPFieldMapping;
    site_tagline?: CSLPFieldMapping;
    social_media?: CSLPFieldMapping;
    footer_navigation?: CSLPFieldMapping;
    contact_column_title?: CSLPFieldMapping;
    footer_email?: CSLPFieldMapping;
    footer_call?: CSLPFieldMapping;
    copyright_text?: CSLPFieldMapping;
    subscribe_form?: CSLPFieldMapping;
  };
}

export interface IComponents extends ISystemFields {
  layout: {
    layout_type?: ("25/75" | "40/60" | "50/50" | "60/40" | "75/25") | null;
    left_column_items?: (
      | IVideoItem
      | IPopupCta
      | ILocationDropdown
      | IImageItem
      | IFaq
      | IContentRte
      | IContent
    )[];
    right_column_items?: (
      | IVideoItem
      | IPopupCta
      | ILocationDropdown
      | IImageItem
      | IFaq
      | IContentRte
      | IContent
    )[];
    inline_navigation_id?: string;
    enable_reverse_layout_for_small_screens: boolean;
    $?: {
      layout_type?: CSLPFieldMapping;
      left_column_items?: CSLPFieldMapping;
      right_column_items?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      enable_reverse_layout_for_small_screens?: CSLPFieldMapping;
    };
  };
  slider_component: {
    slider_type?: ISlider[];
    $?: {
      slider_type?: CSLPFieldMapping;
    };
  };
  hero_banner_component: {
    hero_banner_reference?: IHeroBanner[];
    $?: {
      hero_banner_reference?: CSLPFieldMapping;
    };
  };
  job_list: {
    list_title?: string;
    jobs_per_page?: number | null;
    $?: {
      list_title?: CSLPFieldMapping;
      jobs_per_page?: CSLPFieldMapping;
    };
  };
  blog_list: {
    blogs?: IBlogDetailPage[];
    $?: {
      blogs?: CSLPFieldMapping;
    };
  };
  video_banner: {
    video_file?: IFile | null;
    main_logo_animation_json?: IFile | null;
    bottom_logo_animation_json?: IFile | null;
    fullscreen_banner: boolean;
    video_player_options?: {
      autoplay_video: boolean;
      video_controls: boolean;
      looped_video: boolean;
      muted_video: boolean;
      video_preload?: ("auto" | "metadata" | "none") | null;
      video_poster?: IImageField;
      $?: {
        autoplay_video?: CSLPFieldMapping;
        video_controls?: CSLPFieldMapping;
        looped_video?: CSLPFieldMapping;
        muted_video?: CSLPFieldMapping;
        video_preload?: CSLPFieldMapping;
        video_poster?: CSLPFieldMapping;
      };
    };
    styling_options?: {
      background_color?: IColorDropdown;
      border_color?: IColorDropdown;
      $?: {
        background_color?: CSLPFieldMapping;
        border_color?: CSLPFieldMapping;
      };
    };
    $?: {
      video_file?: CSLPFieldMapping;
      main_logo_animation_json?: CSLPFieldMapping;
      bottom_logo_animation_json?: CSLPFieldMapping;
      fullscreen_banner?: CSLPFieldMapping;
      video_player_options?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  strip_slider: {
    slider_text_content?: string;
    styling_options?: {
      text_color?: IColorDropdown;
      background_color?: IColorDropdown;
      $?: {
        text_color?: CSLPFieldMapping;
        background_color?: CSLPFieldMapping;
      };
    };
    $?: {
      slider_text_content?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
    };
  };
  quick_card_navigation: {
    navigation_cards?: {
      card_title?: IStyledSingleLineText;
      navigation_link?: ILink;
      $?: {
        card_title?: CSLPFieldMapping;
        navigation_link?: CSLPFieldMapping;
      };
    }[];
    $?: {
      navigation_cards?: CSLPFieldMapping;
    };
  };
  promo_cards_list: {
    reference?: IPromoCards[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  image_tiles: {
    title?: string;
    images?: IImageField[];
    $?: {
      title?: CSLPFieldMapping;
      images?: CSLPFieldMapping;
    };
  };
  box_cards: {
    reference?: IBoxCardList[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  faq_component: {
    reference?: IFaq[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  form_wrapper: {
    reference?: IForm[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  video_component: {
    reference?: IVideoItem[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  games_box_cards_list: {
    heading?: IStyledSingleLineText;
    description?: string;
    box_card_row_1?: {
      reference?: IGamesBoxCard[];
      $?: {
        reference?: CSLPFieldMapping;
      };
    };
    box_cards_row_2?: {
      reference?: IGamesBoxCard[];
      $?: {
        reference?: CSLPFieldMapping;
      };
    };
    $?: {
      heading?: CSLPFieldMapping;
      description?: CSLPFieldMapping;
      box_card_row_1?: CSLPFieldMapping;
      box_cards_row_2?: CSLPFieldMapping;
    };
  };
  section: {
    section_items?: (
      | ISlider
      | ILocationDropdown
      | ILayout
      | IInlineBanner
      | IIconlist
      | IForm
      | IContentRte
      | IContent
    )[];
    styling_options?: {
      disable_section_block_padding: boolean;
      disable_section_bottom_spacing: boolean;
      container_background_color?: IColorDropdown;
      $?: {
        disable_section_block_padding?: CSLPFieldMapping;
        disable_section_bottom_spacing?: CSLPFieldMapping;
        container_background_color?: CSLPFieldMapping;
      };
    };
    inline_navigation_id?: string;
    container_background_image?: IImageField;
    $?: {
      section_items?: CSLPFieldMapping;
      styling_options?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
      container_background_image?: CSLPFieldMapping;
    };
  };
  content_rte_component: {
    content_rte_reference?: IContentRte[];
    $?: {
      content_rte_reference?: CSLPFieldMapping;
    };
  };
  horizontal_divider: {
    divider_height?: number | null;
    divider_color?: IColorDropdown;
    divider_block_top_spacing?: number | null;
    divider_block_bottom_spacing?: number | null;
    inline_navigation_id?: string;
    $?: {
      divider_height?: CSLPFieldMapping;
      divider_color?: CSLPFieldMapping;
      divider_block_top_spacing?: CSLPFieldMapping;
      divider_block_bottom_spacing?: CSLPFieldMapping;
      inline_navigation_id?: CSLPFieldMapping;
    };
  };
  inline_banner_component: {
    reference?: IInlineBanner[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  membership_content_component: {
    reference?: IMembershipContent[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  location_booking_banner_component: {
    reference?: ILocationBookingBanner[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  rte_strip_component: {
    reference?: IRteStrip[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
  upcoming_session_card_list: {
    references?: IUpcomingSessionCard[];
    $?: {
      references?: CSLPFieldMapping;
    };
  };
  testimonials: {
    heading?: IStyledSingleLineText;
    testimonial_item?: {
      rating?: number | null;
      content?: string;
      author?: string;
      $?: {
        rating?: CSLPFieldMapping;
        content?: CSLPFieldMapping;
        author?: CSLPFieldMapping;
      };
    }[];
    call_to_actions?: {
      cta?: ICallToAction;
      $?: {
        cta?: CSLPFieldMapping;
      };
    }[];
    $?: {
      heading?: CSLPFieldMapping;
      testimonial_item?: CSLPFieldMapping;
      call_to_actions?: CSLPFieldMapping;
    };
  };
  stats_section_component: {
    reference?: IStatsSection[];
    $?: {
      reference?: CSLPFieldMapping;
    };
  };
}

export interface IPage extends ISystemFields {
  _version?: number;
  title: string;
  url?: string;
  components?: IComponents[];
  seo?: ISeo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface IHeader extends ISystemFields {
  _version?: number;
  title: string;
  activate_advertisement_strip: boolean;
  advertisement_strip?: {
    advertisement_content?: string;
    $?: {
      advertisement_content?: CSLPFieldMapping;
    };
  };
  site_logo_details?: ISiteLogoDetails;
  book_now_link?: {
    link?: ILink;
    opens_in_new_window: boolean;
    $?: {
      link?: CSLPFieldMapping;
      opens_in_new_window?: CSLPFieldMapping;
    };
  };
  menu_close_button_text?: string;
  menu_close_button_icon_code?: string;
  showcase_navigation?: {
    section_head?: {
      link?: ILink;
      opens_in_new_window: boolean;
      $?: {
        link?: CSLPFieldMapping;
        opens_in_new_window?: CSLPFieldMapping;
      };
    };
    section_children?: {
      link?: ILink;
      opens_in_new_window: boolean;
      $?: {
        link?: CSLPFieldMapping;
        opens_in_new_window?: CSLPFieldMapping;
      };
    }[];
    $?: {
      section_head?: CSLPFieldMapping;
      section_children?: CSLPFieldMapping;
    };
  }[];
  main_navigation?: {
    menu_section?: {
      section_head?: {
        link?: ILink;
        opens_in_new_window: boolean;
        $?: {
          link?: CSLPFieldMapping;
          opens_in_new_window?: CSLPFieldMapping;
        };
      };
      section_children?: {
        link?: ILink;
        opens_in_new_window: boolean;
        $?: {
          link?: CSLPFieldMapping;
          opens_in_new_window?: CSLPFieldMapping;
        };
      }[];
      $?: {
        section_head?: CSLPFieldMapping;
        section_children?: CSLPFieldMapping;
      };
    }[];
    $?: {
      menu_section?: CSLPFieldMapping;
    };
  }[];
  main_navigation_image?: IImageField;
  follow_us_text?: string;
  social_media?: ISocialMediaAccounts;
  utility_navigation?: {
    link?: ILink;
    opens_in_new_window: boolean;
    $?: {
      link?: CSLPFieldMapping;
      opens_in_new_window?: CSLPFieldMapping;
    };
  }[];
  $?: {
    title?: CSLPFieldMapping;
    activate_advertisement_strip?: CSLPFieldMapping;
    advertisement_strip?: CSLPFieldMapping;
    site_logo_details?: CSLPFieldMapping;
    book_now_link?: CSLPFieldMapping;
    menu_close_button_text?: CSLPFieldMapping;
    menu_close_button_icon_code?: CSLPFieldMapping;
    showcase_navigation?: CSLPFieldMapping;
    main_navigation?: CSLPFieldMapping;
    main_navigation_image?: CSLPFieldMapping;
    follow_us_text?: CSLPFieldMapping;
    social_media?: CSLPFieldMapping;
    utility_navigation?: CSLPFieldMapping;
  };
}
