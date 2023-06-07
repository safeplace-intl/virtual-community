import { Service } from "typedi";

import S3Service, { genericAWSErrorMessage } from "../../aws/image.service.js";
import { S3Response } from "../../core/dto/profile.dto.js";
import { generateSlug } from "../../utils/S3keyEncryp.util.js";

interface IProfileImageService {
  generateSignedUrlByUserId(userId: number): Promise<S3Response>;
  getImageByUserId(userId: number): Promise<S3Response>;
  deleteImageByUserId(userId: number): Promise<S3Response>;
}

@Service()
export default class ProfileImageService
  extends S3Service
  implements IProfileImageService
{
  constructor() {
    // calling super means that this service will inherit the methods from the S3Service class, including the generateSignedUrlByClient method, so it can call with this.generateSignedUrlByClient
    super();
  }

  async generateSignedUrlByUserId(userId: number): Promise<S3Response> {
    try {
      const key = await generateSlug(userId);
      console.log(key);
      const clientUrl = await this.generateSignedUrlByClient({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: key,
      });
      return clientUrl;
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        message: genericAWSErrorMessage,
      };
    }
  }

  async getImageByUserId(userId: number): Promise<S3Response> {
    try {
      const imageStr = await this.getImageFromS3({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: userId.toString(),
      });
      return imageStr;
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        message: genericAWSErrorMessage,
      };
    }
  }

  async deleteImageByUserId(userId: number): Promise<S3Response> {
    try {
      const deleted = await this.deleteImageFromS3({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: userId.toString(),
      });
      return deleted;
    } catch (err) {
      return {
        statusCode: 500,
        message: genericAWSErrorMessage,
      };
    }
  }
}
