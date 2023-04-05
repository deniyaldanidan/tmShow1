export type Blog = {
    _id: string,
    title: string,
    excerpt: string,
    content: string,
    author: {
        username: string,
        _id: string
    },
    category: string,
    createdAt: string,
    updatedAt: string
}