import { cache } from "../database/cache.js";
import * as apiresponse from "../library/apiresponse.js";
import Post from "../models/post.js";
import User from "../models/user.js";

/* CREATE */
export const createPost = async (req, res) => {
    const { description, picturePath } = req.body

    const user = await User.findById(req.user.id)

    if (!user) return apiresponse.notfound(res, "User not found.")

    try {
        await Post.create({
            userId: user.id,
            name: user.name,
            location: user.location,
            description: description,
            picturepPath: picturepPath,
            userPicturePath: user.picturePath,
            likes: {},
            Comments: []
        })

        const posts = await Post.find();

        return apiresponse.success(res, posts, 'Post created successfully.')
    } catch (error) {
        return apiresponse.exception(res, error)
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {

    let posts = cache.get('posts')

    if (posts == undefined) {
        posts = await Post.find();
        cache.set('posts', posts)
    }
    return apiresponse.success(res, posts)
};

export const getUserPosts = async (req, res) => {

    const { userId } = req.params

    const user = await User.findById(userId)

    if (!user) return apiresponse.notfound(res, "User not found.")

    let posts = cache.get(`users-posts-${userId}`)

    if (posts == undefined) {
        posts = await Post.find({ userId: userId })
        cache.set(`users-posts-${userId}`, posts)
    }

    return apiresponse.success(res, posts)

};

/* UPDATE */
export const likePost = async (req, res) => {

    const { id } = req.params
    const { userId } = req.body
    try {

        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        return apiresponse.success(res, updatedPost)

    } catch (error) {
        return apiresponse.exception(res, error)
    }
};
