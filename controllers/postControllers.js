const Post=require('../models/post')

const getAllPosts = async (req, res) => {
    let posts = await Post.find();
    if(posts) return res.status(200).json(posts);
    else return res.status(400).json({message: 'No posts found'});
}

const AddPost = async (req, res) => {
    const{title, description,Image,user} = req.body;
    let post=new Post({
        title:title,
        description:description,
        Image:Image,
        user:user
    }); 
    await post.save();
    return res.status(200).json({message: 'Post created'});
}

const DeletePost = async (req, res) => {
    const{title, description,Image,user} = req.body;
    Post.deleteOne({title:title, description:description,Image:Image,user:user}, function (err) {
        if(err) return res.status(400).json({message: 'Post not found'});
        else return res.status(200).json({message: 'Post deleted'});
    });
}

module.exports = {getAllPosts,AddPost,DeletePost};