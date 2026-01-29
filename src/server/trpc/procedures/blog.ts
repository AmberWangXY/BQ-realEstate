import { z } from "zod";
import { baseProcedure } from "../main";
import { db } from "~/server/db";

export const getFeaturedPost = baseProcedure.query(async () => {
  const post = await db.blogPost.findFirst({
    orderBy: {
      publishDate: "desc",
    },
  });

  return post;
});

export const getPosts = baseProcedure
  .input(
    z.object({
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(50).default(9),
      category: z.string().optional(),
      excludeId: z.number().optional(), // To exclude the featured post
    })
  )
  .query(async ({ input }) => {
    const { page, pageSize, category, excludeId } = input;
    const skip = (page - 1) * pageSize;

    // Build the where clause for filtering posts
    // When category is provided, we filter by exact match on the stable category key
    // (e.g., "buying-tips", "selling-strategies", etc.)
    // When category is undefined/null, we show all posts (no category filter)
    const where = {
      // Filter by exact category match using stable internal keys
      ...(category ? { category: category } : {}),
      // Exclude the featured post if specified
      ...(excludeId ? { id: { not: excludeId } } : {}),
    };

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: {
          publishDate: "desc",
        },
        skip,
        take: pageSize,
      }),
      db.blogPost.count({ where }),
    ]);

    return {
      posts,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  });

export const getPostBySlug = baseProcedure
  .input(
    z.object({
      slug: z.string(),
    })
  )
  .query(async ({ input }) => {
    const post = await db.blogPost.findUnique({
      where: {
        slug: input.slug,
      },
    });

    if (!post) {
      throw new Error("Blog post not found");
    }

    return post;
  });
