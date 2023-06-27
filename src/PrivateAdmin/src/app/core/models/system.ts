import { ConnectionState } from './enums/connection-state';
import { DateTime } from './datetime';

export class CounterStats {
    public section: string;
    public totalTime: number;
    public count: number;
    public averageTime: number;

    static create(data: any): CounterStats | null {
        if (!data) { return null; }
        const stats = new CounterStats();

        stats.section = data.section;
        stats.totalTime = data.totalTime;
        stats.count = data.count;
        stats.averageTime = data.averageTime;

        return stats;
    }
}

export class DashboardService {
    public id: string;
    public name: string;
    public isAvailable: boolean;

    static create(data: any): DashboardService | null {
        if (!data) { return null; }
        const service = new DashboardService();

        service.id = data.id;
        service.name = data.name;
        service.isAvailable = data.isAvailable;

        return service;
    }
}

export class DashboardInfo {
    public isDevelopment: boolean;
    public startAt: DateTime;
    public uptime: number;
    public cpuTime: number;
    public connectionState: ConnectionState;
    public usedMemory: number;
    public isActive: boolean;
    public currentDateTime: DateTime;

    static create(data: any): DashboardInfo | null {
        if (!data) { return null; }
        const dashboard = new DashboardInfo();

        dashboard.isDevelopment = data.isDevelopment;
        dashboard.startAt = DateTime.fromISOString(data.startAt);
        dashboard.uptime = data.uptime;
        dashboard.cpuTime = data.cpuTime;
        dashboard.connectionState = data.connectionState;
        dashboard.usedMemory = data.usedMemory;
        dashboard.isActive = data.isActive;
        dashboard.currentDateTime = DateTime.fromISOString(data.currentDateTime);

        return dashboard;
    }
}
