import { Viewer } from "../../models";
import { findViewerEventEventsByEventId } from "../viewerEventEventsQuery";
import { findViewer } from '.';

export async function findViewerIdsByEventId(
    eventID: string,
): Promise<string[]> {

    const viewerEventEvents = await findViewerEventEventsByEventId(eventID);
    return viewerEventEvents.map(viewerEventEvent => viewerEventEvent.viewerID);

}
