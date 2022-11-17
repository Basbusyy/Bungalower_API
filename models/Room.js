module.exports = (sequelize, Datatype) => {
  const Room = sequelize.define(
    'Room',
    {
      currentPrice: {
        type: Datatype.DECIMAL(10, 2),
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      status: {
        type: Datatype.ENUM('BOOKED', 'AVALIABLE'),
        allowNull: false,
        defaultValue: 'AVALIABLE'
      },
      roomImage: {
        type: Datatype.STRING,
        allowNull: false
      },
      desc: {
        type: Datatype.STRING
      },
      maxinumRoom: Datatype.INTEGER
    },
    { underscored: true }
  );
  Room.associatee = (db) => {
    Room.hasMany(db.Transaction, {
      foreignKey: {
        name: 'roomId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };
  return Room;
};
