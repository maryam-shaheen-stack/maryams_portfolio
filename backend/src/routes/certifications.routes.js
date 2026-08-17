import { makeListRouter } from "./makeListRouter.js";
import Certification from "../models/Certification.js";
import { attachImageUploadRoute } from "./helpers/attachImageUpload.js";

const router = makeListRouter(Certification);
attachImageUploadRoute(router, Certification, { folder: "portfolio/certifications" });

export default router;
