const { models } = require('../models/index');

const addItemToShop = async (guildId, itemName, price, stock, role, description) => {
    return await models.ShopItems.create({
        guild_id: guildId,
        name: itemName,
        price,
        stock: stock || 0, // 0이면 무한 재고
        role_id: role || null,
        description: description || null
    });
};

const editShopItem = async (guildId, itemId, fieldsToUpdate) => {
    const item = await models.ShopItems.findOne({ where: { guild_id: guildId, id: itemId } });
    if (!item) throw new Error('Item not found');
    return await item.update(fieldsToUpdate);
};

const deleteShopItem = async (guildId, itemId) => {
    return await models.ShopItems.destroy({ where: { guild_id: guildId, id: itemId } });
};

const getShopItems = async (guildId) => {
    return await models.ShopItems.findAll({ where: { guild_id: guildId } });
};

const purchaseItem = async (guildId, userId, itemId, quantity) => {
    const item = await models.ShopItems.findOne({ where: { guild_id: guildId, id: itemId } });
    if (!item) throw new Error('Item not found');
    if (item.stock !== 0 && item.stock < quantity) throw new Error('Not enough stock');

    // 재고 감소
    if (item.stock !== 0) {
        await item.decrement('stock', { by: quantity });
    }

    // 유저 인벤토리 업데이트
    const [inventory, created] = await models.UserInventory.findOrCreate({
        where: { guild_id: guildId, user_id: userId, item_id: itemId },
        defaults: { quantity }
    });

    if (!created) {
        await inventory.increment('quantity', { by: quantity });
    }

    return { item, quantity };
};

module.exports = { addItemToShop, editShopItem, deleteShopItem, getShopItems, purchaseItem };
