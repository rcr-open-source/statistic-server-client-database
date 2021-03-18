import { ViewerEventEvents } from "../../models";

export async function deleteViewerEventEvents(
    id: string,
): Promise<ViewerEventEvents | null> {

    const option = {
        where: {
            id,
        },
    }

    const deletedViewerEventEvents = await ViewerEventEvents.findOne(option);
    try {

        await ViewerEventEvents.destroy(option);
        return deletedViewerEventEvents;

    } catch (error) {

        console.error(error);
        throw error;

    }
}
