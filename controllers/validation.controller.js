const { check, validationResult } = require('express-validator')


module.exports.signupValidation=[
    check('name','invalid input').matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check('email','invalid input').isEmail(),
    check('password','invalid input').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    check('confirmPassword','invalid input').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
]