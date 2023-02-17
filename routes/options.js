import { Router } from "express";
import { addVote, deleteOption } from "../controllers/api/options_api.js";

const router = Router();

router.put("/:id/add_vote", addVote);
router.delete("/:id/delete", deleteOption);

export default router;
