import type { User, CreateUserInput } from '@/types/user.types';

/**
 * Fixtures para usuarios - Datos de prueba reutilizables
 */

export const mockUser: User = {
  id: 'user_123456',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  imageUrl: 'https://example.com/avatar.jpg',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
};

export const mockCreateUserInput: CreateUserInput = {
  id: 'user_new123',
  email: 'newuser@example.com',
  firstName: 'New',
  lastName: 'User',
  imageUrl: 'https://example.com/new-avatar.jpg',
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: 'user_234567',
    email: 'user2@example.com',
    firstName: 'Second',
    lastName: 'User',
    imageUrl: 'https://example.com/avatar2.jpg',
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
  },
];
