import { connectMongoDB } from "@/lib/mongodb";
import uploadedImage from "@/models/uploadedImage";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

    
    const { fileName, fileContent } = await req.json();
    console.log("File details received:", fileName);

    
    if (!fileName || !fileContent) {
      return new Response(
        JSON.stringify({ error: "File name and content are required" }),
        { status: 400 }
      );
    }

    
    const buffer = Buffer.from(fileContent, "base64");
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

    
    const newImage = await uploadedImage.create({ imageUrl: fileUrl });
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
