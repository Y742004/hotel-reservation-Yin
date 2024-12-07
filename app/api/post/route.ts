import { auth } from "@/auth";
import { db } from "@/lib/db";
import { th } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const toRead = await db.post.findMany({});
    return NextResponse.json(toRead);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqData = await req.json();
  // console.log(reqData);
  // return NextResponse.json(reqData);

  try {
    const toCreate = await db.post.create({
      data: {
        title: reqData.title,
        // categoryId: reqData.categoryId,
        description: reqData.description,
        userId: reqData.userId,
        slug: reqData.slug,
        image: reqData.image,
      },
    });
    return NextResponse.json(toCreate);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const reqData = await req.json();
  // console.log(reqData);
  // return NextResponse.json(reqData);

  try {
    const toCreate = await db.post.delete({
      where: {
        id: reqData.id,
      },
    });
    return NextResponse.json(toCreate);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
