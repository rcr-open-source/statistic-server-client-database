import type { Sequelize, Model } from "sequelize";
import { Event } from "./models";
import type { EventAttributes, EventCreationAttributes } from "./models";
import { Target } from "./models";
import type { TargetAttributes, TargetCreationAttributes } from "./models";
import { Viewer } from "./models";
import type { ViewerAttributes, ViewerCreationAttributes } from "./models";
import { ViewerTargetTargets } from "./models";
import type { ViewerTargetTargetsAttributes, ViewerTargetTargetsCreationAttributes }
    from "./models";

export {
    Event,
    Target,
    Viewer,
    ViewerTargetTargets,
};

export type {
    EventAttributes,
    EventCreationAttributes,
    TargetAttributes,
    TargetCreationAttributes,
    ViewerAttributes,
    ViewerCreationAttributes,
    ViewerTargetTargetsAttributes,
    ViewerTargetTargetsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {

    Event.initModel(sequelize);
    //System.initModel(sequelize);
    Target.initModel(sequelize);
    Viewer.initModel(sequelize);
    ViewerTargetTargets.initModel(sequelize);

    Event.belongsTo(Target, {
        as: "target",
        foreignKey: "targetID",
    });
    Target.hasMany(Event, {
        as: "Events",
        foreignKey: "targetID",
    });
    ViewerTargetTargets.belongsTo(Target, {
        as: "target",
        foreignKey: "targetID",
    });
    Target.hasMany(ViewerTargetTargets, {
        as: "ViewerTargetTargets",
        foreignKey: "targetID",
    });
    Event.belongsTo(Viewer, {
        as: "viewer",
        foreignKey: "viewerID",
    });
    Viewer.hasMany(Event, {
        as: "Events",
        foreignKey: "viewerID",
    });
    ViewerTargetTargets.belongsTo(Viewer, {
        as: "viewer",
        foreignKey: "viewerID",
    });
    Viewer.hasMany(ViewerTargetTargets, {
        as: "ViewerTargetTargets",
        foreignKey: "viewerID",
    });

    return {
        Event: Event,
        Target: Target,
        Viewer: Viewer,
        ViewerTargetTargets: ViewerTargetTargets,
    };

}
