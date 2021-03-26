import { Viewer, ViewerCreationAttributes } from "../../models";
import { createViewer } from "./createViewer";

export async function findOrCreateViewerByIdentifier(
    identifier: string,
    compInfo: string,
    userInfo: string,
): Promise<Viewer> {

    const viewer: Viewer | null = await Viewer.findOne({
        where: {
            identifier,
        },
    });

    const viewerCreationAttributes: ViewerCreationAttributes = {
      identifier,
      compInfo,
      userInfo
    }
    return viewer === null ? createViewer(viewerCreationAttributes) : viewer;
}
