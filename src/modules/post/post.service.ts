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

const getAllPosts = async (options: any) => {
  let { sortBy, sortOrder, searchTerm, limit, page } = options;

  limit = parseInt(limit);
  page = parseInt(page);
  const skip = (page - 1) * limit || 0;
  const take = limit || 10;

  return await prisma.$transaction(async (prismaTransaction) => {
    const result = await prismaTransaction.post.findMany({
      skip,
      take,
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

    const total = await prismaTransaction.post.count();

    return {
      data: result,
      total,
    };
  });
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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: { id },
  });
  return result;
};

const learnAggregateAndGroupting = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  //   _sum: {
  //     authorId: true,
  //   },
  // });
  const result = await prisma.post.groupBy({
    // by: ["title"],
    by: ["authorId"],
    _count: {
      authorId: true,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  learnAggregateAndGroupting,
};
