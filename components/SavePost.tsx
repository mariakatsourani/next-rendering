"use client";

import { useState } from "react";
import { HeartSvg } from "./HeartSvg";
import { isPostSaved, managePost } from "@/lib/savePost";

type SavePostProps = { postId: number };

export const SavePost = ({ postId }: SavePostProps) => {
  // to get the initial saved state for this post use isPostSaved, that does only a lookup in LS
  const [saved, setSaved] = useState(isPostSaved(postId));

  return (
    <button
      className={`flex items-center width-fit my-4 px-4 py-2 rounded-md border-2 hover:underline ${
        saved && "bg-red-500"
      }`}
      onClick={() => {
        const isSaved = managePost(postId);
        setSaved(isSaved === "saved" ? true : false);
      }}
    >
      <span className="mr-2">
        <HeartSvg />
      </span>
      <span>{saved ? "Saved" : "Save this post"}</span>
    </button>
  );
};
