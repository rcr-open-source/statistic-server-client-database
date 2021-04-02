import { Event } from "../../models";

export async function findEventByName(
    eventName: string,
): Promise<Event | null> {
    return await Event.findOne({
        where: {
            name: eventName,
        },
    });
}
