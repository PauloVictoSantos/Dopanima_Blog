export interface Post {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  views?: number;
  user_id: number;
  categories?: number[];
  tags?: number[];
}
