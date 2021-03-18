import Sequelize, {
    DataTypes, Model, Optional,
} from 'sequelize';
import type { Event, EventId } from './Event';
import type { System, SystemId } from './System';

export interface TargetAttributes {
    id: string;
    name: string;
    systemID: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type TargetPk = "id";
export type TargetId = Target[TargetPk];
export type TargetCreationAttributes = Optional<TargetAttributes, TargetPk>;

export class Target extends Model<TargetAttributes, TargetCreationAttributes> implements TargetAttributes {

    id!: string;

    name!: string;

    systemID!: string;

    createdAt?: Date;

    updatedAt?: Date;

    deletedAt?: Date;

    // Target belongsTo System via systemID
    system!: System;

    getSystem!: Sequelize.BelongsToGetAssociationMixin<System>;

    setSystem!: Sequelize.BelongsToSetAssociationMixin<System, SystemId>;

    createSystem!: Sequelize.BelongsToCreateAssociationMixin<System>;

    // Target hasMany Event via targetID
    Events!: Event[];

    getEvents!: Sequelize.HasManyGetAssociationsMixin<Event>;

    setEvents!: Sequelize.HasManySetAssociationsMixin<Event, EventId>;

    addEvent!: Sequelize.HasManyAddAssociationMixin<Event, EventId>;

    addEvents!: Sequelize.HasManyAddAssociationsMixin<Event, EventId>;

    createEvent!: Sequelize.HasManyCreateAssociationMixin<Event>;

    removeEvent!: Sequelize.HasManyRemoveAssociationMixin<Event, EventId>;

    removeEvents!: Sequelize.HasManyRemoveAssociationsMixin<Event, EventId>;

    hasEvent!: Sequelize.HasManyHasAssociationMixin<Event, EventId>;

    hasEvents!: Sequelize.HasManyHasAssociationsMixin<Event, EventId>;

    countEvents!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof Target {

        Target.init({
            id: {
                type: DataTypes.STRING(40),
                allowNull: false,
                defaultValue: Sequelize.fn("[dbo].[GETUMKUUID]", "003", Sequelize.fn("newid")),
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            systemID: {
                type: DataTypes.STRING(40),
                allowNull: false,
                references: {
                    model: 'System',
                    key: 'id',
                },
            },
        }, {
            sequelize,
            tableName: 'Target',
            schema: 'dbo',
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PK_Target",
                    unique: true,
                    fields: [
                        {
                            name: "id",
                        },
                    ],
                },
            ],
        });
        return Target;

    }

}