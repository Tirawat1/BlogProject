import { PrismaClient } from "@prisma/client";
import { Meilisearch } from "meilisearch";
import BlogRepository from "@/app/Repositories/blogReposity"

const prisma = new PrismaClient();
const client = new Meilisearch({
  host: "http://localhost:7700",
  apiKey: "masterKey"
});
const blogRepository = new BlogRepository();

export async function GET() {
  try {
    const index = client.index('blogs');
    const blogPosts = await blogRepository.getAll();
    console.log(blogPosts);

    const doc = blogPosts.map((blogPost) => {
      return {
        id: blogPost.id,
        title: blogPost.title,
        content: blogPost.content,
        publisheded: blogPost.published,
      };
    });
    // Add documents to MeiliSearch index
    const response = await index.addDocuments(doc);

    // Log the response
    console.log("Documents added to MeiliSearch:", response);

    // Example: Search in MeiliSearch
    const searchResult = await index.search('Fundamentals of Physics');
    console.log("Search result:", searchResult);

    return new Response(JSON.stringify(searchResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error while interacting with MeiliSearch:", error);
    return new Response(JSON.stringify({ error: "Failed to interact with MeiliSearch" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
