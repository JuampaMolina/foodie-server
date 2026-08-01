import { v2 as cloudinary } from "cloudinary";

const CATEGORIES_FOLDER = "foodie/categories";

export default (function () {
  // Firma pura (sin red ni config global): dado un secreto y unos params,
  // calcula lo que Cloudinary espera para validar la subida. Separado de
  // getUploadSignature() para poder testearlo sin variables de entorno.
  const signParams = (params, apiSecret) =>
    cloudinary.utils.api_sign_request(params, apiSecret);

  const getUploadSignature = ({ cloudName, apiKey, apiSecret }) => {
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary no está configurado en el servidor");
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = CATEGORIES_FOLDER;
    const signature = signParams({ timestamp, folder }, apiSecret);

    return { timestamp, folder, signature, apiKey, cloudName };
  };

  return { getUploadSignature, signParams };
})();
