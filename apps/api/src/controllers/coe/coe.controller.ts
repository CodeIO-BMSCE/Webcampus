import { Request, Response } from "express";
import { coeService } from "../../services/coe/coe.service";

export const getFrozenData = async (_req: Request, res: Response) => {
  const data = await coeService.getFrozenData();
  return res.json({ data });
};

export const getFinalLockedData = async (_req: Request, res: Response) => {
  const data = await coeService.getFinalLockedData();
  return res.json({ data });
};

