import { getJson } from "@/lib/getJson";
import type { PostContent, Post } from "@/types/Post";
import Image from "next/image";

// Tell Next which dynamic routes in this case /[slug] it should generate during build
export async function generateStaticParams() {
  // get parsed posts.json
  const posts = await getJson<Post[]>("posts");

  // return an array with all post slugs
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// get the post data for our server component
async function getPost(slug: string) {
  const res = await fetch(`http://localhost:3000/api/post/${slug}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const json = await res.json();
  return json.data as PostContent;
}

type PageParams = {
  params: {
    // the slug here maps to the [slug] directory
    slug: string;
  };
};

export default async function Post({ params: { slug } }: PageParams) {
  const post = await getPost(slug);

  return (
    <article className="w-full flex flex-col items-center">
      <Image
        src={`/images/${post.thumbnail}`}
        alt={post.title}
        width={300}
        height={200}
        className="flex-none mb-6 rounded-md"
      />
      <h1 className="text-xl font-bold mb-4">{post.title}</h1>
      <p className="text-xs mb-6">
        published on <span className="font-semibold">{post.publishDate}</span>
      </p>
      <p className="w-1/2 mb-16">{post.body}</p>
    </article>
  );
}
