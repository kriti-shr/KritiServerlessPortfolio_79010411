import {
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";

import {
  randomUUID
} from "crypto";


const client = new DynamoDBClient({});

const dynamodb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || "BlogPostsSAM-Kriti-79010411";


export const handler = async (event) => {

  try {

    const method =
      event.requestContext?.http?.method ||
      event.httpMethod;

    const path =
      event.requestContext?.http?.path ||
      event.path;


    // GET /posts
    if (method === "GET" && path === "/posts") {

      return await getPosts();

    }


    // POST /posts
    if (method === "POST" && path === "/posts") {

      return await createPost(event);

    }


    return response(404, {
      message: "Route not found"
    });


  } catch (error) {

    console.error("Lambda Error:", error);

    return response(500, {
      message: "Internal server error"
    });

  }

};


// Get all blog posts
async function getPosts() {

  const result = await dynamodb.send(
    new ScanCommand({
      TableName: TABLE_NAME
    })
  );


  const posts = (result.Items || []).sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );


  return response(200, posts);

}


// Create a new blog post
async function createPost(event) {

  let body;


  try {

    body = JSON.parse(
      event.body || "{}"
    );

  } catch {

    return response(400, {
      message: "Invalid JSON"
    });

  }


  const title =
    String(body.title || "").trim();

  const content =
    String(body.content || "").trim();


  if (!title || !content) {

    return response(400, {
      message: "Title and content are required"
    });

  }


  if (title.length > 120) {

    return response(400, {
      message:
        "Title must be 120 characters or fewer"
    });

  }


  if (content.length > 10000) {

    return response(400, {
      message:
        "Content must be 10,000 characters or fewer"
    });

  }


  const claims =
    event.requestContext?.authorizer?.jwt?.claims || {};

  const authorEmail =
    claims.email ||
    claims.username ||
    "Unknown user";

  const authorName =
    claims.name ||
    authorEmail;

  const post = {
    id: randomUUID(),
    title,
    content,
    author: authorName,
    authorEmail: authorEmail,
    createdAt: new Date().toISOString()
  };


  await dynamodb.send(
    new PutCommand({

      TableName: TABLE_NAME,

      Item: post

    })
  );


  return response(201, post);

}


// Response helper
function response(statusCode, body) {

  return {

    statusCode,

    headers: {

      "Content-Type":
        "application/json"

    },

    body:
      JSON.stringify(body)

  };

}