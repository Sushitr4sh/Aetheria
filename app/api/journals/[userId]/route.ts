import { connectToDB } from "@/lib/database";
import Journal from "@/models/journal";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  console.log("User  ID is", userId);

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  try {
    // Connect to the database
    await connectToDB();

    // Find all journals created by the specified user
    const userJournals = await Journal.find({ creator: userId });

    if (!userJournals || userJournals.length === 0) {
      return new Response("No journals found for this user.", { status: 404 });
    }

    // Return the journals as JSON
    return new Response(JSON.stringify(userJournals), { status: 200 });
  } catch (error) {
    console.error("Error fetching journals:", error);
    return new Response("Failed to fetch journals.", { status: 500 });
  }
}
