import { MenuItem, Categorie } from "../models/index.js";

export const getMenusItems = async (req, res) => {
  try {
    const menus = await MenuItem.findAll({
      include: [
        {
          model: Categorie,
          as: "category",
        },
      ],
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const newMenu = await MenuItem.create({
      name,
      description,
      price,
      category_id,
    });
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const menuitem = await MenuItem.findByPk(id);
    if (!menuitem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    menuitem.name = name;
    menuitem.description = description;
    menuitem.price = price;
    menuitem.category_id = category;
    await menuitem.save();
    res.json(menuitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuitem = await MenuItem.findByPk(id);
    if (!menuitem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    await menuitem.destroy();
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
