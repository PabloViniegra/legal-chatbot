import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock del logger global
vi.mock('@/lib/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));
