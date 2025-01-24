const { sql } = require("../dbConnection");

exports.getAllMenu = async () => {
  const menu = await sql`
    SELECT *
    FROM menu_items
    `;

  return menu;
};

exports.getMenuItemById = async (id) => {
  const [menuItem] = await sql`
    SELECT *
    FROM menu_items
    WHERE menu_items.id = ${id}
    `;

  return menuItem;
};

exports.createMenuItem = async (menuItem) => {
  const [createdMenuItem] = await sql`
    INSERT INTO menu_items
    ${sql(menuItem, "name", "description", "price", "category_id", "created_at", "updated_at")}  
      
    RETURNING menu_items.*
      `;

  return createdMenuItem;
};

exports.updateMenuItem = async (id, menuItem) => {
  const [updatedMenuItem] = await sql`
    UPDATE menu_items
    SET ${sql(menuItem)}
    WHERE menu_items.id = ${id}

    RETURNING menu_items.*
    `;

  return updatedMenuItem;
};

exports.deleteMenuItem = async (id) => {
  const [deletedMenuItem] = await sql`
    DELETE FROM menu_items
    WHERE menu_items.id = ${id}
    
    RETURNING menu_items.*
    `;

  return deletedMenuItem;
};
