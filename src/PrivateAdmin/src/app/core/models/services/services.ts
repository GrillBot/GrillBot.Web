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
    public timeout: number;
    public apiErrorMessage?: string;
    public diagnosticInfo?: DiagnosticInfo;

    static create(data: any): ServiceInfo | null {
        if (!data) { return null; }
        const info = new ServiceInfo();

        info.name = data.name;
        info.url = data.url;
        info.timeout = data.timeout;
        info.apiErrorMessage = data.apiErrorMessage;
        info.diagnosticInfo = DiagnosticInfo.create(data.diagnosticInfo);

        return info;
    }
}


