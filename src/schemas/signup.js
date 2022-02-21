import joi from 'joi'

const signupSchema = joi.object({
    email:joi.string().pattern(/@/).required(),
    name: joi.string().required(),
    password: joi.string().required(),
    address: joi.string().required()
  }
  )

  export default signupSchema;