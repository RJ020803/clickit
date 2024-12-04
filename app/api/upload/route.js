import { connectMongoDB } from "@/lib/mongodb";
import uploadedImage from "@/models/uploadedImage";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import db from "@/app/db";
import { imageTable } from "@/app/db/schema";

const R2_CLIENT = new S3Client({
  region: "auto",
  endpoint: "https://8f2647f21b5f73a3bdd85428bbba3d91.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = "clickit";

export async function POST(req) {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const formData = await req.formData();
    const file = formData.get("file");
    const fileName = file.name;
    const fileContent = await file.arrayBuffer();
    console.log("File details received:", fileName);

    if (!fileName || !fileContent) {
      return new Response(
        JSON.stringify({ error: "File name and content are required" }),
        { status: 400 }
      );
    }

    const buffer = Buffer.from(fileContent);
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const mimeType = `image/${fileExtension}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    };

    await R2_CLIENT.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded to R2:", fileName);

    const fileUrl = `https://${BUCKET_NAME}.r2.cloudflarestorage.com/${fileName}`;

    // const newImage = await uploadedImage.create({ imageUrl: fileUrl });
    const newImage = db
      .insert(imageTable)
      .values({ image: fileName })
      .execute();
    console.log("Image saved to MongoDB:", newImage);

    return new Response(
      JSON.stringify({
        message: "Image uploaded successfully",
        imageUrl: fileUrl,
        image: newImage,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in Upload API:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return new Response(JSON.stringify({ error: "Key is required" }), {
        status: 400,
      });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    const data = await R2_CLIENT.send(new GetObjectCommand(params));
    const fileContent = await new Response(data.Body).arrayBuffer();

    return new Response(fileContent, {
      headers: {
        "Content-Type": data.ContentType,
      },
    });
  } catch (error) {
    console.error("Error in Download API:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
