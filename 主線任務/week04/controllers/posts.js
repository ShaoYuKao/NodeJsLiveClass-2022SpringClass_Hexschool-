const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../model/posts');


const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt";
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    
    const allPosts = await Posts.find(q).populate({
      path: 'user',
      select: 'name photo '
    }).sort(timeSort);
    
    handleSuccess(res, allPosts);
  },
  async createPosts(req, res) {
    try {
      const { body: data } = req;

      if (data.content) {
        const newPost = await Posts.create({
          content: data.content,
          image: data.image,
          createdAt: data.createdAt,
          user: data.user,
          likes: data.likes
        })
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err){
      handleError(res, err);
    }
  }
}

module.exports = posts;