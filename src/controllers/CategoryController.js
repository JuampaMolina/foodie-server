import * as CategoryService from "../services/CategoryService.js";

export async function getAll(req, res, next) {
  try {
    const categories = await CategoryService.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const category = await CategoryService.getById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
}

export async function create(req, res, next) {
  const data = req.body;
  // todo: validar data
  try {
    const category = await CategoryService.create(data);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function update(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  // todo: validar data
  try {
    const category = await CategoryService.update(id, data);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function remove(req, res, next) {
  const { id } = req.params;
  try {
    const category = await CategoryService.remove(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}
