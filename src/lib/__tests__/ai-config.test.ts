import { describe, it, expect } from 'vitest';
import { getSystemPrompt, type LegalCategory } from '../ai-config';

describe('ai-config', () => {
  describe('getSystemPrompt', () => {
    it('debería retornar prompt general cuando no se proporciona categoría', () => {
      const prompt = getSystemPrompt();

      expect(prompt).toContain('asistente legal especializado en la legislación española');
      expect(prompt).toContain('Derecho Civil');
      expect(prompt).toContain('Derecho Penal');
      expect(prompt).toContain('Derecho Laboral');
      expect(prompt).toContain('Derecho Mercantil');
      expect(prompt).toContain('Derecho Administrativo');
      expect(prompt).toContain('Derecho Fiscal');
    });

    it('debería retornar prompt general cuando se pasa undefined', () => {
      const prompt = getSystemPrompt(undefined);

      expect(prompt).toContain('asistente legal especializado en la legislación española');
      expect(prompt).toContain('Esta información es orientativa');
    });

    it('debería retornar prompt de Derecho Civil cuando categoría es "civil"', () => {
      const prompt = getSystemPrompt('civil');

      expect(prompt).toContain('Derecho Civil español');
      expect(prompt).toContain('Código Civil Español');
      expect(prompt).toContain('Contratos y obligaciones');
      expect(prompt).toContain('Derecho de familia');
      expect(prompt).toContain('Sucesiones y herencias');
      expect(prompt).toContain('Derecho de propiedad y arrendamientos');
      expect(prompt).toContain('Responsabilidad civil');
      expect(prompt).toContain('Código Civil (Real Decreto de 24 de julio de 1889)');
      expect(prompt).toContain('Ley de Arrendamientos Urbanos');
      expect(prompt).toContain('abogado civilista');
    });

    it('debería retornar prompt de Derecho Penal cuando categoría es "penal"', () => {
      const prompt = getSystemPrompt('penal');

      expect(prompt).toContain('Derecho Penal español');
      expect(prompt).toContain('Código Penal Español');
      expect(prompt).toContain('Delitos y faltas');
      expect(prompt).toContain('Procedimiento penal');
      expect(prompt).toContain('Medidas cautelares');
      expect(prompt).toContain('Penas y sanciones');
      expect(prompt).toContain('Código Penal (Ley Orgánica 10/1995)');
      expect(prompt).toContain('Ley de Enjuiciamiento Criminal');
      expect(prompt).toContain('abogado penalista');
    });

    it('debería retornar prompt de Derecho Laboral cuando categoría es "laboral"', () => {
      const prompt = getSystemPrompt('laboral');

      expect(prompt).toContain('Derecho Laboral español');
      expect(prompt).toContain('Estatuto de los Trabajadores');
      expect(prompt).toContain('Contratos de trabajo');
      expect(prompt).toContain('Despidos y finiquitos');
      expect(prompt).toContain('Salarios y nóminas');
      expect(prompt).toContain('Jornada laboral y descansos');
      expect(prompt).toContain('Seguridad Social');
      expect(prompt).toContain('Real Decreto Legislativo 2/2015');
      expect(prompt).toContain('abogado laboralista o graduado social');
    });

    it('debería retornar prompt de Derecho Mercantil cuando categoría es "mercantil"', () => {
      const prompt = getSystemPrompt('mercantil');

      expect(prompt).toContain('Derecho Mercantil español');
      expect(prompt).toContain('Código de Comercio');
      expect(prompt).toContain('Sociedades mercantiles');
      expect(prompt).toContain('Contratos mercantiles');
      expect(prompt).toContain('Derecho concursal');
      expect(prompt).toContain('Propiedad intelectual e industrial');
      expect(prompt).toContain('Ley de Sociedades de Capital');
      expect(prompt).toContain('Ley Concursal');
      expect(prompt).toContain('abogado mercantilista');
    });

    it('debería retornar prompts únicos para cada categoría', () => {
      const categories: LegalCategory[] = ['civil', 'penal', 'laboral', 'mercantil'];
      const prompts = categories.map(cat => getSystemPrompt(cat));

      // Verificar que todos son diferentes
      const uniquePrompts = new Set(prompts);
      expect(uniquePrompts.size).toBe(categories.length);
    });

    it('todos los prompts especializados deberían incluir directrices generales', () => {
      const categories: LegalCategory[] = ['civil', 'penal', 'laboral', 'mercantil'];

      categories.forEach(category => {
        const prompt = getSystemPrompt(category);

        expect(prompt).toContain('Cita siempre');
        expect(prompt).toContain('Explica de forma clara');
        expect(prompt).toContain('Advierte');
        expect(prompt).toContain('profesional');
        expect(prompt).toContain('IMPORTANTE');
      });
    });

    it('todos los prompts deberían estar en español', () => {
      const categories: LegalCategory[] = ['civil', 'penal', 'laboral', 'mercantil'];

      // Incluir el prompt general
      const allPrompts = [
        getSystemPrompt(),
        ...categories.map(cat => getSystemPrompt(cat))
      ];

      allPrompts.forEach(prompt => {
        // Verificar que no hay palabras en inglés comunes de prompts
        expect(prompt.toLowerCase()).not.toContain('you are');
        expect(prompt.toLowerCase()).not.toContain('you must');
        expect(prompt.toLowerCase()).not.toContain('please');

        // Verificar que contiene palabras en español
        expect(prompt).toMatch(/eres|debes|por favor|siempre|cuando/i);
      });
    });

    it('todos los prompts deberían mencionar legislación española', () => {
      const categories: LegalCategory[] = ['civil', 'penal', 'laboral', 'mercantil'];

      categories.forEach(category => {
        const prompt = getSystemPrompt(category);
        expect(prompt).toMatch(/español|española/i);
      });
    });
  });
});
