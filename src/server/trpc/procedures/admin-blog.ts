import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { db } from "~/server/db";
import { verifyAdminToken } from "./admin-auth";

export const createBlogPost = baseProcedure
  .input(
    z.object({
      token: z.string(),
      slug: z.string(),
      titleEn: z.string(),
      titleZh: z.string(),
      keywords: z.string(),
      category: z.string(),
      contentEn: z.string(),
      contentZh: z.string(),
      excerptEn: z.string(),
      excerptZh: z.string(),
      thumbnailUrl: z.string().optional(),
      headerImage: z.string().optional(),
    })
  )
  .mutation(async ({ input }) => {
    // Verify admin token
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    // Check if slug already exists
    const existing = await db.blogPost.findUnique({
      where: { slug: input.slug },
    });

    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A blog post with this slug already exists",
      });
    }

    // Create the blog post
    const post = await db.blogPost.create({
      data: {
        slug: input.slug,
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
    // Verify admin token
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    // Check if post exists
    const post = await db.blogPost.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog post not found",
      });
    }

    // Delete the post
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
      thumbnailUrl: z.string().optional(),
      headerImage: z.string().optional(),
    })
  )
  .mutation(async ({ input }) => {
    // Verify admin token
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    // Check if post exists
    const post = await db.blogPost.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog post not found",
      });
    }

    // If slug is being changed, check for conflicts
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

    // Update the post
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
    // Verify admin token
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
    // Verify admin token
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
