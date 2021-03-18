import { ViewerEventEvents } from "../../models";


export async function updateViewerEventEvents(
    id: string,
    viewerID?: string,
    eventID?: string,
): Promise<ViewerEventEvents | null> {

    const options = {
        where: {
            id,
        },
    }
    try {

        await ViewerEventEvents.update({
            eventID,
            viewerID,
        }, options);

        return await ViewerEventEvents.findOne(options);

    } catch (error) {

        console.error(error);
        throw error;

    }

}

