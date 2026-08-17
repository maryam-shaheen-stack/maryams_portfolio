// ============================================
// RESOURCE CONFIGS — one entry per "list" backend resource (see
// backend/README.md). Drives ResourceListPage, ResourceFormPage, and
// route generation in App.jsx — adding a resource here is the only
// step needed to get a working list/create/edit/delete admin UI for it.
//
// Image/file fields (project image, certification image) are
// deliberately left out of the `fields` arrays below — Part 6.6 wires
// those up through the dedicated upload endpoints (POST
// /:resource/:slug/image) instead of plain text inputs. Resources that
// have one of those endpoints set `hasImageUpload: true`, which tells
// ResourceFormPage to render the upload widget (edit mode only, since
// the endpoint needs an existing document to attach the image to).
//
// Personal and Social are singletons (no list, no delete) and get
// their own dedicated form pages in Part 6.5, not a config here.
//
// `reorderKey` (Part 6.7) is the property name the backend's
// `PATCH /:resource/reorder` body expects for each row — `slug` for
// every makeListRouter-based resource, `id` for skills-stack (the one
// resource addressed by Mongo _id instead of a slug). Defaults to
// idField when omitted, which is correct for every slug-based resource.
// ============================================

export const resourceConfigs = {
  projects: {
    resourceKey: "projects",
    idField: "slug",
    label: "Projects",
    singularLabel: "Project",
    hasImageUpload: true,
    columns: [
      { key: "order", label: "Order" },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "featured", label: "Featured", render: (v) => (v ? "Yes" : "") },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true, placeholder: "my-project" },
      { key: "order", label: "Order", type: "number", placeholder: "leave blank to add at the end" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "year", label: "Year", type: "text" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "category", label: "Category", type: "text" },
      { key: "shortDescription", label: "Short description", type: "textarea" },
      { key: "fullDescription", label: "Full description", type: "textarea" },
      { key: "technologies", label: "Technologies", type: "tags" },
      { key: "liveUrl", label: "Live URL", type: "text" },
      { key: "githubUrl", label: "GitHub URL", type: "text" },
    ],
  },

  skills: {
    resourceKey: "skills",
    idField: "slug",
    label: "Skills",
    singularLabel: "Skill Category",
    columns: [
      { key: "order", label: "Order" },
      { key: "label", label: "Label" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "label", label: "Label", type: "text", required: true },
      { key: "skills", label: "Skills", type: "tags" },
    ],
  },

  "skills-stack": {
    resourceKey: "skills-stack",
    idField: "_id",
    reorderKey: "id",
    label: "Skills Stack",
    singularLabel: "Skill",
    columns: [
      { key: "order", label: "Order" },
      { key: "name", label: "Name" },
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "detail", label: "Detail", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
  },

  experience: {
    resourceKey: "experience",
    idField: "slug",
    label: "Experience",
    singularLabel: "Experience",
    columns: [
      { key: "order", label: "Order" },
      { key: "role", label: "Role" },
      { key: "org", label: "Organization" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "org", label: "Organization", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "technologies", label: "Technologies", type: "tags" },
    ],
  },

  leadership: {
    resourceKey: "leadership",
    idField: "slug",
    label: "Leadership",
    singularLabel: "Leadership Role",
    columns: [
      { key: "order", label: "Order" },
      { key: "role", label: "Role" },
      { key: "org", label: "Organization" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "org", label: "Organization", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "responsibilities", label: "Responsibilities", type: "tags" },
    ],
  },

  education: {
    resourceKey: "education",
    idField: "slug",
    label: "Education",
    singularLabel: "Education Entry",
    columns: [
      { key: "order", label: "Order" },
      { key: "degree", label: "Degree" },
      { key: "institution", label: "Institution" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "degree", label: "Degree", type: "text", required: true },
      { key: "institution", label: "Institution", type: "text" },
      { key: "status", label: "Status", type: "text" },
      { key: "areas", label: "Areas", type: "tags" },
    ],
  },

  achievements: {
    resourceKey: "achievements",
    idField: "slug",
    label: "Achievements",
    singularLabel: "Achievement",
    columns: [
      { key: "order", label: "Order" },
      { key: "icon", label: "Icon" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  journey: {
    resourceKey: "journey",
    idField: "slug",
    label: "Journey",
    singularLabel: "Journey Entry",
    columns: [
      { key: "order", label: "Order" },
      { key: "period", label: "Period" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "period", label: "Period", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  research: {
    resourceKey: "research",
    idField: "slug",
    label: "Research",
    singularLabel: "Research Entry",
    columns: [
      { key: "order", label: "Order" },
      { key: "title", label: "Title" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "type", label: "Type", type: "text" },
      { key: "venue", label: "Venue", type: "text" },
      { key: "status", label: "Status", type: "text" },
      { key: "team", label: "Team", type: "tags" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  certifications: {
    resourceKey: "certifications",
    idField: "slug",
    label: "Certifications",
    singularLabel: "Certification",
    hasImageUpload: true,
    columns: [
      { key: "order", label: "Order" },
      { key: "title", label: "Title" },
      { key: "organization", label: "Organization" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "organization", label: "Organization", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "credentialUrl", label: "Credential URL", type: "text" },
    ],
  },

  services: {
    resourceKey: "services",
    idField: "slug",
    label: "Services",
    singularLabel: "Service",
    columns: [
      { key: "order", label: "Order" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "icon", label: "Icon", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "shortDescription", label: "Short description", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "deliverables", label: "Deliverables", type: "tags" },
    ],
  },
};
