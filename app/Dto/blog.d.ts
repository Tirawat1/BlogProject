
type blog = {
    id: number;
    title: string;
    content: string;
    author: string;
    published: boolean;
    categoryId: number;
    createdAt: Date;
    updatedAt?: Date;
};

type createBlog = {
    title: string;
    content: string;
    author: string;
    categoryId: number;
}