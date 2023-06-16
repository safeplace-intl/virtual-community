import crypto from "crypto";

export async function generateFileName(userId: number) {
  try {
    const hash = crypto.createHash("sha256");
    hash.update(userId.toString());
    const fileName = hash.digest("hex").slice(0, 60);
    fileName.replace(/\//g, "");
    return fileName;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}
