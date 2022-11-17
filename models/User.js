module.exports = (sequelize, Datatype) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: Datatype.STRING,
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      lastName: {
        type: Datatype.STRING,
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      userName: {
        type: Datatype.STRING,
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      email: {
        type: Datatype.STRING,
        allowNull: false,
        validator: {
          isEmail: true
        }
      },
      password: {
        type: Datatype.STRING,
        allowNull: false
      },
      profileImage: Datatype.STRING,
      role: {
        type: Datatype.ENUM('admin', 'member'), // to be changed
        defaultValue: 'member',
        allowNull: false,

        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  User.associate = (db) => {
    User.hasMany(db.Booking, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };
  return User;
};
