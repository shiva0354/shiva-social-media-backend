import { verify } from "jsonwebtoken"
import { config } from "../config/config.js"
import { exception, forbidden } from "../library/apiresponse.js"

export const authVerify = (req, res, next) => {
    try {
        let token = req.headers['Authorization']

        if (!token) return forbidden(res, 'Acess Denied')

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = verify(token, config.jwt_secret)
        req.user = verified
        next()
    } catch (error) {
        return exception(res, error)
    }
}