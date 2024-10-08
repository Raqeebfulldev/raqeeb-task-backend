import { StatusEnum } from "../../shared/enums";
import { IRecord } from "../../shared/models/record";

export interface IFilterOptions {
    status?: StatusEnum;
    username?: object;
    leaked_sources?: number;
    created_at?: {
        $gte?: Date;
        $lte?: Date;
    };
}

export interface IRecordsResponse {
    records: IRecord[];
    total: number;
}

export interface IRecordsPayload {
    skip: number;
    limit: number;
    sortBy: string;
    order: 1 | -1;
    search?: string;
    filterOptions?: IFilterOptions;
}