import { DateTime } from 'src/app/core/models/datetime';

export class ScheduledJob {
    public name: string;
    public startCount: number;
    public averageTime: number;
    public minTime: number;
    public maxTime: number;
    public totalTime: number;
    public lastRun?: DateTime;
    public nextRun: DateTime;
    public running: boolean;
    public lastRunDuration: number;
    public isActive: boolean;
    public failedCount: number;

    static create(data: any): ScheduledJob | null {
        if (!data) { return null; }

        const item = new ScheduledJob();

        item.name = data.name;
        item.startCount = data.startCount;
        item.averageTime = data.averageTime;
        item.minTime = data.minTime;
        item.maxTime = data.maxTime;
        item.totalTime = data.totalTime;
        item.lastRun = data.lastRun ? DateTime.fromISOString(data.lastRun) : null;
        item.nextRun = DateTime.fromISOString(data.nextRun);
        item.running = data.running;
        item.lastRunDuration = data.lastRunDuration;
        item.isActive = data.isActive;
        item.failedCount = data.failedCount;

        return item;
    }
}
