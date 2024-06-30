
import { Meilisearch } from "meilisearch";
import BlogRepository from "../Repositories/blogReposity";

(async () => {
  const client = new Meilisearch({
    host: "http://localhost:7700",
    apiKey : "masterKey"
  });
  
  const index = client.index('blogs');
  
  const blogRepository = new BlogRepository();
  
  const documents = await blogRepository.getAll();
  
  let Response = await index.addDocuments(documents);

  console.log(Response);
})



