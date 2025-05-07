import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleRequired: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleRequired) {
      return reply.status(401).send({ message: "Unauthorized." });
    }
  };
}
