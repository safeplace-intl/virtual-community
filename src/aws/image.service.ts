import {
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { client } from "./s3.config.js";

// ! haven't mapped this out 100% yet, just leave it commented out for now
// export abstract class ImageService {
//   abstract generateSignedUrl(id: number): Promise<string>;
//   abstract uploadImage(id: number): Promise<string>;
//   abstract getImage(id: number): Promise<string>;
//   abstract deleteImage(id: number): Promise<string>;
// }

export interface IBaseImageService {
  generateSignedUrlByClient({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<string>;
}

export interface SignedUrlClientOptions {
  bucket: string;
  key: string;
}

export default class S3Service implements IBaseImageService {
  // Here are our base methods for the s3 service class:
  // we will extend this class in our profile photo service, and then again later when we are making an image service for posts, etc..
  async generateSignedUrlByClient({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<string> {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 3600 });
  }

  async getImageFromS3({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<string | undefined> {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    try {
      const response = await client.send(command);
      const str = await response.Body?.transformToString();
      console.log(str);
      if (!response.Body) {
        return "error";
      } else {
        return str;
      }
    } catch (err) {
      console.error(err);
      return "nope";
    }
  }

  async deleteImageFromS3({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<string> {
    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: [{ Key: key }],
      },
    });
    try {
      const { Deleted } = await client.send(command);
      console.log(`Successfully deleted ${Deleted}`);
      return "Deleted";
    } catch (err) {
      console.error(err);
      return "Error occurred within S3 service";
    }
  }
}
