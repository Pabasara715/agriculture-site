module.exports = (sequelize, DataTypes) => {
  const order_histories = sequelize.define("order_histories", {
    orderid: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    orderdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  });

  return order_histories;
};
