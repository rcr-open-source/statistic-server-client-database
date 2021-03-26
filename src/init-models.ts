import type { Sequelize, Model } from "sequelize";
import { Event } from "./models/Event";
import type { EventAttributes, EventCreationAttributes } from "./models/Event";
import { System } from "./models/System";
import type { SystemAttributes, SystemCreationAttributes } from "./models/System";
import { Target } from "./models/Target";
import type { TargetAttributes, TargetCreationAttributes } from "./models/Target";
import { Viewer } from "./models/Viewer";
import type { ViewerAttributes, ViewerCreationAttributes } from "./models/Viewer";
import { ViewerEventEvents } from "./models/ViewerEventEvents";
import type { ViewerEventEventsAttributes, ViewerEventEventsCreationAttributes } from "./models/ViewerEventEvents";

export {
  Event,
  System,
  Target,
  Viewer,
  ViewerEventEvents,
};

export type {
  EventAttributes,
  EventCreationAttributes,
  SystemAttributes,
  SystemCreationAttributes,
  TargetAttributes,
  TargetCreationAttributes,
  ViewerAttributes,
  ViewerCreationAttributes,
  ViewerEventEventsAttributes,
  ViewerEventEventsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Event.initModel(sequelize);
  System.initModel(sequelize);
  Target.initModel(sequelize);
  Viewer.initModel(sequelize);
  ViewerEventEvents.initModel(sequelize);

  ViewerEventEvents.belongsTo(Event, { as: "event", foreignKey: "eventID"});
  Event.hasMany(ViewerEventEvents, { as: "ViewerEventEvents", foreignKey: "eventID"});
  Target.belongsTo(System, { as: "system", foreignKey: "systemID"});
  System.hasMany(Target, { as: "Targets", foreignKey: "systemID"});
  Event.belongsTo(Target, { as: "target", foreignKey: "targetID"});
  Target.hasMany(Event, { as: "Events", foreignKey: "targetID"});
  ViewerEventEvents.belongsTo(Viewer, { as: "viewer", foreignKey: "viewerID"});
  Viewer.hasMany(ViewerEventEvents, { as: "ViewerEventEvents", foreignKey: "viewerID"});

  return {
    Event: Event,
    System: System,
    Target: Target,
    Viewer: Viewer,
    ViewerEventEvents: ViewerEventEvents,
  };
}
