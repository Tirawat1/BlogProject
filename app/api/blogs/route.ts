import { PrismaClient } from "@prisma/client";
import BlogRepository from  "@/app/Repositories/blogReposity"

const prisma = new PrismaClient();
    
export async function GET() {
    // return Response.json(await prisma.blog.findMany());
    const blogRepository = new BlogRepository();
    const blogs = await blogRepository.getAll();
    return new Response(JSON.stringify(blogs), { status: 200, headers: { 'Content-Type': 'application/json' } });;
}

export async function POST(req : Request){
    try{
        const blogRepository = new BlogRepository();
        const data = await req.json();
        const blog = await blogRepository.create(data);
        return new Response(JSON.stringify(blog), { status: 201 })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}

