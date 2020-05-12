import {
    GraphQLServer
} from "graphql-yoga"
import {
    users,
    posts,
    comments
} from "./demo_data"

//type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

//resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query)
                return users
            return users.filter((user) =>
                user.name.toLowerCase().includes(args.query.toLowerCase())
            )
        },
        posts(parent, args, ctx, info) {
            if (!args.query)
                return posts
            return posts.filter((post) =>
                post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                post.body.toLowerCase().includes(args.query.toLowerCase())
            )
        },
        comments(parent, args, ctx, info) {
            return comments
        },
        me() {
            return {
                id: "q4214312",
                name: "Ugurcan",
                email: "ugurcan@mail.com"
            }
        },
        post() {
            return {
                id: "12345",
                title: "Some post title",
                body: "Some post body",
                published: true
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            //parent == calling post object
            return users.find((user) => user.id == parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post == parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id == parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => post.id == parent.post)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author == parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.author == parent.id)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("server is up...")
})