const { sql } = require("../dbConnection");

exports.createUser = async (user) => {
  const createdUser = await sql.begin(async () => {
    const [createdUser] = await sql`
      INSERT INTO users
      ${sql(user, "name", "email", "phone_number", "address", "created_at", "updated_at")}  
    
      RETURNING *
      `;

    await sql`
      INSERT INTO user_secrets (user_id, password, created_at, updated_at)
      VALUES (${createdUser.id}, ${user.password}, ${createdUser.created_at}, ${createdUser.updated_at})
      `;

    return createdUser;
  });

  return createdUser;
};

exports.getAllUsers = async () => {
  const users = await sql`
    SELECT *
    FROM users
    `;
  return users;
};

exports.getUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.email = ${email}
    `;

  return user;
};

exports.getUsersPassword = async (id) => {
  const [password] = await sql`
    SELECT user_secrets.password
    FROM user_secrets
    WHERE user_secrets.user_id = ${id}
    `;

  return password;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
    SELECT *
    FROM users
    WHERE users.id = ${id}
    `;

  return user;
};

exports.updateUser = async (id, user) => {
  const [updatedUser] = await sql`
    UPDATE users
    SET ${sql(user)}
    WHERE users.id = ${id}
    RETURNING *
    `;

  return updatedUser;
};

exports.deleteUser = async (id) => {
  const [deletedUser] = await sql`
    DELETE FROM users
    WHERE users.id = ${id}
    RETURNING *
    `;

  return deletedUser;
};
