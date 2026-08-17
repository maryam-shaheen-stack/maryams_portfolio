import { Router } from "express";

import authRoutes from "./auth.routes.js";
import personalRoutes from "./personal.routes.js";
import socialRoutes from "./social.routes.js";
import cvRoutes from "./cv.routes.js";
import projectsRoutes from "./projects.routes.js";
import skillsRoutes from "./skills.routes.js";
import skillsStackRoutes from "./skills-stack.routes.js";
import experienceRoutes from "./experience.routes.js";
import leadershipRoutes from "./leadership.routes.js";
import educationRoutes from "./education.routes.js";
import achievementsRoutes from "./achievements.routes.js";
import journeyRoutes from "./journey.routes.js";
import researchRoutes from "./research.routes.js";
import certificationsRoutes from "./certifications.routes.js";
import servicesRoutes from "./services.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    name: "Maryam Portfolio API",
    status: "ok",
    endpoints: [
      "/api/auth/login",
      "/api/personal",
      "/api/social",
      "/api/cv",
      "/api/cv/download",
      "/api/projects",
      "/api/skills",
      "/api/skills-stack",
      "/api/experience",
      "/api/leadership",
      "/api/education",
      "/api/achievements",
      "/api/journey",
      "/api/research",
      "/api/certifications",
      "/api/services",
    ],
  });
});

router.use("/auth", authRoutes);
router.use("/personal", personalRoutes);
router.use("/social", socialRoutes);
router.use("/cv", cvRoutes);
router.use("/projects", projectsRoutes);
router.use("/skills", skillsRoutes);
router.use("/skills-stack", skillsStackRoutes);
router.use("/experience", experienceRoutes);
router.use("/leadership", leadershipRoutes);
router.use("/education", educationRoutes);
router.use("/achievements", achievementsRoutes);
router.use("/journey", journeyRoutes);
router.use("/research", researchRoutes);
router.use("/certifications", certificationsRoutes);
router.use("/services", servicesRoutes);

export default router;
