import express from 'express';
import { deleteUser, getAllUsers, getSingleUser, updateUser } from '../controller/adminController.js';

const router = express.Router();

router.route("/getAllUsers").get(getAllUsers);
router.route("/getSingleUser/:userId").get(getSingleUser);
router.route("/deleteUser/:userId").delete(deleteUser);
router.route("/updateUser/:userId").put(updateUser);

export default router;