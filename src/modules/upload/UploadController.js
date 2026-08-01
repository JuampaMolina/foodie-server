import env from "../../config/env.js";
import UploadService from "./UploadService.js";

export default (function () {
  const getSignature = (req, res) => {
    try {
      const signature = UploadService.getUploadSignature({
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        apiSecret: env.CLOUDINARY_API_SECRET,
      });
      return res.status(200).json(signature);
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  };

  return { getSignature };
})();
