import { Event } from "../../models";

export async function updateEvent(
    id: string,
    name?: string,
    targetID?: string,
): Promise<Event | null> {

    const options = {
        where: {
            id,
        },
    }
    try {

        await Event.update({
            name,
            targetID,
        }, options);

        return await Event.findOne(options);

    } catch (error) {

        console.error(error);
        throw error;

    }

}


