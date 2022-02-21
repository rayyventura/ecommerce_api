import signupSchema from "../schemas/signup.js";

export function validateSignUpSchema(req, res, next) {
    const user = req.body;
    const validation = signupSchema.validate(user);

    if(validation.error){
        return res.sendStatus(422);     
    }
  next();
}

