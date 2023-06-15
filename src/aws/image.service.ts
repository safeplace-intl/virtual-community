import {
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  S3MessageResponse,
  S3SignedUrlResponse,
} from "../core/dto/profile.dto.js";
import { client } from "./s3.config.js";

export interface BaseImageService {
  generateSignedUrlByClient({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3SignedUrlResponse>;
}

export interface SignedUrlClientOptions {
  bucket: string;
  key: string;
}

export default class S3Service implements BaseImageService {
  // Here are our base methods for the s3 service class:
  // we will extend this class in our profile photo service, and then again later when we are making an image service for posts, etc..
  async generateSignedUrlByClient({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3SignedUrlResponse> {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const signedUrl = await getSignedUrl(client as any, command as any, {
      expiresIn: 3600,
    });

    return {
      statusCode: 200,
      signedUrl,
    };
  }

  async getImageFromS3({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3MessageResponse> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    try {
      const response = await client.send(command);
      const str = await response.Body?.transformToString();

      if (str !== undefined) {
        return {
          statusCode: 200,
          message: str,
        };
      } else {
        throw new Error("Error retrieving image");
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteImageFromS3({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3MessageResponse> {
    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: [{ Key: key }],
      },
    });

    try {
      await client.send(command);

      const successResponse: S3MessageResponse = {
        statusCode: 200,
        message: "Image deleted",
      };

      return successResponse;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
