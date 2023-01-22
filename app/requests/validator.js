import Validator from "validatorjs"
import * as apiresponse from "../library/apiresponse.js"

export const validate = (req, res, next, rules, message = null) => {
    const validator = new Validator(req.body, rules, message)

    if (!validator.passes()) return apiresponse.invalid(res, 'Invalid Data', validator.errors.errors)
    next()
}