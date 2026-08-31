import UsersDAO from "../dao/users.dao.js";

class UsersRepository {
  constructor() {
    this.usersDAO = new UsersDAO();
  }

  async getUserByEmail(email) {
    return await this.usersDAO.getUserByEmail(email);
  }

  async createUser(userData) {
    return await this.usersDAO.createUser(userData);
  }

  async getAllUsers() {
    return await this.usersDAO.getAll();
  }
}

export default UsersRepository;
