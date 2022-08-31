import CategoryService from "./CategoryService.js";

export default (function () {
  const getAll = async (req, res) => {
    try {
      const categories = await CategoryService.getAll();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await CategoryService.getById(id);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  };

  const create = async (req, res) => {
    const data = req.body;
    try {
      const category = await CategoryService.create(data);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const category = await CategoryService.update(id, data);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await CategoryService.remove(id);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
})();
