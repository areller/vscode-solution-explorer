import * as vscode from "vscode";
import { IFileEvent, FileEvent, FileEventType, IEventAggegator } from "./events";

export class SolutionExplorerFileWatcher {
    private fileWatcher: vscode.FileSystemWatcher;

    constructor(public readonly eventAggregator: IEventAggegator){
    }

    public register(): void {
        this.fileWatcher = vscode.workspace.createFileSystemWatcher("**/*");
	    this.fileWatcher.onDidChange(uri => this.onChange(uri));
	    this.fileWatcher.onDidCreate(uri => this.onCreate(uri));
        this.fileWatcher.onDidDelete(uri => this.onDelete(uri));
    }

    public unregister(): void {
        this.fileWatcher.dispose();
        this.fileWatcher = null;
    }

    private onChange(uri: vscode.Uri): void {
        let event: IFileEvent = new FileEvent(FileEventType.Modify, this.parseUri(uri));
        this.raiseEvent(event);
    }

    private onCreate(uri: vscode.Uri): void {
        let event: IFileEvent = new FileEvent(FileEventType.Create, this.parseUri(uri));
        this.raiseEvent(event);
    }

    private onDelete(uri: vscode.Uri): void {
        let event: IFileEvent = new FileEvent(FileEventType.Delete, this.parseUri(uri));
        this.raiseEvent(event);
    }

    private raiseEvent(event: IFileEvent): void {
        console.log("Event[" + event.eventType + "] " + event.fileEventType + " - " + event.path);
        this.eventAggregator.publish(event);
    }

    private parseUri(uri: vscode.Uri): string {
        return uri.toString().replace("file://", "");
    }
}