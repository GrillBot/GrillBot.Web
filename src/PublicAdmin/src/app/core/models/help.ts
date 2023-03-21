export class TextBasedCommand {
    public command: string;
    public parameters: string[];
    public aliases: string[];
    public description: string;
    public guilds: string[];

    static create(data: any): TextBasedCommand | null {
        if (!data) { return null; }
        const command = new TextBasedCommand();

        command.command = data.command;
        command.parameters = data.parameters ? data.parameters.map((o: string) => o) : [];
        command.aliases = data.aliases ? data.aliases.map((o: string) => o) : [];
        command.description = data.description;
        command.guilds = data.guilds ? data.guilds.map((o: string) => o) : [];

        return command;
    }
}

export class CommandGroup {
    public groupName: string;
    public description: string;
    public commands: TextBasedCommand[];

    static create(data: any): CommandGroup | null {
        if (!data) { return null; }
        const group = new CommandGroup();

        group.description = data.description;
        group.commands = data.commands.map((o: any) => TextBasedCommand.create(o));
        group.groupName = data.groupName;

        return group;
    }
}
