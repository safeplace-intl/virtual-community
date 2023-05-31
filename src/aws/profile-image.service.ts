import { Service } from "typedi";

import { S3Response } from "../core/dto/profile.dto.js";
import S3Service from "./image.service.js";
//import

interface IProfileImageService {
  generateSignedUrlByUserId(userId: number): Promise<S3Response | string>;
  uploadImageByUserId(userId: number): Promise<string>;
  getImageByUserId(userId: number): Promise<S3Response | string>;
  deleteImageByUserId(userId: number): Promise<S3Response> | string;
}

// ! This is where you will implement the other methods for the profile photo service, and then profile service will utilize them

@Service()
export default class ProfileImageService
  extends S3Service
  implements IProfileImageService
{
  constructor() {
    // calling super means that this service will inherit the methods from the S3Service class, including the generateSignedUrlByClient method, so it can call with this.generateSignedUrlByClient
    super();
  }
  async generateSignedUrlByUserId(
    userId: number
  ): Promise<S3Response | string> {
    try {
      const clientUrl = await this.generateSignedUrlByClient({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: userId.toString(),
      });
      return clientUrl;
    } catch (err) {
      console.error(err);
      return "error";
    }
  }

  async getImageByUserId(userId: number): Promise<S3Response | string> {
    try {
      const imageStr = await this.getImageFromS3({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: userId.toString(),
      });
      return imageStr;
    } catch (err) {
      console.error(err);
      return "error";
    }
  }

  uploadImageByUserId(userId: number): Promise<string> {
    throw new Error("Method not implemented.");
    //not sure how to implement this method as I can't pass in
  }

  deleteImageByUserId(userId: number): Promise<S3Response> | string {
    try {
      const deleted = this.deleteImageFromS3({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: userId.toString(),
      });

      return deleted;
    } catch (err) {
      console.error(err);
      return "error occured";
      //return "error in profile image service";
    }
  }
}
