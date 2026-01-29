import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { minioClient, minioBaseUrl } from "~/server/minio";
import { verifyAdminToken } from "./admin-auth";

export const generateImageUploadUrl = baseProcedure
  .input(
    z.object({
      token: z.string(),
      slug: z.string(),
      imageType: z.enum(["thumbnail", "header"]),
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

    const bucketName = "blog";
    const objectName = `public/${input.imageType}s/${input.slug}.jpg`;

    // Generate presigned URL for uploading (expires in 1 hour)
    const uploadUrl = await minioClient.presignedPutObject(
      bucketName,
      objectName,
      60 * 60
    );

    // Construct the public URL for accessing the image
    const publicUrl = `${minioBaseUrl}/${bucketName}/${objectName}`;

    return {
      uploadUrl,
      publicUrl,
    };
  });

export const getMinioBaseUrl = baseProcedure.query(() => {
  return minioBaseUrl;
});

export const generateVideoCoverUploadUrl = baseProcedure
  .input(
    z.object({
      token: z.string(),
      videoId: z.string(),
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

    const bucketName = "blog";
    const objectName = `public/video-covers/${input.videoId}.jpg`;

    // Generate presigned URL for uploading (expires in 1 hour)
    const uploadUrl = await minioClient.presignedPutObject(
      bucketName,
      objectName,
      60 * 60
    );

    // Construct the public URL for accessing the image
    const publicUrl = `${minioBaseUrl}/${bucketName}/${objectName}`;

    return {
      uploadUrl,
      publicUrl,
    };
  });
