import { createStringScalar } from "graphql-scalar";

export const StringScalar = createStringScalar({
  name: "StringScalar",
  collapseWhitespace: true,
  trim: true,
  coerce: coerceString,
  sanitize: sanitizeString,
});

function sanitizeString(input: string): string {
  return input.replace(/[<>"'&]/g, "");
}

function coerceString(input: unknown) {
  if (typeof input === "string") {
    return input;
  }
  return "";
}
