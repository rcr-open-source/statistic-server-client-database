import { ViewerEventEvents } from "../../models";

export async function deleteViewerEventEventss(): Promise<ViewerEventEvents[]> {

    const deletedViewerEventEvents = await ViewerEventEvents.findAll();
    try {

        await ViewerEventEvents.destroy({
            where: {

            },
        });
        return deletedViewerEventEvents;

    } catch (error) {

        console.error(error);
        throw error;

    }
}
