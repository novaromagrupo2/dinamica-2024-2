const Joi = require("joi");

const useBlogRepository = require("../../../app/repositories/BlogRepository");
const blogRepository = useBlogRepository();

function BlogController() {
  async function list(request, response) {
    const posts = await blogRepository.list();
    response.status(200).json(posts);
  }

  async function show(request, response) {
    try {
      const post = await blogRepository.find(request.params.id);

      if (!post) {
        return response.status(404).send({
          message: "Postagem não encontrada.",
        });
      }

      response.status(200).json(post);
    } catch (error) {
      response.status(500).json({
        message: "Erro ao buscar a postagem.",
      });
    }
  }

  async function save(request, response) {
    const validation = Joi.object({
      title: Joi.string().min(10).required(),
      content: Joi.string().min(20).required(),
      author: Joi.string().required(),
      publishedAt: Joi.date(),
    });

    try {
      await validation.validateAsync(request.body);

      const post = await blogRepository.save(request.body);
      response.status(201).json(post);
    } catch (error) {
      response.status(400).json({
        message: "Erro de validação.",
        details: error.details,
      });
    }
  }

  async function remove(request, response) {
    const post = await blogRepository.find(request.params.id);

    if (!post) {
      return response.status(404).send({
        message: "Postagem não encontrada.",
      });
    }

    await blogRepository.remove(request.params.id);

    response.status(200).json({
      message: "Postagem removida com sucesso.",
    });
  }

  return {
    list,
    show,
    save,
    remove,
  };
}

module.exports = BlogController();

