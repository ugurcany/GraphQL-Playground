const Comment = {
    author(parent, args, {
        db
    }, info) {
        return db.users.find((user) => user.id == parent.author)
    },
    post(parent, args, ctx, info) {
        return db.posts.find((post) => post.id == parent.post)
    }
}

export {
    Comment as
    default
}