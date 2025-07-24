import { IncomingHttpHeaders } from "http";
import { auth, fromNodeHeaders } from "@webcampus/auth";
import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import {
  CreateHODDTO,
  HODResponseDTO,
  HODResponseSchema,
} from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";

export class HODService {
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
        throw new Error("HOD not found");
      }
      const response: BaseResponse<HODResponseDTO> = {
        message: "HOD fetched successfully",
        data: HODResponseSchema.parse(hod),
      };
      logger.info("HOD fetched successfully", { hod });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      logger.error("Failed to get HOD", error);
      throw new Error("Failed to get HOD");
    }
  }
  /**
   * Creates a new HOD
   * @param data - The data for the HOD
   * @returns The created HOD
   */
  static async create(
    data: CreateHODDTO,
    headers: IncomingHttpHeaders
  ): Promise<BaseResponse<HODResponseDTO>> {
    try {
      /**
       * Check if the HOD already exists
       * If it does, throw an error
       * If it doesn't, continue with the creation
       */
      const hodResponse = await HODService.get(data.departmentName);
      if (hodResponse.data) {
        throw new Error("HOD already exists");
      }
      /**
       * Set the role of the user to HOD
       */
      const { user } = await auth.api.setRole({
        /**
         * For some reason, the headers are not being passed to the auth service
         * So we need to pass them manually
         */
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

      /**
       * Create the HOD in the database
       */
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
        message: "HOD created successfully",
        data: HODResponseSchema.parse(hod),
      };
      logger.info("HOD created successfully", { hod });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      logger.error("Failed to create HOD", error);
      throw new Error("Failed to create HOD");
    }
  }
}
