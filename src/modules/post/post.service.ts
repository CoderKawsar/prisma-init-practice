import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getAllPosts = async (options: any): Promise<Post[]> => {
  const { sortBy, sortOrder, searchTerm } = options;
  const result = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  return result;
};

const getSinglePost = async (id: number): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  getSinglePost,
};
