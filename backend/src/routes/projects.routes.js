import { makeListRouter } from "./makeListRouter.js";
import Project from "../models/Project.js";
import { attachImageUploadRoute } from "./helpers/attachImageUpload.js";

const router = makeListRouter(Project, { filterableFields: ["featured"] });
attachImageUploadRoute(router, Project, { folder: "portfolio/projects" });

export default router;
