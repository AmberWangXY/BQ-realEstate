import { z } from "zod";
import { baseProcedure } from "../main";
import { db } from "~/server/db";

export const getVideosByCategory = baseProcedure
  .input(
    z.object({
      category: z.enum(["buying", "selling", "tips"]),
    })
  )
  .query(async ({ input }) => {
    const videos = await db.video.findMany({
      where: {
        category: input.category,
      },
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return videos;
  });

export const getAllPublicVideos = baseProcedure.query(async () => {
  const videos = await db.video.findMany({
    orderBy: [
      { category: "asc" },
      { displayOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  return videos;
});
