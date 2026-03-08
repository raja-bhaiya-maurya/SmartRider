const express= require('express')
const router= express.Router()
const captainController= require('../controllers/captainController')
const {body}=require('express-validator')
const captainAuthMiddleware= require("../middleware/captainAuth.middleware")


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must be at least 3 char long"),
    body('email').isEmail().withMessage("invalid email address"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 char long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],captainController.captainRegister)
 
router.post('/login',[
    body('email').isEmail().withMessage("invalid email address"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 char long")
],captainController.captainLogin)

router.get('/profile',captainAuthMiddleware.authCaptain, captainController.captainProfile)

router.get('/logout',captainAuthMiddleware.authCaptain,captainController.captainLogout)
module.exports=router