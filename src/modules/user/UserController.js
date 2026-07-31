import { matchedData } from "express-validator";
import UserService from "./UserService.js";

export default (function () {
  const login = async (req, res) => {
    try {
      let { email, password } = req.body;
      let loggedUser = await UserService.login(email, password);
      return res.status(200).json(loggedUser);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const register = async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let savedUser = await UserService.register(name, email, password);
      return res.status(200).json(savedUser);
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  };

  const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const result = await UserService.forgotPassword(email);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  };

  const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
      const result = await UserService.resetPassword(token, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const getAll = async (req, res) => {
    const { page, limit } = matchedData(req);
    try {
      const users = await UserService.getAll({ page, limit });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const updateRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
      const user = await UserService.updateRole(id, role);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    getAll,
    updateRole,
  };
})();
