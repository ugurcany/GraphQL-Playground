import {
    v4 as uuidv4
} from "uuid"

const Mutation = {
    createUser(parent, args, {
        db
    }, info) {
        const isEmailTaken = db.users.some((user) => user.email == args.data.email)
        if (isEmailTaken)
            throw new Error("Email is already taken!")

        const user = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(user)
        return user
    },
    deleteUser(parent, args, {
        db
    }, info) {
        const userIndex = db.users.findIndex((user) => user.id == args.id)
        if (userIndex == -1)
            throw new Error("User not found!")

        //delete user
        const deletedUsers = db.users.splice(userIndex, 1)

        //delete posts of that user
        db.posts = db.posts.filter((post) => {
            const match = post.author == args.id

            //delete comments of the post
            if (match)
                db.comments = db.comments.filter((comment) => comment.post != post.id)

            return !match
        })

        //delete comments of that user
        db.comments = db.comments.filter((comment) => comment.author != args.id)

        return deletedUsers[0]
    },
    updateUser(parent, {
        id,
        data
    }, {
        db
    }, info) {
        const user = db.users.find((user) => user.id == id)
        if (!user)
            throw new Error("User not found!")

        //update email
        if (typeof data.email == "string") {
            const emailTaken = db.users.some((user) => user.email == data.email)
            if (emailTaken)
                throw new Error("Email already taken!")

            user.email = data.email
        }

        //update name
        if (typeof data.name == "string") {
            user.name = data.name
        }

        //update age
        if (typeof data.age != "undefined") {
            user.age = data.age
        }

        return user
    },
    createPost(parent, args, {
        db
    }, info) {
        const userExists = db.users.some((user) => user.id == args.data.author)
        if (!userExists)
            throw new Error("User not found!")

        const post = {
            id: uuidv4(),
            ...args.data
        }
        db.posts.push(post)
        return post
    },
    deletePost(parent, args, {
        db
    }, info) {
        const postIndex = db.posts.findIndex((post) => post.id == args.id)
        if (postIndex == -1)
            throw new Error("Post not found!")

        //delete post
        const deletedPosts = db.posts.splice(postIndex, 1)

        //delete comments of that posts
        db.comments = db.comments.filter((comment) => comment.post != args.id)

        return deletedPosts[0]
    },
    updatePost(parent, {
        id,
        data
    }, {
        db
    }, info) {
        const post = db.posts.find((post) => post.id == id)
        if (!post)
            throw new Error("Post not found!")

        //update title
        if (typeof data.title == "string") {
            post.title = data.title
        }

        //update body
        if (typeof data.body == "string") {
            post.body = data.body
        }

        //update published
        if (typeof data.published == "boolean") {
            post.published = data.published
        }

        return post
    },
    createComment(parent, args, {
        db
    }, info) {
        const userExists = db.users.some((user) => user.id == args.data.author)
        if (!userExists)
            throw new Error("User not found!")

        const postExistsAndPublished = db.posts.some((post) => post.id == args.data.post && post.published)
        if (!postExistsAndPublished)
            throw new Error("Post not found or published!")

        const comment = {
            id: uuidv4(),
            ...args.data
        }
        db.comments.push(comment)
        return comment
    },
    deleteComment(parent, args, {
        db
    }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id == args.id)
        if (commentIndex == -1)
            throw new Error("Comment not found!")

        //delete comment
        const deletedPosts = db.comments.splice(commentIndex, 1)

        return deletedPosts[0]
    },
    updateComment(parent, {
        id,
        data
    }, {
        db
    }, info) {
        const comment = db.comments.find((comment) => comment.id == id)
        if (!comment)
            throw new Error("Comment not found!")

        //update text
        if (typeof data.text == "string") {
            comment.text = data.text
        }

        return comment
    }
}

export {
    Mutation as
    default
}