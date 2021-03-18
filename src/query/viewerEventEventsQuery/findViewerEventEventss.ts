import { ViewerEventEvents } from "../../models";

export async function findViewerEventEventss(): Promise<ViewerEventEvents[]> {

    return await ViewerEventEvents.findAll();

}
