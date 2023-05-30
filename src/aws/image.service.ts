import {
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { S3Response } from "../core/dto/profile.dto.js";
import { client } from "./s3.config.js";

export interface IBaseImageService {
  generateSignedUrlByClient({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3Response>;
}

export interface SignedUrlClientOptions {
  bucket: string;
  key: string;
}

export const genericAWSErrorMessage = "An error occured within AWS S3 service";

export default class S3Service implements IBaseImageService {
  // Here are our base methods for the s3 service class:
  // we will extend this class in our profile photo service, and then again later when we are making an image service for posts, etc..
  async generateSignedUrlByClient({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3Response> {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    return {
      statusCode: 200,
      signedUrl,
    };
  }

  async getImageFromS3({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3Response> {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    try {
      const response = await client.send(command);
      const str = await response.Body?.transformToString();

      if (str !== undefined) {
        return {
          statusCode: 200,
          imageUrl: str,
        };
      } else {
        return {
          statusCode: 400,
          message: "Error retrieving image",
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: genericAWSErrorMessage,
      };
    }
  }

  async deleteImageFromS3({
    bucket,
    key,
  }: SignedUrlClientOptions): Promise<S3Response> {
    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: [{ Key: key }],
      },
    });

    try {
      const { Deleted } = await client.send(command);

      console.log(`Successfully deleted ${Deleted}`);

      const successResponse: S3Response = {
        statusCode: 200,
        message: "Image deleted",
      };

      return successResponse;
    } catch (err) {
      const errorResponse: S3Response = {
        statusCode: 500,
        message: genericAWSErrorMessage,
      };

      return errorResponse;
    }
  }
}
