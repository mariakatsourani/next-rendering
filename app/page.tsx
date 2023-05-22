import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/Post";

// get the post data for our server component
async function getPosts() {
  const res = await fetch(`http://localhost:3000/api/posts`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const json = await res.json();
  return json.data as Post[];
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col items-center">
      <div>Latest Posts</div>
      {posts ? (
        posts.map((post) => (
          <Link
            href={post.slug}
            className="bg-white text-black rounded-md w-3/4 py-4 px-12 my-6 hover:bg-green-200  transition duration-0 hover:duration-150"
            key={post.id}
          >
            <div className="flex">
              <Image
                src={`/images/${post.thumbnail}`}
                alt={post.title}
                width={300}
                height={200}
                className="flex-none w-40 mr-6 rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="mb-1 font-bold">{post.title}</h2>
                  <p>{post.summary}</p>
                </div>
                <p className="text-xs mt-1">
                  published on{" "}
                  <span className="font-semibold">{post.publishDate}</span>
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}
