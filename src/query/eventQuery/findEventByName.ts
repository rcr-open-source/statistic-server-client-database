import { Event } from "../../models";

export async function findEventByName(
    eventName: string,
): Promise<Event | null> {
    console.log(eventName);
    return await Event.findOne({
        where: {
            name: eventName,
        },
    });
}
