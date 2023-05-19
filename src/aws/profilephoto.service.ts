import { Service } from "typedi";

import { createPresignedUrlWithClient } from "./s3.service.js";

@Service()
export default class ProfilePhotoService {
  async generateSignedUrlByUserId(userId: number): Promise<string> {
    try {
      const clientUrl = await createPresignedUrlWithClient({
        bucket: "spi-virtual-cmnty-profile-image-bucket",
        key: userId.toString(),
      });
      return clientUrl;
    } catch (err) {
      console.error(err);
      return "error";
    }
  }
}
