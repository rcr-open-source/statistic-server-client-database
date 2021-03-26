import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Event, EventId } from './Event';
import type { Viewer, ViewerId } from './Viewer';

export interface ViewerEventEventsAttributes {
  id: string;
  viewerID: string;
  eventID: string;
  time: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ViewerEventEventsPk = "id";
export type ViewerEventEventsTime = "time";
export type ViewerEventEventsId = ViewerEventEvents[ViewerEventEventsPk];
export type ViewerEventEventsCreationAttributes = Optional<Optional<ViewerEventEventsAttributes, ViewerEventEventsPk>, ViewerEventEventsTime>;

export class ViewerEventEvents extends Model<ViewerEventEventsAttributes, ViewerEventEventsCreationAttributes> implements ViewerEventEventsAttributes {
  id!: string;
  viewerID!: string;
  eventID!: string;
  time!: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // ViewerEventEvents belongsTo Event via eventID
  event!: Event;
  getEvent!: Sequelize.BelongsToGetAssociationMixin<Event>;
  setEvent!: Sequelize.BelongsToSetAssociationMixin<Event, EventId>;
  createEvent!: Sequelize.BelongsToCreateAssociationMixin<Event>;
  // ViewerEventEvents belongsTo Viewer via viewerID
  viewer!: Viewer;
  getViewer!: Sequelize.BelongsToGetAssociationMixin<Viewer>;
  setViewer!: Sequelize.BelongsToSetAssociationMixin<Viewer, ViewerId>;
  createViewer!: Sequelize.BelongsToCreateAssociationMixin<Viewer>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ViewerEventEvents {
    ViewerEventEvents.init({
    id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: Sequelize.fn("[dbo].[GETUMKUUID]", "006", Sequelize.fn("newid")),
      primaryKey: true
    },
    viewerID: {
      type: DataTypes.STRING(40),
      allowNull: false,
      references: {
        model: 'Viewer',
        key: 'id'
      }
    },
    eventID: {
      type: DataTypes.STRING(40),
      allowNull: false,
      references: {
        model: 'Event',
        key: 'id'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('getdate')
    }
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
          { name: "id" },
        ]
      },
    ]
  });
  return ViewerEventEvents;
  }
}
