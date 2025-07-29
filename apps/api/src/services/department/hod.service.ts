import { IncomingHttpHeaders } from "http";
import { auth, fromNodeHeaders } from "@webcampus/auth";
import { MESSAGES } from "@webcampus/backend-utils/messages";
import { logger } from "@webcampus/common/logger";
import { db, Prisma } from "@webcampus/db";
import {
  CreateHODDTO,
  HODResponseDTO,
  HODResponseSchema,
  RemoveHODDTO,
} from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";

export class HODService {
  static async checkIfHODExists(departmentName: string): Promise<boolean> {
    try {
      const hod = await db.hod.findUnique({
        where: {
          departmentName: departmentName,
        },
      });
      return !!hod;
    } catch (error) {
      logger.error(MESSAGES.HOD.FAILED_TO_CHECK_IF_HOD_EXISTS, error);
      throw new Error(MESSAGES.HOD.FAILED_TO_CHECK_IF_HOD_EXISTS);
    }
  }
  static async get(
    departmentName: string
  ): Promise<BaseResponse<HODResponseDTO>> {
    try {
      const hod = await db.hod.findUnique({
        where: {
          departmentName: departmentName,
        },
      });
      if (!hod) {
        throw new Error(MESSAGES.HOD.NOT_FOUND);
      }
      const response: BaseResponse<HODResponseDTO> = {
        status: "success",
        message: MESSAGES.HOD.GET,
        data: HODResponseSchema.parse(hod),
      };
      logger.info(response.message, { hod });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      logger.error(MESSAGES.HOD.FAILED_TO_GET, error);
      throw new Error(MESSAGES.HOD.FAILED_TO_GET);
    }
  }
  static async create(
    data: CreateHODDTO,
    headers: IncomingHttpHeaders
  ): Promise<BaseResponse<HODResponseDTO>> {
    try {
      const hodExists = await HODService.checkIfHODExists(data.departmentName);
      if (hodExists) {
        throw new Error(MESSAGES.HOD.CHECK_IF_HOD_EXISTS);
      }
      const { user } = await auth.api.setRole({
        headers: fromNodeHeaders(headers),
        body: {
          userId: data.userId,
          role: ["hod"],
        },
      });
      if (!user) {
        logger.error("Failed to change role to HOD", { userId: data.userId });
        throw new Error("Failed to change role to HOD");
      }
      logger.info("Role changed to HOD", { userId: data.userId });
      const hod = await db.hod.create({
        data: {
          ...data,
          department: {
            connect: {
              name: data.departmentName,
            },
          },
        },
      });
      const response: BaseResponse<HODResponseDTO> = {
        status: "success",
        message: MESSAGES.HOD.CREATE,
        data: HODResponseSchema.parse(hod),
      };
      logger.info(response.message, { hod });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      logger.error(MESSAGES.HOD.FAILED_TO_CREATE, error);
      throw new Error(MESSAGES.HOD.FAILED_TO_CREATE);
    }
  }

  static async remove(
    data: RemoveHODDTO,
    headers: IncomingHttpHeaders
  ): Promise<BaseResponse<HODResponseDTO>> {
    try {
      const { user } = await auth.api.setRole({
        headers: fromNodeHeaders(headers),
        body: {
          userId: data.userId,
          role: ["faculty"],
        },
      });
      if (!user) {
        logger.error("Failed to change role to faculty", {
          userId: data.userId,
        });
        throw new Error("Failed to change role to faculty");
      }
      logger.info("Role changed to faculty", { userId: data.userId });
      const hod = await db.hod.delete({
        where: {
          departmentName: data.departmentName,
        },
      });
      const response: BaseResponse<HODResponseDTO> = {
        status: "success",
        message: MESSAGES.HOD.REMOVE,
        data: HODResponseSchema.parse(hod),
      };
      logger.info(response.message, { hod });
      return response;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error(MESSAGES.HOD.NOT_FOUND);
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      logger.error(MESSAGES.HOD.FAILED_TO_REMOVE, error);
      throw new Error(MESSAGES.HOD.FAILED_TO_REMOVE);
    }
  }
}
