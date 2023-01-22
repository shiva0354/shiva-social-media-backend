import { Router } from "express";
import multer from "multer";
import * as authcontroller from "../controllers/authcontroller.js";
import * as usercontroller from "../controllers/usercontroller.js";
import * as postcontroller from "../controllers/postcontroller.js";
import { authVerify } from "../middlewares/auth.js";
import * as userrequest from "../requests/userrequest.js"
import * as postrequest from "../requests/postrequest.js"

const router = Router()
/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });


router.get('/', (req, res) => {
    return success(res, 'Hello !!!')
})

router.post('/login/otp', userrequest.generateOtp, authcontroller.sendLoginOtp)
router.post('/login/otp/validate', userrequest.validateOtp, authcontroller.validateLoginOtp)
router.post('/login', userrequest.login, authcontroller.login)
router.post('/register', upload.single("picture"), authcontroller.register)

/* READ */
router.get("/users/:id", authVerify, usercontroller.getUser);
router.get("/users/:id/friends", authVerify, usercontroller.getUserFriends);
router.patch("/users/:id/:friendId", authVerify, usercontroller.addRemoveFriend);

router.get("/posts", authVerify, postcontroller.getFeedPosts);
router.post("/posts", authVerify, postrequest.create,upload.single("picture"), postcontroller.createPost);
router.get("/posts/:userId/posts", authVerify, postcontroller.getUserPosts);
router.patch("/posts/:id/like", authVerify, postcontroller.likePost);

export default router