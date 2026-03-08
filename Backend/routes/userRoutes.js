const express= require('express')
const router= express.Router()
const userController= require('../controllers/userController')
const {body}=require('express-validator')
const authMiddleware= require("../middleware/auth.middleware")

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must be at least 3 char long"),
    body('email').isEmail().withMessage("invalid email address"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 char long")
],userController.userRegister)
 
router.post('/login',[
    body('email').isEmail().withMessage("invalid email address"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 char long")
],userController.userLogin)

router.get('/profile',authMiddleware.authUser, userController.userProfile)

router.get('/logout',authMiddleware.authUser,userController.userLogout)
module.exports=router