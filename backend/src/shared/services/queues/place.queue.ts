import { BaseQueue } from '@service/queues/base.queue';
import { placeWorker } from '@worker/place.worker';
import { IPlaceJob } from '@place/interfaces/place.interface';

class PlaceQueue extends BaseQueue {
    constructor() {
        super('place');
        this.processJob('addPlaceToDB', 5, placeWorker.addPlaceToDB);
    }

    public addPlaceJob(name: string, data: IPlaceJob): void {
        this.addJob(name, data);
    }

}

export const placeQueue: PlaceQueue = new PlaceQueue();