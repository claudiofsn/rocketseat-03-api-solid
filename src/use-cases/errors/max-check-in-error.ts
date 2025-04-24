export class MaxCheckInError extends Error {
  constructor() {
    super("Max number of check in reached.");
  }
}
