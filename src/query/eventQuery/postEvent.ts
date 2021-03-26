import { Event, Viewer, ViewerEventEvents } from "../../models";
import { findEventByName } from "./findEventByName";
import { findOrCreateViewerByIdentifier } from "../viewerQuery";
import { createViewerEventEvents } from "../viewerEventEventsQuery";

export async function postEvent(
  eventName: string,
  identifier: string,
  compInfo: string,
  userInfo: string,
): Promise<ViewerEventEvents> {
  const event: Event | null = await findEventByName(eventName?.toString() || '');
  console.log(event);
  const viewer: Viewer = await findOrCreateViewerByIdentifier(
    identifier,
    compInfo,
    userInfo,
  );
  const viewerEventEvents = await createViewerEventEvents({
    viewerID: viewer.id,
    eventID: event?.id || '',
  });
  console.log(viewerEventEvents);
  return viewerEventEvents;
}
