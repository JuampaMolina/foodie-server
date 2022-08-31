import ItemService from "./ItemService.js";

export default (function () {
  const getAll = async (req, res) => {
    try {
      const items = await ItemService.getAll();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    try {
      const item = await ItemService.getById(id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  };

  const getItemsByCategoryId = async (req, res) => {
    const { id } = req.params;
    try {
      const item = await ItemService.getItemsByCategoryId(id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  };

  const create = async (req, res) => {
    const data = req.body;
    try {
      const item = await ItemService.create(data);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const item = await ItemService.update(id, data);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const item = await ItemService.remove(id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  return {
    getAll,
    getById,
    getItemsByCategoryId,
    create,
    update,
    remove,
  };
})();
