import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllSubCategories() {
    return Response.json(await prisma.subCategory.findMany());
}

export async function AddSubCategory(req : Request){
    try{
        const { Sub_topic , description , categoryId} = await req.json();
        const newSubCategory = await prisma.subCategory.create({
            data : {
                Sub_topic,
                description,
                Category : {
                    connect : {
                        id : categoryId
                    }
                }
            }
        })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}

export async function updateSubCategory(req : Request){
    try{
        const { id , Sub_topic , description , categoryId} = await req.json();
        const updatedSubCategory = await prisma.subCategory.update({
            where : {
                id : id
            },
            data : {
                Sub_topic,
                description,
                Category : {
                    connect : {
                        id : categoryId
                    }
                }
            }
        })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}

export async function deleteSubCategory(req : Request){
    try{
        const { id } = await req.json();
        const deletedSubCategory = await prisma.subCategory.delete({
            where : {
                id : id
            }
        })
    }
    catch(e){
        return new Response(e as BodyInit, { status: 500 })
    }
}