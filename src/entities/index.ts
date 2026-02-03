/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogcategories
 * Interface for BlogCategories
 */
export interface BlogCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  seoTitle?: string;
  /** @wixFieldType text */
  seoDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  categoryImage?: string;
}


/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featuredImage?: string;
  /** @wixFieldType text */
  metaDescription?: string;
  /** @wixFieldType text */
  metaKeywords?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  tags?: string;
  /** @wixFieldType text */
  readTime?: string;
}


/**
 * Collection ID: events
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  eventType?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  startTime?: any;
  /** @wixFieldType time */
  endTime?: any;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: galleryphotos
 * Interface for GalleryPhotos
 */
export interface GalleryPhotos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType date */
  dateTaken?: Date | string;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType text */
  photographerCredit?: string;
  /** @wixFieldType text */
  altText?: string;
}
