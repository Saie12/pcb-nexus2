import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
    }).index("email", ["email"]),

    projects: defineTable({
      title: v.string(),
      slug: v.string(),
      summary: v.string(),
      heroImage: v.string(),
      featured: v.boolean(),
      technologies: v.array(v.string()),
      concept: v.string(),
      layoutStrategy: v.string(),
      challenges: v.string(),
      schematicImage: v.optional(v.string()),
      pcbLayoutImages: v.optional(v.array(v.string())),
      view3dImages: v.optional(v.array(v.string())),
      layoutImages: v.array(v.string()),
      githubUrl: v.optional(v.string()),
      demoUrl: v.optional(v.string()),
      order: v.number(),
    }).index("by_slug", ["slug"]),

    contacts: defineTable({
      name: v.string(),
      email: v.string(),
      subject: v.string(),
      message: v.string(),
      status: v.string(),
    }).index("by_status", ["status"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;