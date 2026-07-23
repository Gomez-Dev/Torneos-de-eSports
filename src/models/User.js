/**
 * Estructura y esquema base para la entidad User.
 * Preparado para acoplar con Mongoose / MongoDB en la siguiente entrega.
 */
export const UserSchemaDefinition = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' },
  createdAt: { type: Date, default: Date.now },
};

export class User {
  constructor({ name, email, password, role = 'USER', createdAt = new Date() }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}

export default User;
