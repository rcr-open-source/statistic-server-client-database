import { ViewerEventEvents } from "../../models";

export async function findViewerEventEvents(
    id: string,
): Promise<ViewerEventEvents | null> {

    return await ViewerEventEvents.findOne({
        where: {
            id,
        },
    });

}
