import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('debería combinar clases de Tailwind', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('debería manejar clases condicionales', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
    });

    it('debería ignorar valores falsy', () => {
      const result = cn('base-class', false && 'should-not-appear', null, undefined);
      expect(result).toBe('base-class');
      expect(result).not.toContain('should-not-appear');
    });

    it('debería manejar arrays de clases', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('debería sobrescribir clases conflictivas de Tailwind', () => {
      // twMerge debería mantener solo la última clase cuando hay conflicto
      const result = cn('p-4', 'p-8');
      expect(result).toBe('p-8');
    });

    it('debería manejar objetos de clases', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-500': false,
        'font-bold': true,
      });
      expect(result).toContain('text-red-500');
      expect(result).toContain('font-bold');
      expect(result).not.toContain('bg-blue-500');
    });

    it('debería retornar string vacío si no hay clases', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('debería combinar múltiples tipos de inputs', () => {
      const isActive = true;
      const result = cn(
        'base',
        ['array1', 'array2'],
        isActive && 'conditional',
        { dynamic: true, hidden: false }
      );
      expect(result).toContain('base');
      expect(result).toContain('array1');
      expect(result).toContain('array2');
      expect(result).toContain('conditional');
      expect(result).toContain('dynamic');
      expect(result).not.toContain('hidden');
    });
  });
});
