import { Target } from "../../models";

export async function findTargetsBySystemId(
    systemID: string,
): Promise<Target[]> {

    return await Target.findAll({
        where: {
            systemID: systemID,
        },
    });

}
