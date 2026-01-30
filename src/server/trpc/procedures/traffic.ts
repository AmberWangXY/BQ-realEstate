import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { db } from "~/server/db";
import { verifyAdminToken } from "./admin-auth";

export const logVisit = baseProcedure
  .input(
    z.object({
      visitorId: z.string(),
      country: z.string().optional(),
      region: z.string().optional(),
      city: z.string().optional(),
      page: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    await db.trafficLog.create({
      data: {
        visitorId: input.visitorId,
        country: input.country || null,
        region: input.region || null,
        city: input.city || null,
        page: input.page,
      },
    });

    return { success: true };
  });

export const getAnalytics = baseProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    // Verify admin token
    if (!verifyAdminToken(input.token)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    // Get total visits
    const totalVisits = await db.trafficLog.count();

    // Get today's visits (start of day to now)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayVisits = await db.trafficLog.count({
      where: {
        createdAt: {
          gte: todayStart,
        },
      },
    });

    // Get unique visitors
    const uniqueVisitors = await db.trafficLog.groupBy({
      by: ['visitorId'],
      _count: true,
    });

    // Get top countries
    const countryStats = await db.trafficLog.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
      where: {
        country: {
          not: null,
        },
      },
    });

    // Get top pages
    const pageStats = await db.trafficLog.groupBy({
      by: ['page'],
      _count: true,
      orderBy: {
        _count: {
          page: 'desc',
        },
      },
      take: 10,
    });

    // Get recent visits (last 100)
    const recentVisits = await db.trafficLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });

    // Get visits by day for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const visitsLast30Days = await db.trafficLog.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Group by day
    const visitsByDay: Record<string, number> = {};
    visitsLast30Days.forEach((visit) => {
      const day = visit.createdAt.toISOString().split('T')[0];
      const safeDay = day ?? "unknown";
      visitsByDay[safeDay] = (visitsByDay[safeDay] ?? 0) + 1;

    });

    return {
      totalVisits,
      todayVisits,
      uniqueVisitors: uniqueVisitors.length,
      topCountries: countryStats.map((stat) => ({
        country: stat.country || 'Unknown',
        count: stat._count,
      })),
      topPages: pageStats.map((stat) => ({
        page: stat.page,
        count: stat._count,
      })),
      recentVisits: recentVisits.map((visit) => ({
        id: visit.id,
        createdAt: visit.createdAt,
        country: visit.country,
        region: visit.region,
        city: visit.city,
        page: visit.page,
      })),
      visitsByDay,
    };
  });
