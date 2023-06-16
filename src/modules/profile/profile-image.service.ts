import { Service } from "typedi";

import S3Service from "../../aws/image.service.js";
import {
  S3MessageResponse,
  S3SignedUrlAndKeyResponse,
  S3SignedUrlResponse,
} from "../../core/dto/profile.dto.js";
import { generateFileName } from "../../utils/S3keyEncryp.util.js";

interface ImageService {
  generateSignedUrlByUserId(userId: number): Promise<S3SignedUrlResponse>;
  getImageByUserId(userId: number, key: string): Promise<S3MessageResponse>;
  deleteImageByUserId(userId: number, key: string): Promise<S3MessageResponse>;
  getDefaultProfileImage(): Promise<S3MessageResponse>;
}

@Service()
export default class ProfileImageService
  extends S3Service
  implements ImageService
{
  constructor() {
    // calling super means that this service will inherit the methods from the S3Service class, including the generateSignedUrlByClient method, so it can call with this.generateSignedUrlByClient
    super();
  }

  async getDefaultProfileImage(): Promise<S3MessageResponse> {
    return {
      statusCode: 200,
      message:
        "https://spi-virtual-cmnty-profile-image-bucket.s3.amazonaws.com/default.png", // this is an example url
    };
  }

  async generateSignedUrlByUserId(
    userId: number
  ): Promise<S3SignedUrlAndKeyResponse> {
    try {
      const key = await generateFileName(userId);

      const clientUrl = await this.generateSignedUrlByClient({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: key,
      });

      const signedUrlResponse: S3SignedUrlAndKeyResponse = {
        ...clientUrl,
        hashedFileName: key,
      };

      return signedUrlResponse;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getImageByUserId(
    userId: number,
    key: string
  ): Promise<S3MessageResponse> {
    try {
      const image = await this.getImageFromS3({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: key,
      });

      return image;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteImageByUserId(
    userId: number,
    key: string
  ): Promise<S3MessageResponse> {
    try {
      const deletedImage = await this.deleteImageFromS3({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: key,
      });

      return deletedImage;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
