const Blog = require('../models/Blog');
const useBlogRepository = require("../repositories/BlogRepository");

const blogRepository = useBlogRepository();

function BlogController() {


  async function list(req, res) {
    const posts = await blogRepository.list();

    res.render('blog/list', {
      title: "Lista de Postagens",
      posts: posts,
    });
  }


  function create(req, res) {
    res.render('blog/create', {
      title: "Nova Postagem"
    });
  }


  async function save(req, res) {
    await blogRepository.save(req.body);
    res.redirect('/blog');
  }


  async function remove(req, res) {
    await blogRepository.remove(req.params.id);
    res.redirect('/blog');
  }

  async function edit(req, res) {
    const post = await blogRepository.find(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "Postagem não encontrada." });
    }

    res.render('blog/edit', {
      title: "Editar Postagem",
      post: post,
    });
  }

  async function update(req, res) {
    await blogRepository.update(req.body.id, req.body);
    res.redirect('/blog');
  }

  return {
    list,
    create,
    save,
    remove,
    edit,
    update,
  };
}

module.exports = BlogController();
