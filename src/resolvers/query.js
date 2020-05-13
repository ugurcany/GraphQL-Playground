const Query = {
    users(parent, args, {
        db
    }, info) {
        if (!args.query)
            return db.users
        return db.users.filter((user) =>
            user.name.toLowerCase().includes(args.query.toLowerCase())
        )
    },
    posts(parent, args, {
        db
    }, info) {
        if (!args.query)
            return db.posts
        return db.posts.filter((post) =>
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
        )
    },
    comments(parent, args, {
        db
    }, info) {
        return db.comments
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
}

export {
    Query as
    default
}