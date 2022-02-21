import signinSchema from '../schemas/signin.js';

export function validateSignInSchema(req, res, next) {
  const user = req.body;
    const validation = signinSchema.validate(user);
    
    if(validation.error){
        return res.status(422).send("Preencha os dados corretamente");
    }
  next();
}