/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users_account', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		ttl: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		tags_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		photo: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(250),
			allowNull: false
		},
		link_instagram: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		link_facebook: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		link_linkdln: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		portofolio_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		no_wa: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		no_phone: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'users_account'
	});
};
