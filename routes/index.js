import { Router } from "express";
import questionRouter from "./questions.js";
import optionRouter from "./options.js";

const router = Router();

router.use("/questions", questionRouter);
router.use("/options", optionRouter);

export default router;
