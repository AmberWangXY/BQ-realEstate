import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { db } from "~/server/db";
import { verifyAdminToken } from "./admin-auth";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generateRandomSlug(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

async function generateUniqueRandomSlug() {
  let slug = generateRandomSlug();

  while (await db.blogPost.findUnique({ where: { slug } })) {
    slug = generateRandomSlug();
  }

  return slug;
}

export const createBlogPost = baseProcedure
  .input(
    z.object({
      token: z.string(),

      titleEn: z.string(),
      titleZh: z.string(),
      keywords: z.string(),
      category: z.string(),
      contentEn: z.string(),
      contentZh: z.string(),
      excerptEn: z.string(),
      excerptZh: z.string(),
      thumbnailUrl: z
        .string()
        .optional()
        .refine((v) => !v || v.trim() === "" || /^https?:\/\//.test(v), {
          message: "Image URL must be a valid http or https URL",
        }),
      headerImage: z
        .string()
        .optional()
        .refine((v) => !v || v.trim() === "" || /^https?:\/\//.test(v), {
          message: "Image URL must be a valid http or https URL",
        }),
    })
  )
  .mutation(async ({ input }) => {
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const titleSlug = slugify(input.titleEn);
    const slug = titleSlug || (await generateUniqueRandomSlug());

    // Keep existing conflict behavior for non-empty title-based slugs.
    if (titleSlug) {
      const existing = await db.blogPost.findUnique({
        where: { slug },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A blog post with this slug already exists",
        });
      }
    }

    const post = await db.blogPost.create({
      data: {
        slug,
        titleEn: input.titleEn,
        titleZh: input.titleZh,
        keywords: input.keywords,
        category: input.category,
        publishDate: new Date(),
        contentEn: input.contentEn,
        contentZh: input.contentZh,
        excerptEn: input.excerptEn,
        excerptZh: input.excerptZh,
        thumbnailUrl: input.thumbnailUrl || null,
        headerImage: input.headerImage || null,
      },
    });

    return { success: true, post };
  });

export const deleteBlogPost = baseProcedure
  .input(
    z.object({
      token: z.string(),
      id: z.number(),
    })
  )
  .mutation(async ({ input }) => {
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const post = await db.blogPost.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog post not found",
      });
    }

    await db.blogPost.delete({
      where: { id: input.id },
    });

    return { success: true };
  });

export const updateBlogPost = baseProcedure
  .input(
    z.object({
      token: z.string(),
      id: z.number(),
      slug: z.string().optional(),
      titleEn: z.string().optional(),
      titleZh: z.string().optional(),
      keywords: z.string().optional(),
      category: z.string().optional(),
      contentEn: z.string().optional(),
      contentZh: z.string().optional(),
      excerptEn: z.string().optional(),
      excerptZh: z.string().optional(),
      thumbnailUrl: z
        .string()
        .optional()
        .refine((v) => !v || v.trim() === "" || /^https?:\/\//.test(v), {
          message: "Image URL must be a valid http or https URL",
        }),
      headerImage: z
        .string()
        .optional()
        .refine((v) => !v || v.trim() === "" || /^https?:\/\//.test(v), {
          message: "Image URL must be a valid http or https URL",
        }),
    })
  )
  .mutation(async ({ input }) => {
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const post = await db.blogPost.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog post not found",
      });
    }

    if (input.slug && input.slug !== post.slug) {
      const existing = await db.blogPost.findUnique({
        where: { slug: input.slug },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A blog post with this slug already exists",
        });
      }
    }

    const { token, id, ...updateData } = input;
    const updatedPost = await db.blogPost.update({
      where: { id: input.id },
      data: updateData,
    });

    return { success: true, post: updatedPost };
  });

export const getAllBlogPosts = baseProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const posts = await db.blogPost.findMany({
      orderBy: {
        publishDate: "desc",
      },
    });

    return posts;
  });

export const getPostById = baseProcedure
  .input(
    z.object({
      token: z.string(),
      id: z.number(),
    })
  )
  .query(async ({ input }) => {
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const post = await db.blogPost.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog post not found",
      });
    }

    return post;
  });
