module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("category", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    parentId: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imgLink: {
      type: Sequelize.STRING,
    },
  });

  Index.associate = (models) => {
    Index.belongsToMany(models.product, {
      through: "categoryProduct",
      onDelete: "cascade",
    });
  };

  return Index;
};
