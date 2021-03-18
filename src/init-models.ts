import type { Sequelize, Model } from "sequelize";
import { Event } from "./models";
import type { EventAttributes, EventCreationAttributes } from "./models";
import { System } from "./models";
import type { SystemAttributes, SystemCreationAttributes } from "./models";
import { Target } from "./models";
import type { TargetAttributes, TargetCreationAttributes } from "./models";
import { Viewer } from "./models";
import type { ViewerAttributes, ViewerCreationAttributes } from "./models";
import { ViewerEventEvents } from "./models";
import type { ViewerEventEventsAttributes, ViewerEventEventsCreationAttributes }
    from "./models/ViewerEventEvents";

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

    Target.belongsTo(System, {
        as: "system",
        foreignKey: "systemID",
    });
    System.hasMany(Target, {
        as: "Targets",
        foreignKey: "systemID",
    });
    Event.belongsTo(Target, {
        as: "target",
        foreignKey: "targetID",
    });
    Target.hasMany(Event, {
        as: "Events",
        foreignKey: "targetID",
    });
    ViewerEventEvents.belongsTo(Event, {
        as: "event",
        foreignKey: "eventID",
    });
    Event.hasMany(ViewerEventEvents, {
        as: "ViewerEventEvents",
        foreignKey: "eventID",
    });
    ViewerEventEvents.belongsTo(Viewer, {
        as: "viewer",
        foreignKey: "viewerID",
    });
    Viewer.hasMany(ViewerEventEvents, {
        as: "ViewerEventEvents",
        foreignKey: "viewerID",
    });

    return {
        Event: Event,
        System: System,
        Target: Target,
        Viewer: Viewer,
        ViewerEventEvents: ViewerEventEvents,
    };

}