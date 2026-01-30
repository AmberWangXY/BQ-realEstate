import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { db } from "~/server/db";
import { verifyAdminToken } from "./admin-auth";

export const createVideo = baseProcedure
  .input(
    z.object({
      token: z.string(),
      titleEn: z.string().min(1, "English title is required"),
      titleZh: z.string().min(1, "Chinese title is required"),
      videoUrl: z.string().url("Valid video URL is required"),
      category: z.enum(["buying", "selling", "tips"], {
        errorMap: () => ({ message: "Category must be buying, selling, or tips" }),
      }),
      coverImageUrl: z
        .string()
        .min(1, "Cover image URL is required")
        .refine((v) => /^https?:\/\//.test(v), {
          message: "Cover image URL must be a valid http or https URL",
        }),
      duration: z.string().regex(/^\d{1,2}:\d{2}$/, "Duration must be in format MM:SS or HH:MM:SS"),
      views: z.string().min(1, "Views count is required"),
      displayOrder: z.number().int().default(0),
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

    const { token, ...videoData } = input;

    // Check if a video with this URL already exists
    const existingVideo = await db.video.findUnique({
      where: { videoUrl: videoData.videoUrl },
    });

    if (existingVideo) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A video with this URL already exists",
      });
    }

    // Create the video
    const video = await db.video.create({
      data: videoData,
    });

    return { success: true, video };
  });

export const updateVideo = baseProcedure
  .input(
    z.object({
      token: z.string(),
      id: z.number(),
      titleEn: z.string().min(1).optional(),
      titleZh: z.string().min(1).optional(),
      videoUrl: z.string().url().optional(),
      category: z.enum(["buying", "selling", "tips"]).optional(),
      coverImageUrl: z
        .string()
        .optional()
        .refine((v) => v === undefined || v === "" || /^https?:\/\//.test(v), {
          message: "Cover image URL must be a valid http or https URL",
        }),
      duration: z.string().regex(/^\d{1,2}:\d{2}$/).optional(),
      views: z.string().min(1).optional(),
      displayOrder: z.number().int().optional(),
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

    // Check if video exists
    const video = await db.video.findUnique({
      where: { id: input.id },
    });

    if (!video) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Video not found",
      });
    }

    // Update the video (omit empty optional strings so we don't overwrite with "")
    const { token, id, ...rest } = input;
    const updateData: Record<string, unknown> = { ...rest };
    if (updateData.coverImageUrl === "" || updateData.coverImageUrl === undefined) {
      delete updateData.coverImageUrl;
    }

    // If updating the video URL, check if another video already has that URL
    if (updateData.videoUrl) {
      const existingVideo = await db.video.findUnique({
        where: { videoUrl: updateData.videoUrl as string },
      });

      if (existingVideo && existingVideo.id !== input.id) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A video with this URL already exists",
        });
      }
    }

    const updatedVideo = await db.video.update({
      where: { id: input.id },
      data: updateData as Parameters<typeof db.video.update>[0]["data"],
    });

    return { success: true, video: updatedVideo };
  });

export const deleteVideo = baseProcedure
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

    // Check if video exists
    const video = await db.video.findUnique({
      where: { id: input.id },
    });

    if (!video) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Video not found",
      });
    }

    // Delete the video
    await db.video.delete({
      where: { id: input.id },
    });

    return { success: true };
  });

export const getAllVideos = baseProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    // Verify admin token
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const videos = await db.video.findMany({
      orderBy: [
        { category: "asc" },
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return videos;
  });

export const getVideoById = baseProcedure
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

    const video = await db.video.findUnique({
      where: { id: input.id },
    });

    if (!video) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Video not found",
      });
    }

    return video;
  });
