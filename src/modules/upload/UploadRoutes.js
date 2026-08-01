import express from "express";
import UploadController from "./UploadController.js";
import requireAdmin from "../../middleware/requireAdmin.js";

const router = express.Router();

// Sólo firma la subida (nunca recibe el archivo): el cliente sube el
// binario directo a Cloudinary con esta firma, sin pasar por este servidor.
router.get("/signature", requireAdmin(), UploadController.getSignature);

export default router;
