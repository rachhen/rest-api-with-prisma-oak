import db from "./db.ts";

export const resolvers = {
  Query: {
    dinosaurs: () => db.dinosaur.findMany(),
    // deno-lint-ignore no-explicit-any
    dinosaur: (_: any, args: any) => {
      return db.dinosaur.findUniqueOrThrow({ where: { name: args.name } });
      // return dinosaurs.find((dinosaur) => dinosaur.name === args.name);
    },
  },
};
