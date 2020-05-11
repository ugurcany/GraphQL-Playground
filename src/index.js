import {
    GraphQLServer
} from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name)
                return `Hello, ${args.name}!`
            else
                return "Hello!"
        },
        me() {
            return {
                id: "q4214312",
                name: "Ugurcan",
                email: "ugurcan@mail.com"
            };
        },
        post() {
            return {
                id: "12345",
                title: "Some post title",
                body: "Some post body",
                published: true
            };
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("server is up...")
});