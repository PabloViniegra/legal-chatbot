import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { messageRepository } from "@/repositories/message.repository";
import { conversationRepository } from "@/repositories/conversation.repository";
import { UnauthorizedError, NotFoundError } from "@/lib/errors";

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

    // Verificar que la conversación pertenece al usuario
    const conversation = await conversationRepository.findById(id, userId);

    if (!conversation) {
      throw new NotFoundError("Conversación", id);
    }

    // Obtener mensajes de la conversación
    const messages = await messageRepository.findByConversationId(id);

    return NextResponse.json({ data: messages });
  } catch (error) {
    console.error("GET /api/conversations/[id]/messages error:", error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Error al obtener mensajes" },
      { status: 500 }
    );
  }
}