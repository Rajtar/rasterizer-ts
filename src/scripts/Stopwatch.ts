export class Stopwatch {

    private static startTime: number;

    static start(): void {
        Stopwatch.startTime = performance.now();
    }

    static stopAndLog(taskName: string): void {
        console.log(taskName + " took: " + String(performance.now() - Stopwatch.startTime));
    }
}