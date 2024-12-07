import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const toRead = await db.post.findFirst({
      where: {
        slug: params.slug,
      },
    });
    return NextResponse.json(toRead);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
