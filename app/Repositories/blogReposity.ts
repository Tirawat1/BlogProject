import IBlogRepository from "./BaseRepository/IBlogReposity";
import { PrismaClient } from '@prisma/client';


export default class BlogRepository implements IBlogRepository<blog> {

    private prisma = new PrismaClient();

    async getAll(): Promise<blog[]> {
        try{
            const blogs = await this.prisma.blog.findMany();
            return blogs.map((blog) => {
            return {
                id: blog.id,
                title: blog.title,
                content: blog.content,
                author: blog.author,
                published: blog.published,
                categoryId : blog.categoryId,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
            }
            });
        }catch(e){
            throw new Error((e instanceof Error) ? e.message : String(e));
        }
    }


    async get (id: number): Promise<blog | null> {
        try{
            const blog = await this.prisma.blog.findUnique({
                where: { id }
            });
            if (blog !== null) {
                return blog;
            }
            else{
                return null;
            }
        }catch(e){
            throw new Error((e instanceof Error) ? e.message : String(e));
        }
    }

    async create(data: blog): Promise<blog> {
        try{
            const blog = await this.prisma.blog.create({
                data: {
                    title: data.title,
                    content: data.content,
                    author : data.author,
                    categoryId: data.categoryId
                }
            })
            return blog;
        }catch(e){
            throw new Error((e instanceof Error) ? e.message : String(e));
        }
    }

    async update(id: number, data: blog): Promise<blog> {
        try{
            const blog = await this.prisma.blog.update({
                where: { id },
                data: {
                    title: data.title,
                    content: data.content,
                    author: data.author,
                    categoryId: data.categoryId,
                }
            });
            return blog;
        }catch(e){
            throw new Error((e instanceof Error) ? e.message : String(e));
        }
    }

    async delete(id: number): Promise<blog> {
        try{
            const blog = await this.prisma.blog.delete({
                where: { id }
            });
            return blog;
        }catch(e){
            throw new Error((e instanceof Error) ? e.message : String(e));
        }
    }
    
}
