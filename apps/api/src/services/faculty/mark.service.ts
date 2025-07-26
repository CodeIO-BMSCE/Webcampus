import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import { CreateMarkType, UpdateMarkType } from "@webcampus/schemas/faculty";

export class Mark {
  async create(data: CreateMarkType) {
    try {
      const existingMark = await db.mark.findUnique({
        where: {
          studentId_courseId: {
            studentId: data.studentId,
            courseId: data.courseId,
          },
        },
      });

      if (existingMark) {
        return {
          message: "Mark already exists for this student and course",
          data: null,
        };
      }

      const mark = await db.mark.create({
        data,
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                  displayUsername: true,
                },
              },
            },
          },
          course: true,
        },
      });

      logger.info("Mark created successfully", { mark });

      return {
        message: "Mark created successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error creating mark:", { error });
      throw new Error("Failed to create mark");
    }
  }

  async getAll() {
    try {
      const marks = await db.mark.findMany({
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                  displayUsername: true,
                },
              },
            },
          },
          course: true,
        },
      });

      return {
        message: "Marks retrieved successfully",
        data: marks,
      };
    } catch (error) {
      logger.error("Error retrieving marks:", { error });
      throw new Error("Failed to retrieve marks");
    }
  }

  async getById(id: string) {
    try {
      const mark = await db.mark.findUnique({
        where: { id },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                  displayUsername: true,
                },
              },
            },
          },
          course: true,
        },
      });

      if (!mark) {
        return {
          message: "Mark not found",
          data: null,
        };
      }

      return {
        message: "Mark retrieved successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error retrieving mark:", { error });
      throw new Error("Failed to retrieve mark");
    }
  }

  async getByStudentAndCourse(studentId: string, courseId: string) {
    try {
      const mark = await db.mark.findUnique({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                  displayUsername: true,
                },
              },
            },
          },
          course: true,
        },
      });

      if (!mark) {
        return {
          message: "Mark not found",
          data: null,
        };
      }

      return {
        message: "Mark retrieved successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error retrieving mark:", { error });
      throw new Error("Failed to retrieve mark");
    }
  }

  async update(id: string, data: UpdateMarkType) {
    try {
      const existingMark = await db.mark.findUnique({
        where: { id },
        include: {
          course: {
            include: {
              assignments: {
                include: {
                  freezes: true,
                },
              },
            },
          },
        },
      });

      if (!existingMark) {
        return {
          message: "Mark not found",
          data: null,
        };
      }
      // TODO :- Bro check if we need to fetch the first data in the assignment array or any particular one, Because I didn't had proper Idea about schema, I have done as per my knowledge (Fetching First data).
      const courseAssignment = existingMark.course.assignments[0];
      if (
        courseAssignment?.freezes[0]?.facultyFrozen ||
        courseAssignment?.freezes[0]?.hodFrozen ||
        courseAssignment?.freezes[0]?.adminFrozen
      ) {
        return {
          message:
            "Cannot update mark as it has been frozen by Faculty Or HOD or admin",
          data: null,
        };
      }

      const mark = await db.mark.update({
        where: { id },
        data,
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                  displayUsername: true,
                },
              },
            },
          },
          course: true,
        },
      });

      logger.info("Mark updated successfully", { mark });

      return {
        message: "Mark updated successfully",
        data: mark,
      };
    } catch (error) {
      logger.error("Error updating mark:", { error });
      throw new Error("Failed to update mark");
    }
  }

  async delete(id: string) {
    try {
      const existingMark = await db.mark.findUnique({
        where: { id },
        include: {
          course: {
            include: {
              assignments: {
                include: {
                  freezes: true,
                },
              },
            },
          },
        },
      });

      if (!existingMark) {
        return {
          message: "Mark not found",
          data: null,
        };
      }

      const courseAssignment = existingMark.course.assignments[0];
      if (
        courseAssignment?.freezes[0]?.facultyFrozen ||
        courseAssignment?.freezes[0]?.hodFrozen ||
        courseAssignment?.freezes[0]?.adminFrozen
      ) {
        return {
          message:
            "Cannot delete mark as it has been frozen by Faculty Or HOD or admin",
          data: null,
        };
      }

      await db.mark.delete({
        where: { id },
      });

      logger.info("Mark deleted successfully", { id });

      return {
        message: "Mark deleted successfully",
      };
    } catch (error) {
      logger.error("Error deleting mark:", { error });
      throw new Error("Failed to delete mark");
    }
  }
}

// ToDo : Bro, the Changes mentioned in my above comment has to be changed in both this file and attendance services file, if that is not correct.
