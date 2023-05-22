"use client";

import { PostContent } from "@/types/Post";
import { useEffect, useState } from "react";
import Image from "next/image";

type PageParams = {
  params: {
    slug: string;
  };
};

export default function Post({ params: { slug } }: PageParams) {
  const [post, setPost] = useState<PostContent>();

  useEffect(() => {
    // get post data from the api
    async function getData() {
      const resp = await fetch(`/api/post/${slug}`);
      const json = await resp.json();
      setPost(json.data);
    }

    getData();
  }, [slug]);

  // if we don't have data yet we assume we're in a loading state
  if (!post) {
    return <p>...loading</p>;
  }

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
