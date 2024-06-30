import { PrismaClient } from "@prisma/client";
import BlogRepository from  "../../../Repositories/blogReposity";

const prisma = new PrismaClient();

export async function GET(req : Request , { params }: { params: { id: string } }) {
    
    // return Response.json(await prisma.blog.findMany());
    const blogRepository = new BlogRepository();
    const blog = await blogRepository.get(parseInt(params.id));
    return new Response(JSON.stringify(blog), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(req : Request , { params }: { params: { id: string } }){
    try{
        const blogRepository = new BlogRepository();
        const data = await req.json();
        const blog = await blogRepository.update(parseInt(params.id),data);
        return new Response(JSON.stringify(blog), { status: 201 , headers: { 'Content-Type': 'application/json' } })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}

export async function DELETE(req : Request , { params }: { params: { id: string } }){
    try{
        const blogRepository = new BlogRepository();
        const blog = await blogRepository.delete(parseInt(params.id));
        let sen = "Deleted Successfully" + " : " + blog.id;
        return new Response(sen, { status: 201 , headers: { 'Content-Type': 'application/json' } })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}

