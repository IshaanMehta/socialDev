import Post from "../models/Posts.js";
import User from "../models/Users.js";

// CREATE

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    });

    await newPost.save();

    const allPost = await Post.find();
    res.status(201).send(allPost);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

// READ POSTS
export const getFeedPosts = async (req, res) => {
  try {
    const allPost = await Post.find();
    res.status(200).send(allPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = Post.find({ userId });
    res.status(200).send(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
