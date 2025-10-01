export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} con id ${id} no encontrado`);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "No autorizado") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Acceso prohibido") {
    super(message);
    this.name = "ForbiddenError";
  }
}