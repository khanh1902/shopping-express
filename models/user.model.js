const {ROLE} = require('../constants')
module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    dateOfBirth: {
        type: DataTypes.STRING
    },
    role: {
        type : DataTypes.STRING,
        defaultValue: ROLE.USER
    }
  });

  return User;
};
