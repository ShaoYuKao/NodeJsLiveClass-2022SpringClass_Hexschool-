const HttpControllers = require('../controllers/http');
const PostsControllers = require('../controllers/posts');

const routes = async (req, res) => {
  const { url, method } = req;
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  })

  if (url === '/posts' && method === 'GET') {
    PostsControllers.getPosts({req, res});
  } else if (url === '/posts' && method === 'POST') {
    req.on('end', async () => PostsControllers.createPosts({req, res, body}))
  } else if (method === 'OPTIONS') {
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFoumd(req, res);
  }
}

module.exports = routes;