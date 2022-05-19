const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../model/posts');

const posts = {
  async getPosts({req, res}) {
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
    res.end();
  },
  async createPosts({req, res, body}) {
    try {
      const data = JSON.parse(body);
      if (data.content) {
        const newPost = await Posts.create({
          name: data.name,
          content: data.content,
          tags: data.tags,
          type: data.type
        })
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err){
      handleError(res, err);
    }
  },
  async deleteAllPosts({req, res}) {
    const result = await Posts.deleteMany({});
    handleSuccess(res, result);
    res.end();
  },
  async deletePost({req, res}) {
    try {
      const id = req.url.split('/').pop();
      const result = await Posts.findByIdAndDelete(id);

      if(result) {
        handleSuccess(res);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }    
  },
  async patchPosts({req, res, body}) {
    try {
      const id = req.url.split('/').pop();
      const data = JSON.parse(body);

      const result = await Posts.findByIdAndUpdate(id, data, { runValidators: true });

      if(result) {
        handleSuccess(res, result);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  }
}

module.exports = posts;