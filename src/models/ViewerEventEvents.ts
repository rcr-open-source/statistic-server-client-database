import Sequelize, {
    DataTypes, Model, Optional,
} from 'sequelize';
import type { Event, EventId } from './Event';
import type { Viewer, ViewerId } from './Viewer';

export interface ViewerEventEventsAttributes {
    id: string;
    viewerID: string;
    eventID: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type ViewerEventEventsPk = "id";
export type ViewerEventEventsId = ViewerEventEvents[ViewerEventEventsPk];
export type ViewerEventEventsCreationAttributes = Optional<ViewerEventEventsAttributes, ViewerEventEventsPk>;

export class ViewerEventEvents extends Model<ViewerEventEventsAttributes, ViewerEventEventsCreationAttributes> implements ViewerEventEventsAttributes {

    id!: string;

    viewerID!: string;

    eventID!: string;

    createdAt?: Date;

    updatedAt?: Date;

    deletedAt?: Date;

    // viewerEventEvents belongsTo Event via EventID
    event!: Event;

    getEvent!: Sequelize.BelongsToGetAssociationMixin<Event>;

    setEvent!: Sequelize.BelongsToSetAssociationMixin<Event, EventId>;

    createEvent!: Sequelize.BelongsToCreateAssociationMixin<Event>;

    // viewerEventEvents belongsTo Viewer via viewerID
    viewer!: Viewer;

    getViewer!: Sequelize.BelongsToGetAssociationMixin<Viewer>;

    setViewer!: Sequelize.BelongsToSetAssociationMixin<Viewer, ViewerId>;

    createViewer!: Sequelize.BelongsToCreateAssociationMixin<Viewer>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ViewerEventEvents {

        ViewerEventEvents.init({
            id: {
                defaultValue: Sequelize.fn("[dbo].[GETUMKUUID]", "006", Sequelize.fn("newid")),
                type: DataTypes.STRING(40),
                allowNull: false,
                primaryKey: true,
            },
            viewerID: {
                type: DataTypes.STRING(40),
                allowNull: false,
                references: {
                    model: 'Viewer',
                    key: 'id',
                },
            },
            eventID: {
                type: DataTypes.STRING(40),
                allowNull: false,
                references: {
                    model: 'Event',
                    key: 'id',
                },
            },
        }, {
            sequelize,
            tableName: 'ViewerEventEvents',
            schema: 'dbo',
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PK_ViewerEventEvents",
                    unique: true,
                    fields: [
                        {
                            name: "id",
                        },
                    ],
                },
            ],
        });
        return ViewerEventEvents;

    }

}
