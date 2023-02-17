import { Router } from "express";
import {
  getQuestion,
  create,
  createOption,
  deleteQuestion,
} from "../controllers/api/questions_api.js";

const router = Router();

router.get("/:id", getQuestion);
router.post("/create", create);
router.post("/:id/options/create", createOption);
router.delete("/:id/delete", deleteQuestion);

export default router;
