import { Dictionary, List } from 'src/app/core/models/common';
import { Support } from '../lib/support';
import { DateTime } from './datetime';

export class StatisticItem {
    public key: string;
    public last: DateTime;
    public successCount: number;
    public failedCount: number;
    public successRate: number;
    public minDuration: number;
    public maxDuration: number;
    public totalDuration: number;
    public avgDuration: number;
    public lastRunDuration: number;

    static create(data: any): StatisticItem {
        const item = new StatisticItem();

        item.key = data.key;
        item.failedCount = data.failedCount;
        item.last = DateTime.fromISOString(data.last);
        item.successCount = data.successCount;
        item.successRate = data.successRate;
        item.minDuration = data.minDuration;
        item.maxDuration = data.maxDuration;
        item.totalDuration = data.totalDuration;
        item.avgDuration = data.avgDuration;
        item.lastRunDuration = data.lastRunDuration;

        return item;
    }
}

export class DatabaseStatistics {
    public database: Dictionary<string, number>;
    public cache: Dictionary<string, number>;

    static create(data: any): DatabaseStatistics {
        const stats = new DatabaseStatistics();

        stats.database = Support.createDictFromObj(data.database);
        stats.cache = Support.createDictFromObj(data.cache);

        return stats;
    }
}

export class AvgExecutionTimes {
    public internalApi: Dictionary<string, number>;
    public externalApi: Dictionary<string, number>;
    public jobs: Dictionary<string, number>;
    public interactions: Dictionary<string, number>;

    static create(data: any): AvgExecutionTimes {
        const result = new AvgExecutionTimes();

        result.internalApi = Support.createDictFromObj(data.internalApi);
        result.externalApi = Support.createDictFromObj(data.externalApi);
        result.jobs = Support.createDictFromObj(data.jobs);
        result.interactions = Support.createDictFromObj(data.interactions);

        return result;
    }
}

export class AuditLogStatistics {
    byType: Dictionary<string, number>;
    byDate: Dictionary<string, number>;
    fileCounts: Dictionary<string, number>;
    fileSizes: Dictionary<string, number>;

    static create(data: any): AuditLogStatistics {
        const statistics = new AuditLogStatistics();

        statistics.byDate = Support.createDictFromObj(data.byDate);
        statistics.byType = Support.createDictFromObj(data.byType);
        statistics.fileSizes = Support.createDictFromObj(data.fileSizes);
        statistics.fileCounts = Support.createDictFromObj(data.fileCounts);

        return statistics;
    }
}

export class OperationStatItem {
    public section: string;
    public count: number;
    public averageTime: number;
    public totalTime: number;
    public childItems: OperationStatItem[] = [];

    static create(data: any): OperationStatItem {
        const item = new OperationStatItem();

        item.section = data.section;
        item.count = data.count;
        item.averageTime = data.averageTime;
        item.totalTime = data.totalTime;
        item.childItems = data.childItems.map((o: any) => OperationStatItem.create(o));

        return item;
    }
}

export class OperationStats {
    public statistics: OperationStatItem[] = [];
    public countChartData: Dictionary<string, number>;
    public timeChartData: Dictionary<string, number>;

    static create(data: any): OperationStats {
        const stats = new OperationStats();

        stats.statistics = data.statistics.map((o: any) => OperationStatItem.create(o));
        stats.countChartData = Support.createDictFromObj(data.countChartData);
        stats.timeChartData = Support.createDictFromObj(data.timeChartData);

        return stats;
    }
}

export class ApiStatistics {
    public byDateInternalApi: Dictionary<string, number>;
    public byDatePublicApi: Dictionary<string, number>;
    public byStatusCodeInternalApi: Dictionary<string, number>;
    public byStatusCodePublicApi: Dictionary<string, number>;
    public endpoints: List<StatisticItem>;

    static create(data: any): ApiStatistics {
        const result = new ApiStatistics();

        result.byDateInternalApi = Support.createDictFromObj(data.byDateInternalApi);
        result.byDatePublicApi = Support.createDictFromObj(data.byDatePublicApi);
        result.byStatusCodeInternalApi = Support.createDictFromObj(data.byStatusCodeInternalApi);
        result.byStatusCodePublicApi = Support.createDictFromObj(data.byStatusCodePublicApi);
        result.endpoints = data.endpoints.map((o: any) => StatisticItem.create(o));

        return result;
    }
}
