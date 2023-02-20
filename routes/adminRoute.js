import express from 'express';
import { changeStatus, deleteUser, getAllUsers, getSingleUser, updateUser } from '../controller/adminController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/getAllUsers").get(isAdmin,getAllUsers);
router.route("/getSingleUser/:userId").get(isAdmin,getSingleUser);
router.route("/deleteUser/:userId").delete(isAdmin,deleteUser);
router.route("/updateUser/:userId").put(isAdmin,updateUser);
router.route("/changeStatus/:userId").put(changeStatus);

export default router;