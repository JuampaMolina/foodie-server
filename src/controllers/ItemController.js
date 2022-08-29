import * as ItemService from "../services/ItemService.js";

export async function getAll(req, res) {
  try {
    const items = await ItemService.getAll();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  try {
    const item = await ItemService.getById(id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
}

export async function getItemsByCategoryId(req, res) {
  const { id } = req.params;
  try {
    const item = await ItemService.getItemsByCategoryId(id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
}

export async function create(req, res) {
  const data = req.body;
  // todo: validar data
  try {
    const item = await ItemService.create(data);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  // todo: validar data
  try {
    const item = await ItemService.update(id, data);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function remove(req, res) {
  const { id } = req.params;
  try {
    const item = await ItemService.remove(id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}
