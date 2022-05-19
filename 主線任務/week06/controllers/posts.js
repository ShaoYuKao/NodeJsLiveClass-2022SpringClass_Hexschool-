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
  },
  async deleteAllPosts(req, res, next) {
    const result = await Posts.deleteMany({});
    handleSuccess(res, result);
    res.end();
  },
  async deletePost(req, res, next) {
    try {
      const id = req.url.split('/').pop();
      const result = await Posts.findByIdAndDelete(id);

      if(result) {
        handleSuccess(res);
      } else {
        appError(400, "單筆資料刪除失敗", next);
      }
    } catch (err) {
      appError(400, err.message, next);
    }    
  },
  async patchPosts(req, res, next) {
    try {
      const { body } = req;

      const id = req.url.split('/').pop();

      const result = await Posts.findByIdAndUpdate(id, body, { runValidators: true });

      if(result) {
        handleSuccess(res, result);
      } else {
        appError(400, "資料更新失敗", next);
      }
    } catch (err) {
      appError(400, err.message, next);
    }
  }
}

module.exports = posts;