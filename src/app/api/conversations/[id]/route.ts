import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { conversationService } from "@/services/conversation.service";
import { updateConversationSchema } from "@/lib/validations";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from "@/lib/errors";

// GET /api/conversations/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    const conversation = await conversationService.getConversation(id, userId);

    return NextResponse.json({ data: conversation });
  } catch (error) {
    console.error("GET /api/conversations/[id] error:", error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Error al obtener conversación" },
      { status: 500 }
    );
  }
}

// PATCH /api/conversations/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new UnauthorizedError();
    }

    const body = await request.json();
    const validatedData = updateConversationSchema.parse(body);

    const { id } = await params;
    const conversation = await conversationService.updateConversation(
      id,
      userId,
      validatedData
    );

    return NextResponse.json({ data: conversation });
  } catch (error) {
    console.error("PATCH /api/conversations/[id] error:", error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Error al actualizar conversación" },
      { status: 500 }
    );
  }
}

// DELETE /api/conversations/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    await conversationService.deleteConversation(id, userId);

    return NextResponse.json({ message: "Conversación eliminada" });
  } catch (error) {
    console.error("DELETE /api/conversations/[id] error:", error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Error al eliminar conversación" },
      { status: 500 }
    );
  }
}