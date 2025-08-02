import { db } from "@webcampus/db";

export const coeService = {
  getFrozenData: async () => {
    return db.freeze.findMany({
      where: {
        hodFrozen: true,
        adminFrozen: true,
      },
      include: {
        courseAssignment: {
          include: {
            course: true,
            faculty: {
              include: { user: true }
            },
            section: true
          }
        }
      }
    });
  },

  getFinalLockedData: async () => {
    return db.freeze.findMany({
      where: {
        finalFrozen: true,
      },
      include: {
        courseAssignment: {
          include: {
            course: true,
            section: true
          }
        }
      }
    });
  }
};
