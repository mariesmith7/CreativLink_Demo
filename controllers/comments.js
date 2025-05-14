const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
    console.log('we made it')
      await Comment.create({
        commentText: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.rainbowUnicorn
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.rainbowUnicorn);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
//   deletePost: async (req, res) => {
//     try {
//       // Find post by id
//       let post = await Post.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(post.cloudinaryId);
//       // Delete post from db
//       await Post.remove({ _id: req.params.id });
//       console.log("Deleted Post");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
};
