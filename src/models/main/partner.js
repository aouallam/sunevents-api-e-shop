module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("partner", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    externalId: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gouvId: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lat: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    lng: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "fr",
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "prospect",
    },
  });

  Index.associate = (models) => {
    Index.hasMany(models.product);
    Index.hasMany(models.attributeKey);
  };

  return Index;
};
