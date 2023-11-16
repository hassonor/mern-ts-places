import { BaseQueue } from '@service/queues/base.queue';
import { placeWorker } from '@worker/place.worker';
import { IPlaceData, IPlaceUpdateJob } from '@place/interfaces/place.interface';

class PlaceQueue extends BaseQueue {
    constructor() {
        super('place');
        this.processJob('addPlaceToDB', 5, placeWorker.addPlaceToDB);
        this.processJob('updatePlaceInDB', 5, placeWorker.updatePlaceInDB);
    }

    public addPlaceJob(name: string, data: IPlaceData | IPlaceUpdateJob): void {
        this.addJob(name, data);
    }

}

export const placeQueue: PlaceQueue = new PlaceQueue();