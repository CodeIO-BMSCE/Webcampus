import { UserService } from "@webcampus/api/src/services/admin/user.service";
import { logger } from "@webcampus/common/logger";
import { db } from "@webcampus/db";
import { CreateUserType } from "@webcampus/schemas/admin";
import {
  CreateDepartmentDTO,
  DepartmentResponseDTO,
} from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";

/**
 * Service class for department operations.
 *
 * This class provides methods to create departments and retrieve department information.
 * It handles the creation of department records and their associated users.
 *
 * @remarks
 * This class is responsible for interacting with the database to perform CRUD operations on department data.
 */
export class DepartmentService {
  /**
   * Creates a new department.
   *
   * This method creates a new department record in the database and associates it with a user.
   * It also creates a new user record if the user does not exist.
   *
   * @param request - The request object containing department and user information.
   * @returns A promise that resolves to a BaseResponse object containing the created department information.
   */
  static async create(
    request: CreateDepartmentDTO & CreateUserType
  ): Promise<BaseResponse<DepartmentResponseDTO>> {
    try {
      const userService = new UserService({
        request: {
          email: request.email,
          password: request.password,
          name: request.name,
          username: request.username,
          role: request.role,
        },
      });
      const user = await userService.create();
      if (user.status === "error") {
        throw new Error(user.message);
      }
      const department = await db.department.create({
        data: {
          name: request.name,
          user: {
            connect: {
              id: user.data?.id,
            },
          },
        },
      });
      const response: BaseResponse<DepartmentResponseDTO> = {
        status: "success",
        message: "Department created successfully",
        data: department,
      };
      logger.info(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      logger.error(`Failed to create department`, error);
      throw new Error("Failed to create department");
    }
  }

  /**
   * Retrieves all departments.
   *
   * This method fetches all department records from the database.
   *
   * @returns A promise that resolves to a BaseResponse object containing an array of department information.
   */
  static async getDepartments(): Promise<
    BaseResponse<DepartmentResponseDTO[]>
  > {
    try {
      const departments = await db.department.findMany({});
      const response: BaseResponse<DepartmentResponseDTO[]> = {
        status: "success",
        message: "Departments fetched successfully",
        data: departments,
      };
      logger.info(response);
      return response;
    } catch (error) {
      logger.error(`Failed to get departments`, error);
      throw new Error("Failed to get departments");
    }
  }
}
