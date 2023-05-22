export type Post = {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  summary: string;
  publishDate: string;
};

export type PostContent = {
  id: number;
  title: string;
  thumbnail: string;
  body: string;
  publishDate: string;
};
