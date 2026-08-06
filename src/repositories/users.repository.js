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
}

export default UsersRepository;
