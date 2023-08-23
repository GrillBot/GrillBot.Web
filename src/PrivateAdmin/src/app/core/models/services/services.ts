import { Support } from 'src/app/core/lib/support';
import { Dictionary, List } from '../common';
import { DateTime } from '../datetime';
import { OperationStatItem } from '../statistics';

export class RequestStatistics {
    public endpoint: string;
    public count: number;
    public lastRequestAt: DateTime;
    public totalTime: number;
    public avgTime: number;
    public lastTime: number;

    static create(data: any): RequestStatistics | null {
        if (!data) { return null; }

        const statistics = new RequestStatistics();

        statistics.count = data.count;
        statistics.endpoint = data.endpoint;
        statistics.lastRequestAt = DateTime.fromISOString(data.lastRequestAt);
        statistics.lastTime = data.lastTime;
        statistics.avgTime = data.avgTime;
        statistics.totalTime = data.totalTime;

        return statistics;
    }
}

export class DiagnosticInfo {
    public usedMemory: number;
    public uptime: number;
    public requestsCount: number;
    public measuredFrom: DateTime;
    public endpoints: List<RequestStatistics>;
    public cpuTime: number;
    public databaseStatistics: Dictionary<string, number> | null;
    public operations: OperationStatItem[] = [];

    static create(data: any): DiagnosticInfo | null {
        if (!data) { return null; }

        const info = new DiagnosticInfo();

        info.usedMemory = data.usedMemory;
        info.uptime = data.uptime;
        info.requestsCount = data.requestsCount;
        info.measuredFrom = DateTime.fromISOString(data.measuredFrom);
        info.endpoints = data.endpoints.map((o: any) => RequestStatistics.create(o));
        info.cpuTime = data.cpuTime;
        info.databaseStatistics = data.databaseStatistics ? Support.createDictFromObj(data.databaseStatistics) : null;
        info.operations = data.operations.map((o: any) => OperationStatItem.create(o));

        return info;
    }
}

export class ServiceInfo {
    public name: string;
    public url: string;
    public apiErrorMessage?: string;
    public diagnosticInfo?: DiagnosticInfo;

    static create(data: any): ServiceInfo | null {
        if (!data) { return null; }
        const info = new ServiceInfo();

        info.name = data.name;
        info.url = data.url;
        info.apiErrorMessage = data.apiErrorMessage;
        info.diagnosticInfo = DiagnosticInfo.create(data.diagnosticInfo);

        return info;
    }
}


export class DashboardInfoRow {
    public name: string;
    public duration: number;
    public success: boolean;
    public result: string | null;

    static create(data: any): DashboardInfoRow {
        const row = new DashboardInfoRow();

        row.duration = data.duration;
        row.name = data.name;
        row.result = data.result;
        row.success = data.success;

        return row;
    }
}

export class TodayAvgTimes {
    public privateApi: number;
    public publicApi: number;
    public interactions: number;
    public jobs: number;

    static create(data: any): TodayAvgTimes {
        const result = new TodayAvgTimes();

        result.interactions = data.interactions;
        result.jobs = data.jobs;
        result.privateApi = data.privateApi;
        result.publicApi = data.publicApi;

        return result;
    }
}

export class AuditLogStatusInfo {
    public itemsToArchive: number;
    public itemsToProcess: number;
    public itemsToDelete: number;

    static create(data: any): AuditLogStatusInfo {
        const info = new AuditLogStatusInfo();

        info.itemsToArchive = data.itemsToArchive;
        info.itemsToDelete = data.itemsToDelete;
        info.itemsToProcess = data.itemsToProcess;
        return info;
    }
}

export class PointsServiceStatusInfo {
    public pendingUsersToProcess: number;
    public transactionsToMerge: number;

    static create(data: any): PointsServiceStatusInfo {
        const info = new PointsServiceStatusInfo();

        info.pendingUsersToProcess = data.pendingUsersToProcess;
        info.transactionsToMerge = data.transactionsToMerge;

        return info;
    }
}
