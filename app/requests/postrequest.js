import { validate } from "./validator.js"


export const create = (req, res, next) => {
    const rules = {
        description: 'requirde|string|min:10|max:5000',
        picture: 'string'
    }

    validate(req, res, rules)
}