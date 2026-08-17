/**
 * One-time (idempotent — safe to re-run) seed script. Reads directly
 * from the frontend's `src/data/*.js` files so there is exactly one
 * source of truth for your real content — nothing is duplicated or
 * invented here. Run with `npm run seed` from `backend/`.
 *
 * NOTE: this file reaches across into `../frontend` on purpose, for
 * local seeding convenience only. The running server (server.js) never
 * imports from frontend — this coupling is local-dev-only and fine to
 * delete once the admin dashboard is your actual source of truth.
 */
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import mongoose from "mongoose";

import Personal from "../models/Personal.js";
import Social from "../models/Social.js";
import Project from "../models/Project.js";
import SkillCategory from "../models/SkillCategory.js";
import SkillStackItem from "../models/SkillStackItem.js";
import Experience from "../models/Experience.js";
import Leadership from "../models/Leadership.js";
import Education from "../models/Education.js";
import Achievement from "../models/Achievement.js";
import Journey from "../models/Journey.js";
import Research from "../models/Research.js";
import Certification from "../models/Certification.js";
import Service from "../models/Service.js";

import { personal } from "../../../frontend/src/data/personal.js";
import { social } from "../../../frontend/src/data/social.js";
import { projects } from "../../../frontend/src/data/projects.js";
import { skillCategories } from "../../../frontend/src/data/skills.js";
import { skillsStack } from "../../../frontend/src/data/skillsStack.js";
import { experience, leadership } from "../../../frontend/src/data/experience.js";
import { education } from "../../../frontend/src/data/education.js";
import { achievements, journey } from "../../../frontend/src/data/achievements.js";
import { research } from "../../../frontend/src/data/research.js";
import { certifications } from "../../../frontend/src/data/certifications.js";
import { services } from "../../../frontend/src/data/services.js";

async function upsertSingleton(Model, data) {
  const existing = await Model.findOne();
  if (existing) {
    Object.assign(existing, data);
    await existing.save();
    return "updated";
  }
  await Model.create(data);
  return "created";
}

async function upsertBySlug(Model, docs, slugKey = "id") {
  let created = 0;
  let updated = 0;
  for (const doc of docs) {
    const { [slugKey]: slug, ...rest } = doc;
    const result = await Model.findOneAndUpdate(
      { slug },
      { slug, ...rest },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    // findOneAndUpdate with upsert doesn't tell us created vs updated
    // directly without extra options; good enough to just count total.
    result ? updated++ : created++;
  }
  return { created, updated, total: docs.length };
}

async function run() {
  await connectDB();

  console.log("[seed] Personal...");
  await upsertSingleton(Personal, {
    name: personal.name,
    firstName: personal.firstName,
    lastName: personal.lastName,
    hero: {
      headline: personal.hero.headline,
      tagline: personal.hero.tagline,
      intro: personal.hero.intro,
      photo: personal.hero.photo,
    },
    about: personal.about,
    contact: {
      heading: personal.contact.heading,
      subheading: personal.contact.subheading,
      email: personal.contact.email,
    },
    footer: personal.footer,
  });

  console.log("[seed] Social...");
  await upsertSingleton(Social, social);

  console.log("[seed] Projects...");
  console.log(await upsertBySlug(Project, projects));

  console.log("[seed] Skill categories...");
  console.log(await upsertBySlug(SkillCategory, skillCategories));

  console.log("[seed] Skill stack items...");
  await SkillStackItem.deleteMany({});
  await SkillStackItem.insertMany(skillsStack.map((s, i) => ({ ...s, order: i + 1 })));

  console.log("[seed] Experience...");
  console.log(await upsertBySlug(Experience, experience));

  console.log("[seed] Leadership...");
  console.log(await upsertBySlug(Leadership, leadership));

  console.log("[seed] Education...");
  console.log(await upsertBySlug(Education, education));

  console.log("[seed] Achievements...");
  console.log(await upsertBySlug(Achievement, achievements));

  console.log("[seed] Journey...");
  console.log(await upsertBySlug(Journey, journey));

  console.log("[seed] Research...");
  console.log(await upsertBySlug(Research, research));

  console.log("[seed] Certifications...");
  console.log(await upsertBySlug(Certification, certifications));

  console.log("[seed] Services...");
  console.log(await upsertBySlug(Service, services));

  console.log("[seed] Done.");
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
