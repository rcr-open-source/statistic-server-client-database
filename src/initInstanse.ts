import { Sequelize, Options } from "sequelize";
import * as InitTables from "./init-models";
import { ClientAPI } from "./types/ClientAPI";
import * as ModelQueries from "./query";

function getQueries(sequelize: Sequelize): ClientAPI["queries"] {

    return  {
        ...ModelQueries,
    };;

}

export function initСlientInstance(
    options: Options,
): ClientAPI {
    
        const sequelize = new Sequelize(options);
        InitTables.initModels(sequelize);
        const queries = getQueries(sequelize);
        return {
            sequelize,
            queries,
        };

}
