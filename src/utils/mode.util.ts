export function GetApplicationMode() {
  return process.env.NODE_ENV || "development";
}

export default { GetApplicationMode };
