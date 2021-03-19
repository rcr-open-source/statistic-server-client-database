import { Event } from "../../models";

export async function findEventsByTargetId(
    targetID: string,
): Promise<Event[]> {

    return await Event.findAll({
        where: {
            targetID: targetID,
        },
    });

}
