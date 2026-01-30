import {
  createCallerFactory,
  createTRPCRouter,
  baseProcedure,
} from "~/server/trpc/main";
import { submitContactForm, getContactSubmissions } from "./procedures/contact";
import { getFeaturedPost, getPosts, getPostBySlug } from "./procedures/blog";
import { adminLogin } from "./procedures/admin-auth";
import {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  getAllBlogPosts,
  getPostById,
} from "./procedures/admin-blog";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
} from "./procedures/admin-video";
import {
  getVideosByCategory,
  getAllPublicVideos,
} from "./procedures/video";
import { logVisit, getAnalytics } from "./procedures/traffic";

export const appRouter = createTRPCRouter({
  contact: createTRPCRouter({
    submit: submitContactForm,
    getSubmissions: getContactSubmissions,
  }),
  blog: createTRPCRouter({
    getFeaturedPost,
    getPosts,
    getPostBySlug,
  }),
  video: createTRPCRouter({
    getByCategory: getVideosByCategory,
    getAll: getAllPublicVideos,
  }),
  admin: createTRPCRouter({
    login: adminLogin,
    blog: createTRPCRouter({
      getAll: getAllBlogPosts,
      getById: getPostById,
      create: createBlogPost,
      update: updateBlogPost,
      delete: deleteBlogPost,
    }),
    video: createTRPCRouter({
      getAll: getAllVideos,
      getById: getVideoById,
      create: createVideo,
      update: updateVideo,
      delete: deleteVideo,
    }),
  }),
  traffic: createTRPCRouter({
    log: logVisit,
    getAnalytics,
  }),
  
  // when we add a real procedure, remove this placeholder
  placeholderProcedure: baseProcedure.query(() => {
    return "placeholder";
  }),
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
