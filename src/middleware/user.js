const { body, } = require('express-validator');
module.exports = {
    userValidation: () => [
        body('firstName', 'firstName is required').exists().trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('firstName must be between 1 and 100'),
        body('lastName', 'lastName is required').exists().trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('lastName must be between 1 and 100'),
        body('age', 'age is required').toInt().isNumeric().exists()
            .isInt({ max: 100 })
            .withMessage('Age is Required Must be Between 1 to 100'),
        body('gender', 'gender is required').exists().trim()
            .isLength({ min: 1, max: 10 })
            .withMessage('gender must be between 1 and 10'),
        body('address', 'address is required').exists().trim()
            .isLength({ min: 1, max: 150 })
            .withMessage('address must be between 1 and 150'),
        body('mobileNumber', 'mobileNumber is required').exists().trim()
            .isLength({ min: 1, max: 20 }),
        body('email', 'email is required').exists().trim()
            .isLength({ min: 1, max: 40 })
            .withMessage('email must be between 1 and 40'),
        body('password', 'password is required').exists().trim()
            .isLength({ min: 1, max: 20 })
            .withMessage('password must be between 1 and 20'),


    ],
    loginValidation:()=>[
        body('email', 'email is required').exists().trim()
        .isLength({ min: 1, max: 40 })
        .withMessage('email must be between 1 and 40'),
    body('password', 'password is required').exists().trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('password must be between 1 and 20'),
    ]
}