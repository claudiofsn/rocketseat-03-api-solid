export class LateCheckInValidateError extends Error {
  constructor() {
    super("Validate check in over twenty minutes.");
  }
}
