import { ViewerEventEvents, ViewerEventEventsCreationAttributes } from "../../models";

export async function createViewerEventEvents(

    value: ViewerEventEventsCreationAttributes,

): Promise<ViewerEventEvents> {

    try {

        return await ViewerEventEvents.create(value);
    
    } catch (error) {

        console.error(error);
        throw error;
    
    }

}
