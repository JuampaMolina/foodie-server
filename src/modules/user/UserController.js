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

  return {
    login,
    register,
  };
})();
