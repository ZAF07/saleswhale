module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('games', 'token',
        {
          type: Sequelize.TEXT,
        });

  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn('games', 'token');
  }
};