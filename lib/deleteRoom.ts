/* eslint-disable @typescript-eslint/no-explicit-any */
export async function deleteRoom(roomName: string): Promise<string> {
  if (!roomName || typeof roomName !== "string") {
    throw new Error("Invalid room name provided.");
  }

  try {
    const res = await fetch("/api/delete-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw data.error || "Failed to delete room";
    }

    return data.message as string;
  } catch (error: any) {
    console.error("Error deleting room:", error);
    throw error.message || "Unexpected error occurred";
  }
}
