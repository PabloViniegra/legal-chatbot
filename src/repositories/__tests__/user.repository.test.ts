import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserRepository } from '../user.repository';
import { mockPrismaClient } from '@/__tests__/mocks/prisma.mock';
import { mockUser, mockCreateUserInput } from '@/__tests__/fixtures/user.fixtures';

describe.skip('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new UserRepository();
  });

  describe('findById', () => {
    it('debería encontrar un usuario por ID', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

      const result = await repository.findById('user_123456');

      expect(result).toEqual(mockUser);
      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user_123456' },
      });
    });

    it('debería retornar null si no encuentra el usuario', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const result = await repository.findById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('debería encontrar un usuario por email', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

      const result = await repository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('debería retornar null si no existe el usuario con ese email', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const result = await repository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });

    it('debería ser case-sensitive en la búsqueda de email', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      await repository.findByEmail('TEST@EXAMPLE.COM');

      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'TEST@EXAMPLE.COM' },
      });
    });
  });

  describe('create', () => {
    it('debería crear un nuevo usuario', async () => {
      const newUser = {
        ...mockCreateUserInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaClient.user.create.mockResolvedValue(newUser);

      const result = await repository.create(mockCreateUserInput);

      expect(result).toEqual(newUser);
      expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
        data: mockCreateUserInput,
      });
    });

    it('debería propagar error si el email ya existe', async () => {
      const error = Object.assign(new Error('Unique constraint violation'), {
        code: 'P2002',
      });
      mockPrismaClient.user.create.mockRejectedValue(error);

      await expect(repository.create(mockCreateUserInput)).rejects.toThrow(
        'Unique constraint violation'
      );
    });
  });

  describe('update', () => {
    it('debería actualizar un usuario existente', async () => {
      const updatedUser = {
        ...mockUser,
        firstName: 'Updated',
        lastName: 'Name',
      };

      mockPrismaClient.user.update.mockResolvedValue(updatedUser);

      const result = await repository.update('user_123456', {
        firstName: 'Updated',
        lastName: 'Name',
      });

      expect(result.firstName).toBe('Updated');
      expect(result.lastName).toBe('Name');
      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: 'user_123456' },
        data: { firstName: 'Updated', lastName: 'Name' },
      });
    });

    it('debería permitir actualizar solo algunos campos', async () => {
      const updatedUser = { ...mockUser, firstName: 'NewName' };
      mockPrismaClient.user.update.mockResolvedValue(updatedUser);

      await repository.update('user_123456', { firstName: 'NewName' });

      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: 'user_123456' },
        data: { firstName: 'NewName' },
      });
    });
  });

  describe('upsert', () => {
    it('debería crear un usuario si no existe', async () => {
      const newUser = {
        ...mockCreateUserInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaClient.user.upsert.mockResolvedValue(newUser);

      const result = await repository.upsert(
        mockCreateUserInput.id,
        mockCreateUserInput
      );

      expect(result).toEqual(newUser);
      expect(mockPrismaClient.user.upsert).toHaveBeenCalledWith({
        where: { id: mockCreateUserInput.id },
        update: {
          email: mockCreateUserInput.email,
          firstName: mockCreateUserInput.firstName,
          lastName: mockCreateUserInput.lastName,
          imageUrl: mockCreateUserInput.imageUrl,
        },
        create: mockCreateUserInput,
      });
    });

    it('debería actualizar un usuario si ya existe', async () => {
      const existingUser = {
        ...mockUser,
        email: 'updated@example.com',
      };

      mockPrismaClient.user.upsert.mockResolvedValue(existingUser);

      const result = await repository.upsert('user_123456', {
        ...mockCreateUserInput,
        id: 'user_123456',
        email: 'updated@example.com',
      });

      expect(result.email).toBe('updated@example.com');
    });
  });

  describe('delete', () => {
    it('debería eliminar un usuario', async () => {
      mockPrismaClient.user.delete.mockResolvedValue(mockUser);

      await repository.delete('user_123456');

      expect(mockPrismaClient.user.delete).toHaveBeenCalledWith({
        where: { id: 'user_123456' },
      });
    });

    it('debería lanzar error si el usuario no existe', async () => {
      const error = Object.assign(new Error('Record not found'), {
        code: 'P2025',
      });
      mockPrismaClient.user.delete.mockRejectedValue(error);

      await expect(repository.delete('nonexistent')).rejects.toThrow(
        'Record not found'
      );
    });
  });
});
