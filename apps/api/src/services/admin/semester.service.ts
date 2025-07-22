import { db, Prisma } from "@webcampus/db";
import { CreateSemesterInput } from "@webcampus/schemas/admin";

export class SemesterService {
  async createSemester(data: CreateSemesterInput, userId: string) {
    try {
      const semester = await db.semester.create({
        data: {
          ...data,
          createdBy: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
            },
          },
        },
      });
      return semester;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error(`Semester ${data.type} ${data.year} already exists`);
        }
      }
      throw error;
    }
  }

  async deleteSemester(id: string) {
    try {
      await db.semester.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Semester not found");
        }
      }
      throw error;
    }
  }
}
