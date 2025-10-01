import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/user/tour - Verificar si el usuario ha completado el tour
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { hasCompletedTour: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ hasCompletedTour: user.hasCompletedTour });
  } catch (error) {
    console.error("GET /api/user/tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/user/tour - Marcar el tour como completado
export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { hasCompletedTour: true },
    });

    return NextResponse.json({ hasCompletedTour: user.hasCompletedTour });
  } catch (error) {
    console.error("POST /api/user/tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
