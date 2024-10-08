import { Model, Document } from 'mongoose';
import { IRecord } from '../../shared/models/record';
import { IFilterOptions, IRecordsPayload, IRecordsResponse, } from './records.interface';
import logger from '../../config/logger';

export default class RecordsService {
    private readonly _recordModel: Model<IRecord & Document>;

    constructor(recordModel: Model<IRecord & Document>) {
        this._recordModel = recordModel;
    }

    public async getRecords(payload: IRecordsPayload): Promise<IRecordsResponse> {
        const { skip, limit, sortBy, order, filterOptions } = payload;
        try {

            const records = await this._recordModel
                .find(filterOptions as IFilterOptions)
                .select('-password')
                .sort({ [sortBy]: order })
                .skip(skip as number)
                .limit(limit as number)
                .exec();

            return { records, total: records.length };
        } catch (error) {
            logger.error('Error fetching records', error);
            throw new Error('Error fetching records');
        }
    }

    public async searchRecords(payload: IRecordsPayload): Promise<IRecordsResponse> {
        const { skip, limit, sortBy, order, filterOptions, search } = payload;
        try {
            const records = await this._recordModel
                .find({
                    $text: { $search: search as string },
                    ...filterOptions,
                })
                .select('-password')
                .sort({ [sortBy]: order })
                .skip(skip as number)
                .limit(limit as number)
                .exec();

            return { records, total: records.length };
        } catch (error) {
            logger.error('Error searching records', error);
            throw new Error('Error searching records');
        }
    }
}
