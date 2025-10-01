import type {
  Conversation,
  ConversationWithMessages,
  ConversationWithPreview,
  CreateConversationInput,
} from '@/types/conversation.types';
import type { Message } from '@/types/message.types';

/**
 * Fixtures para conversaciones - Datos de prueba reutilizables
 */

export const mockConversation: Conversation = {
  id: 'conv_123456',
  userId: 'user_123456',
  title: 'Consulta sobre despido laboral',
  category: 'laboral',
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:30:00Z'),
};

export const mockMessages: Message[] = [
  {
    id: 'msg_1',
    conversationId: 'conv_123456',
    role: 'assistant',
    content: '¡Hola! ¿En qué puedo ayudarte con legislación española?',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    model: null,
    tokens: null,
  },
  {
    id: 'msg_2',
    conversationId: 'conv_123456',
    role: 'user',
    content: '¿Cuál es el plazo para impugnar un despido?',
    createdAt: new Date('2024-01-01T10:15:00Z'),
    model: null,
    tokens: null,
  },
  {
    id: 'msg_3',
    conversationId: 'conv_123456',
    role: 'assistant',
    content: 'Según el Estatuto de los Trabajadores, el plazo es de 20 días hábiles.',
    createdAt: new Date('2024-01-01T10:16:00Z'),
    model: 'gpt-4o',
    tokens: 150,
  },
];

export const mockConversationWithMessages: ConversationWithMessages = {
  ...mockConversation,
  messages: mockMessages,
};

export const mockConversationWithPreview: ConversationWithPreview = {
  ...mockConversation,
  messages: [mockMessages[mockMessages.length - 1]],
  preview: mockMessages[mockMessages.length - 1].content.substring(0, 100),
};

export const mockCreateConversationInput: CreateConversationInput = {
  userId: 'user_123456',
  title: 'Nueva conversación',
  category: 'civil',
};

export const mockConversations: Conversation[] = [
  mockConversation,
  {
    id: 'conv_234567',
    userId: 'user_123456',
    title: 'Consulta sobre herencia',
    category: 'civil',
    createdAt: new Date('2024-01-02T10:00:00Z'),
    updatedAt: new Date('2024-01-02T11:00:00Z'),
  },
  {
    id: 'conv_345678',
    userId: 'user_123456',
    title: 'Denuncia por robo',
    category: 'penal',
    createdAt: new Date('2024-01-03T10:00:00Z'),
    updatedAt: new Date('2024-01-03T12:00:00Z'),
  },
];
