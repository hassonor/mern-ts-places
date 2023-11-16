import { BaseQueue } from '@service/queues/base.queue';
import { placeWorker } from '@worker/place.worker';
import { IPlaceData, IPlaceUpdateDeleteJob } from '@place/interfaces/place.interface';

class PlaceQueue extends BaseQueue {
    constructor() {
        super('place');
        this.processJob('addPlaceToDB', 5, placeWorker.addPlaceToDB);
        this.processJob('updatePlaceInDB', 5, placeWorker.updatePlaceInDB);
        this.processJob('deletePlaceInDB', 5, placeWorker.deletePlaceInDB);
    }

    public addPlaceJob(name: string, data: IPlaceData | IPlaceUpdateDeleteJob): void {
        this.addJob(name, data);
    }

}

export const placeQueue: PlaceQueue = new PlaceQueue();