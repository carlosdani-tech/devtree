import { body } from 'express-validator'
import { Router } from "express";
import { createAccount, getUser, login, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

const router = Router();

router.post("/auth/register", 
    body('handle').notEmpty().withMessage('El handle no puede estar vacio'),
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('email').isEmail().withMessage('Email incorrecto'),
    body('password').isLength({min: 8}).withMessage('La contrasena tiene que tener minimo 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post("/auth/login",     
    body('email').isEmail().withMessage('Email incorrecto'),
    body('password').notEmpty().withMessage('La contrasena es obligatoria'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)
router.patch('/user',
    body('handle').notEmpty().withMessage('El handle no puede estar vacio'),
    body('description').notEmpty().withMessage('La descripcion no puede estar vacia'), 
    handleInputErrors, 
    authenticate, 
    updateProfile)

router.post('/user/image', authenticate, uploadImage)

export default router;