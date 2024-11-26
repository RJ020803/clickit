import { connectMongoDB } from "@/lib/mongodb";
import uploadedImage from "@/models/uploadedImage";


export async function GET() {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");
    const images = await uploadedImage.find();


    return new Response(JSON.stringify({ success: true, images }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


