module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reviews',
    {
      userID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      movieID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
      writeAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      platform: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'reviews',
      dialectOptions: { charset: 'utf8mb4', dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리
      timezone: '+09:00', // 타임존을 설정
    },
  );
};
