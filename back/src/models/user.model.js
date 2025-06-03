import { sequelize } from "../config/db.config.js";

export class UserModel {
  static async findAll() {
    const sql = `EXEC usp_ListadoUsuarios`;
    const result = await sequelize.query(sql);
    return result[0];
  }

  static async insert(newUser) {

    const data = {
      username: newUser.username.toUpperCase(),
      password: newUser.password,
      first_lastname: newUser.first_lastname.toUpperCase(),
      second_lastname: newUser.second_lastname.toUpperCase(),
      full_name: newUser.full_name.toUpperCase(),
      type: newUser.type.toUpperCase()
    };

    const sql = `
      EXEC usp_CrearUsuarios 
      @IdUsuario = 0, 
      @Usuario = :username, 
      @Pswd = :password, 
      @ApellidoPaterno = :first_lastname, 
      @ApellidoMaterno = :second_lastname, 
      @Nombre = :full_name, 
      @Movimiento = 'I', 
      @Aplicativo = :type,
      @Estatus = ''
    `;

    const result = await sequelize.query(sql, {
      replacements: data,
    });

    return result[0][0];
  }

  static async update(id, user) {
    const data = {
      id,
      username: user.username.toUpperCase(),
      first_lastname: user.first_lastname.toUpperCase(),
      second_lastname: user.second_lastname.toUpperCase(),
      full_name: user.full_name.toUpperCase(),
      type: user.type.toUpperCase(),
      status: user.status
    };
    if (user.password) data.password = user.password

    const sql = `
      EXEC usp_CrearUsuarios 
      @IdUsuario = :id, 
      @Usuario = :username,  
      @ApellidoPaterno = :first_lastname, 
      @ApellidoMaterno = :second_lastname, 
      @Nombre = :full_name, 
      @Movimiento = 'M', 
      @Aplicativo = :type,
      @Estatus = :status,
      @Pswd = ${data.password ? ':password' : 'NULL'}
    `;

    const result = await sequelize.query(sql, {
      replacements: data,
    });

    return result[0][0]

  }

  static async updatePassword({ id, old_password, new_password }) {
    const data = {
      id,
      old_password,
      new_password,
    }

    //LLAMAR AL SP

    return data;
  }
}
