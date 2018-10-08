module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.TEXT
        },

        about: {
            type: Sequelize.TEXT
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        business: {
            type: Sequelize.TEXT
        },

        address: {
            type: Sequelize.TEXT
        },

        city: {
            type: Sequelize.TEXT
        },

        state: {
            type: Sequelize.TEXT
        },

        zip: {
            type: Sequelize.TEXT
        },

        monday: {
            type: Sequelize.TEXT
        },
        tuesday: {
            type: Sequelize.TEXT
        },
        wednesday: {
            type: Sequelize.TEXT
        },
        thursday: {
            type: Sequelize.TEXT
        },
        friday: {
            type: Sequelize.TEXT
        },
        saturday: {
            type: Sequelize.TEXT
        },
        sunday: {
            type: Sequelize.TEXT
        },

    });

    // User.associate = function (models) {
    //     User.hasOne(models.Example)
    // }

    return User;
}
