import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCategories() {
  return Response.json(await prisma.category.findMany());
}

export async function AddCategory(req : Request){
    try{
        const { topic , description } = await req.json();
        const newCategory = await prisma.category.create({
            data : {
                topic,
                description,
            }
        })

        return new Response(JSON.stringify(newCategory), { status: 201 })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}

