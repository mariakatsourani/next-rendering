import { getJson } from "@/lib/getJson";
import type { Post } from "@/types/Post";
import { NextResponse } from "next/server";

export async function GET() {
  const json = await getJson<Post[]>("posts");
  // Return the json in the response body as data
  return NextResponse.json({ data: json });
}
