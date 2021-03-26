import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Target, TargetId } from './Target';
import type { ViewerEventEvents, ViewerEventEventsId } from './ViewerEventEvents';

export interface EventAttributes {
  id: string;
  name: string;
  targetID: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type EventPk = "id";
export type EventId = Event[EventPk];
export type EventCreationAttributes = Optional<EventAttributes, EventPk>;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  id!: string;
  name!: string;
  targetID!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // Event hasMany ViewerEventEvents via eventID
  ViewerEventEvents!: ViewerEventEvents[];
  getViewerEventEvents!: Sequelize.HasManyGetAssociationsMixin<ViewerEventEvents>;
  setViewerEventEvents!: Sequelize.HasManySetAssociationsMixin<ViewerEventEvents, ViewerEventEventsId>;
  addViewerEventEvent!: Sequelize.HasManyAddAssociationMixin<ViewerEventEvents, ViewerEventEventsId>;
  addViewerEventEvents!: Sequelize.HasManyAddAssociationsMixin<ViewerEventEvents, ViewerEventEventsId>;
  createViewerEventEvent!: Sequelize.HasManyCreateAssociationMixin<ViewerEventEvents>;
  removeViewerEventEvent!: Sequelize.HasManyRemoveAssociationMixin<ViewerEventEvents, ViewerEventEventsId>;
  removeViewerEventEvents!: Sequelize.HasManyRemoveAssociationsMixin<ViewerEventEvents, ViewerEventEventsId>;
  hasViewerEventEvent!: Sequelize.HasManyHasAssociationMixin<ViewerEventEvents, ViewerEventEventsId>;
  hasViewerEventEvents!: Sequelize.HasManyHasAssociationsMixin<ViewerEventEvents, ViewerEventEventsId>;
  countViewerEventEvents!: Sequelize.HasManyCountAssociationsMixin;
  // Event belongsTo Target via targetID
  target!: Target;
  getTarget!: Sequelize.BelongsToGetAssociationMixin<Target>;
  setTarget!: Sequelize.BelongsToSetAssociationMixin<Target, TargetId>;
  createTarget!: Sequelize.BelongsToCreateAssociationMixin<Target>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Event {
    Event.init({
    id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: Sequelize.fn("[dbo].[GETUMKUUID]", "004", Sequelize.fn("newid")),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "IX_Event"
    },
    targetID: {
      type: DataTypes.STRING(40),
      allowNull: false,
      references: {
        model: 'Target',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Event',
    schema: 'dbo',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "IX_Event",
        unique: true,
        fields: [
          { name: "name" },
          { name: "deletedAt" },
        ]
      },
      {
        name: "PK_Event",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Event;
  }
}
