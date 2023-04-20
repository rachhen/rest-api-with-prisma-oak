export const typeDefs = `#graphql
  type Dinosaur {
    name: String
    description: String
  }

  type Query {
    dinosaurs: [Dinosaur]
    dinosaur(name: String): Dinosaur
  }
`;
