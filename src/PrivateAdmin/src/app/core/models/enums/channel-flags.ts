export enum ChannelFlags {
    StatsHidden = 1,
    CommandsDisabled = 2,
    Deleted = 4,
    AutoReplyDeactivated = 8,
    PointsDeactivated = 16,
    EphemeralCommands = 32
}

export enum ChannelSettingsFlags {
    StatsHidden = ChannelFlags.StatsHidden,
    CommandsDisabled = ChannelFlags.CommandsDisabled,
    AutoReplyDeactivated = ChannelFlags.AutoReplyDeactivated,
    PointsDeactivated = ChannelFlags.PointsDeactivated,
    EphemeralCommands = ChannelFlags.EphemeralCommands
}

export enum ChannelFlagTexts {
    StatsHidden = 'Skryté statistiky',
    CommandsDisabled = 'Vypnuté příkazy',
    AutoReplyDeactivated = 'Automatické odpovědi vypnuty',
    PointsDeactivated = 'Body deaktivovány',
    EphemeralCommands = 'Skryté příkazy'
}

export const ChannelFlagMapping = [
    { source: ChannelSettingsFlags.StatsHidden, destination: ChannelFlags.StatsHidden },
    { source: ChannelSettingsFlags.CommandsDisabled, destination: ChannelFlags.CommandsDisabled },
    { source: ChannelSettingsFlags.AutoReplyDeactivated, destination: ChannelFlags.AutoReplyDeactivated },
    { source: ChannelSettingsFlags.PointsDeactivated, destination: ChannelFlags.PointsDeactivated },
    { source: ChannelSettingsFlags.EphemeralCommands, destination: ChannelFlags.EphemeralCommands }
];
