import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const createOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  const result = await prisma.profile.create({ data });
  return result;
};

const getAllUsers = async () => {
  //   const result = await prisma.user.findMany();
  //   const result = await prisma.user.findMany({
  //     select: {
  //       email: true,
  //       name: true,
  //     },
  //   });
  const result = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
  return result;
};

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return result;
};

export const userService = {
  createUser,
  createOrUpdateProfile,
  getAllUsers,
  getSingleUser,
};
