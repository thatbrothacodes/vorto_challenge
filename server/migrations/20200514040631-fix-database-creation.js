'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('Todos', ['title'], {
          type: 'unique',
          name: 'Todos_title_key'
        }, { transaction: t })
      ])
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('Todos', 'Todos_title_key', {}, { transaction: t }),
      ])
    });
  }
};
