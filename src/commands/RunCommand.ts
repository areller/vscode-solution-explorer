import { CliCommandBase } from "./base/CliCommandBase";
import { SolutionExplorerProvider } from "../SolutionExplorerProvider";
import { TreeItem } from "../tree/TreeItem";
import { StaticCommandParameter } from "./parameters/StaticCommandParameter";

export class RunCommand extends CliCommandBase {
    constructor(provider: SolutionExplorerProvider) {
        super('Run', provider, 'dotnet');
    }

    protected shouldRun(item: TreeItem): boolean {
        this.parameters = [
            new StaticCommandParameter('run'),
            new StaticCommandParameter(item.path, '--project')
        ];

        return true;
    }
}