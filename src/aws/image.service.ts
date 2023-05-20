import { PutObjectCommand } from "@aws-sdk/client-s3";
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
}
