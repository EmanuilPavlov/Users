import { Model, DataTypes } from "sequelize";
import sequelize from "../util/database";

interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    avatar?: string;
    avatarColor?: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    declare id: number;
    declare name: string;
    declare email: string;
    declare avatar?: string;
    declare avatarColor?: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarColor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);
