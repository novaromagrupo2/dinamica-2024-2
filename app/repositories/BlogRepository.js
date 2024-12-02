const BlogPost = require('../models/Blog');

function useBlogRepository() {

  // Lista todas as postagens do blog
  async function list() {
    const posts = await BlogPost.findAll({ raw: true });
    return posts;
  }

  // Encontra uma postagem específica pelo ID
  async function find(id) {
    const post = await BlogPost.findByPk(id);
    return post;
  }

  // Salva uma nova postagem
  async function save(data) {
    const post = {
      title: data.title,
      content: data.content,
      author: data.author,
      publishedAt: data.publishedAt || new Date(),
    };

    const postCreated = await BlogPost.create(post);
    return postCreated;
  }

  // Exclui uma postagem pelo ID
  async function remove(id) {
    await BlogPost.destroy({ where: { id: id } });
  }

  return {
    list,
    find,
    save,
    remove,
  };
}

module.exports = useBlogRepository;
