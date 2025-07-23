import { SemesterService } from "@webcampus/api/src/services/admin/semester.service";
import { auth, fromNodeHeaders } from "@webcampus/auth";
import { CreateSemesterInput } from "@webcampus/schemas/admin";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const semesterService = new SemesterService();

export class SemesterController {
  async createSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateSemesterInput = req.body;
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const semester = await semesterService.createSemester(
        request,
        String(session?.user.id)
      );

      res.status(201).json({
        success: true,
        message: "Semester created successfully",
        data: semester,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: z.treeifyError(error),
        });
      }
      next(error);
    }
  }
}
