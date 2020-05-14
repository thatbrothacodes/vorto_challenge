'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todos = sequelize.define('Todos', {
    title: DataTypes.STRING,
    notes: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    priority: DataTypes.INTEGER,
    archived: DataTypes.BOOLEAN,
    archivedDate: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    completedDate: DataTypes.DATE
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};