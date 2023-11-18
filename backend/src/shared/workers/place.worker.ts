import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { placeService } from '@service/db/place.service';

const log: Logger = config.createLogger('placeWorker');

class PlaceWorker {
    async addPlaceToDB(job: Job, done: DoneCallback): Promise<void> {
        try {
            const {data} = job;

            await placeService.createPlace(data);
            job.progress(100);

            done(null, job.data);
        } catch (error) {
            log.error(error);
            done(error as Error);
        }
    }

    async updatePlaceInDB(job: Job, done: DoneCallback): Promise<void> {
        try {
            const {placeId, updateData} = job.data;

            await placeService.updatePlace(placeId, updateData);
            job.progress(100);
            done(null, job.data);
        } catch (error) {
            log.error(error);
            done(error as Error);
        }
    }

    async deletePlaceInDB(job: Job, done: DoneCallback): Promise<void> {
        try {
            const {userId, placeId} = job.data;

            await placeService.deletePlace(userId, placeId);
            job.progress(100);
            done(null, job.data);
        } catch (error) {
            log.error(error);
            done(error as Error);
        }
    }
}

export const placeWorker: PlaceWorker = new PlaceWorker();