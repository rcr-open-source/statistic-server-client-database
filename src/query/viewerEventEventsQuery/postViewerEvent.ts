import { Event, Viewer, ViewerEventEvents } from "../../models";
import { findEventByName } from "../eventQuery/findEventByName";
import { findOrCreateViewerByIdentifier } from "../viewerQuery";
import { createViewerEventEvents } from "./createViewerEventEvents";

export async function postViewerEvent(
  eventName: string,
  identifier: string,
  compInfo: string,
  userInfo: string,
): Promise<Event | null> {
  const event: Event | null = await findEventByName(eventName?.toString() || '');
  const viewer: Viewer = await findOrCreateViewerByIdentifier(
    identifier,
    compInfo,
    userInfo,
  );

  const viewerEventEvents = await createViewerEventEvents({
    viewerID: viewer.id,
    eventID: event?.id || '',
  });

  return event;
}
