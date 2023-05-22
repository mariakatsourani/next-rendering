import { NextResponse } from "next/server";
import { getJson } from "@/lib/getJson";
import type { Post } from "@/types/Post";
import { notFound } from "next/navigation";

type RouteParams = {
  params: { slug?: string };
};

// Return the requested post json for the given slug
export async function GET(request: Request, { params }: RouteParams) {
  const slug = params?.slug;

  // if there is no slug return 404
  if (!slug) {
    notFound();
  }

  let parsed;
  try {
    // Read and parse json for the requested post slug
    parsed = await getJson<Post>(slug);
  } catch (e) {
    console.error(e);
    // if something goes wrong return 404
    notFound();
  }

  return NextResponse.json({ data: parsed });
}
