const users = [{
        id: "1",
        name: "Ugurcan",
        email: "ugurcan@mail.com",
        age: 27
    },
    {
        id: "2",
        name: "John",
        email: "john@mail.com"
    },
    {
        id: "3",
        name: "Sarah",
        email: "sarah@mail.com"
    }
]

const posts = [{
        id: "1",
        title: "Some title 1",
        body: "Some body 1",
        published: true,
        author: "1"
    },
    {
        id: "2",
        title: "Some title 2",
        body: "Some body 2",
        published: false,
        author: "2"
    },
    {
        id: "3",
        title: "Some title 3",
        body: "Some body 3",
        published: true,
        author: "3"
    }
]

const comments = [{
        id: "1",
        text: "Some comment 1",
        author: "1",
        post: "3"
    },
    {
        id: "2",
        text: "Some comment 2",
        author: "1",
        post: "3"
    },
    {
        id: "3",
        text: "Some comment 3",
        author: "2",
        post: "2"
    },
    {
        id: "4",
        text: "Some comment 4",
        author: "2",
        post: "1"
    }
]

const db = {
    users,
    posts,
    comments
}

export {
    db as
    default
}