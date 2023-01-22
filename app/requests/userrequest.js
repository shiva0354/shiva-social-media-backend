import { validate } from "./validator.js"

export const register = (req, res, next) => {
    const rules = {
        name: 'required|string|max:100',
        email: 'required|string|email|max:100',
        mobile: 'required|digits:10',
        password: 'required|string|min:6',
        location: 'required|string|max:250',
        occupation: 'required|string|max:50'
    }
    validate(req, res, next, rules)
}

export const login = (req, res, next) => {
    const rules = {
        email: 'required|string|email|max:100',
        password: 'required|string|min:6'
    }
    validate(req, res, next, rules)
}

export const generateOtp = (req, res, next) => {
    const rules = {
        mobile: 'required|numeric'
    }
    validate(req, res, next, rules)
}

export const validateOtp = (req, res, next) => {
    const rules = {
        mobile: 'required|numeric',
        otp: 'required|numeric'
    }
    validate(req, res, next, rules)
}

export const changePassword = (req, res, next) => {
    const rules = {
        password: 'required|string|min:6|password_confirmed'
    }
    validate(req, res, next, rules)
}