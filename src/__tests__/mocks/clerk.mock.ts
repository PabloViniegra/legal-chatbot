import { vi } from 'vitest';

/**
 * Mock de Clerk auth para tests
 */
export const mockAuth = {
  userId: 'user_123456',
  sessionId: 'sess_123456',
  getToken: vi.fn().mockResolvedValue('mock-token'),
};

export const mockCurrentUser = {
  id: 'user_123456',
  emailAddresses: [{ emailAddress: 'test@example.com' }],
  firstName: 'Test',
  lastName: 'User',
  imageUrl: 'https://example.com/avatar.jpg',
};

// Mock de @clerk/nextjs/server
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(() => mockAuth),
  currentUser: vi.fn(() => Promise.resolve(mockCurrentUser)),
  clerkClient: vi.fn(),
}));
