import { ViewerEventEvents } from "../../models";

export async function findViewerEventEventsByEventId(
    eventID: string,
): Promise<ViewerEventEvents[]> {

    return await ViewerEventEvents.findAll({
        where: {
            eventID,
        },
    });

}
