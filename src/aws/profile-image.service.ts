import { Service } from "typedi";

import S3Service from "./image.service.js";

interface IProfileImageService {
  generateSignedUrlByUserId(userId: number): Promise<string>;
  uploadImageByUserId(userId: number): Promise<string>;
  getImageByUserId(userId: number): Promise<string>;
  deleteImageByUserId(userId: number): Promise<string>;
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
  async generateSignedUrlByUserId(userId: number): Promise<string> {
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

  getImageByUserId(userId: number): Promise<string> {
    throw new Error("Method not implemented.");
  }

  uploadImageByUserId(userId: number): Promise<string> {
    throw new Error("Method not implemented.");
  }

  deleteImageByUserId(userId: number): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
