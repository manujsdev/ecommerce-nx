export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export type CreateProductDTO = {
  title: string;
  description?: string;
  status?: ProductStatus;
  tags?: string[];
  categoryIds?: string[];
};
