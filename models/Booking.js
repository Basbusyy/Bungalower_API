module.exports = (sequelize, Datatype) => {
  const Booking = sequelize.define(
    'Booking',
    {
      checkIn: {
        type: Datatype.DATE,
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      checkOut: {
        type: Datatype.DATE,
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      email: {
        type: Datatype.STRING,
        allowNull: false,
        validator: { isEmail: true }
      },
      phone: Datatype.STRING,
      paymentImage: {
        type: Datatype.STRING,
        allowNull: false
      }
    },
    { underscored: true }
  );

  Booking.associate = (db) => {
    Booking.belongsTo(db.Room, {
      foreignKey: {
        name: 'roomId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }),
    Booking.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    })
  };
  return Booking;
};
