const handleSuccess = require('../service/handleSuccess');
const Posts = require('../model/posts');
const appError = require('../service/appError');

const posts = {
  /**
   * 觀看所有動態
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getPosts(req, res, next) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt";
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    
    const allPosts = await Posts.find(q).populate({
      path: 'user',
      select: 'name photo '
    }).sort(timeSort);
    
    handleSuccess(res, allPosts);
  },
  /**
   * 張貼個人動態
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createPosts(req, res, next) {
    try {
      const { body: data } = req;

      if (data.content) {
        const newPost = await Posts.create({
          content: data.content,
          image: data.image,
          createdAt: data.createdAt,
          user: req.user._id,
          likes: data.likes
        })
        handleSuccess(res, newPost);
      } else {
        appError(400,"你沒有填寫 content 資料", next);
      }
    } catch (err){
      appError(400, err.message, next);
    }
  }
}

module.exports = posts;