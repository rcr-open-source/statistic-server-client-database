import { Sequelize } from "sequelize";
import * as ClientQueries from "../query";

export type ClientAPI = {
    queries: typeof ClientQueries;
    sequelize: Sequelize;
};

