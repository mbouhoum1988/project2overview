module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.TEXT,
    description: DataTypes.TEXT
  });
  return Example;
};
