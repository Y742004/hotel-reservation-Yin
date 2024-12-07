import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

const toRead = await db.reservation.findMany({
 });
return NextResponse.json(toRead);
}
 
 

export async function POST(req: NextRequest, res: NextResponse) {
  const wow = await req.json();
  const toCreate = await db.reservation.create({
    data: {
        name: wow.name,
      email: wow.email,
      room: wow.room,
      phoneNumber: wow.phoneNumber

    },
  });
  return NextResponse.json(toCreate);
}

export async function PUT(req: NextRequest  , res: NextResponse) {
  const wow = await req.json();
  const toUpdate = await db.reservation.update({
      where: {
          id: wow.id,
      },
      data: {
          name: wow.name,
          email: wow.email,
          room: wow.room,
          phoneNumber: wow.phoneNumber
}})
  return NextResponse.json(toUpdate);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const wow = await req.json();
  const toDelete = await db.reservation.delete({
    where: {
      id: wow.id,
    },
  });
  return NextResponse.json(toDelete);
}
