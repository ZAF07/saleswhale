module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('games', 'points',
        {
          type: Sequelize.INTEGER,
        });
      await queryInterface.addColumn('games', 'time_remaining',
        {
          type: Sequelize.INTEGER,
        });

  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn('games', 'points');
      await queryInterface.removeColumn('games', 'time_remaining');
  }
};