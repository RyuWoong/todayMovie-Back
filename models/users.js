module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'users',
    {
      uuid: {
        type: DataTypes.UUID(),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      loginid: {
        type: DataTypes.UUID(),
        allowNull: true,
      },
      browserid: {
        type: DataTypes.UUID(),
        allowNull: true,
      },
      createAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      loginAt: {
        type: DataTypes.DATE(),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'users',
      dialectOptions: { charset: 'utf8mb4', dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리
      timezone: '+09:00', // 타임존을 설정
    },
  );
};
