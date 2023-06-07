import * as bcrypt from "bcrypt";

export async function generateSlug(userId: number) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userId.toString(), salt);

  return hash;
}
