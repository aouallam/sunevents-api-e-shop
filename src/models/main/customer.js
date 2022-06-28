module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("customer", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    externalId: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    civility: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    cgv: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "activated",
    },
  });

  Index.associate = (models) => {
    Index.hasMany(models.customerOrder);
    Index.belongsToMany(models.product, {
      through: "shoppingCart",
      onDelete: "cascade",
    });
  };

  return Index;
};
