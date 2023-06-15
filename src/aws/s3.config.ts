import {
  // ListBucketsCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";

// To send a request, you:
// Initiate client with configuration (e.g. credentials, region).
// Initiate command with input parameters.
// Call send operation on client with command object as input.
// If you are using a custom http handler, you may call destroy() to close open connections.

export const config: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: "us-east-1", // enable af-south-1 at a later date (read AWS docs about this first)
};

// a client can be shared by different commands.
export const client = new S3Client(config);

// example:
// const input = {};

// const command = new ListBucketsCommand(input);
// const response = await client.send(command);

// console.log(response);
