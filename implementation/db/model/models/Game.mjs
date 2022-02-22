export default function initGameModel(sequelize, DataTypes) {
  return sequelize.define(
    'game',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      token: DataTypes.TEXT,
      board: DataTypes.TEXT,
      duration: DataTypes.DECIMAL,
      timeRemaining: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
}