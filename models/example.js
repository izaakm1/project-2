module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    businessName: DataTypes.STRING,
    monday: DataTypes.TEXT,
    tuesday: DataTypes.TEXT,
    wednesday: DataTypes.TEXT,
    thursday: DataTypes.TEXT,
    friday: DataTypes.TEXT,
    saturday: DataTypes.TEXT,
    sunday: DataTypes.TEXT,
  });
  return Example;
};
