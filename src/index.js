import {
    GraphQLServer
} from "graphql-yoga"
import {
    users,
    posts,
    comments
} from "./demo_data"
import {
    v4 as uuidv4
} from "uuid"

//type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const isEmailTaken = users.some((user) => user.email == args.data.email);
            if (isEmailTaken)
                throw new Error("Email is already taken!")

            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id == args.data.author);
            if (!userExists)
                throw new Error("User not found!")

            const post = {
                id: uuidv4(),
                ...args.data
            }
            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id == args.data.author);
            if (!userExists)
                throw new Error("User not found!")

            const postExistsAndPublished = posts.some((post) => post.id == args.data.post && post.published);
            if (!postExistsAndPublished)
                throw new Error("Post not found or published!")

            const comment = {
                id: uuidv4(),
                ...args.data
            }
            comments.push(comment)
            return comment
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