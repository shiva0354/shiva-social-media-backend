import * as apiresponse from "../library/apiresponse.js"
import User from "../models/user.js"

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) return apiresponse.notfound(res, "User not found.")
        
        return apiresponse.success(res, user)
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) return apiresponse.notfound(res, "User not found.")

        const friends = Promise.all(user.friends.map((id) => User.findById(id)))

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        //TODO implement caching
        return apiresponse.success(res, formattedFriends)
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params

        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if (!friend) return apiresponse.notfound(res, "User not found")

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const friends = Promise.all(user.friends.map((id) => User.findById(id)))

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        return apiresponse.success(res, formattedFriends)
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}
