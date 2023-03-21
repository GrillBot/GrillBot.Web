import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'discordPermsPipe'
})
export class DiscordPermsPipePipe implements PipeTransform {
    transform(value: number, ...args: any[]): string {
        const result: string[] = [];

        // tslint:disable: no-bitwise
        if ((value & 0x0000000001) !== 0) { result.push('CREATE_INSTANT_INVITE'); }
        if ((value & 0x0000000002) !== 0) { result.push('KICK_MEMBERS'); }
        if ((value & 0x0000000004) !== 0) { result.push('BAN_MEMBERS'); }
        if ((value & 0x0000000008) !== 0) { result.push('ADMINISTRATOR'); }
        if ((value & 0x0000000010) !== 0) { result.push('MANAGE_CHANNELS'); }
        if ((value & 0x0000000020) !== 0) { result.push('MANAGE_GUILD'); }
        if ((value & 0x0000000040) !== 0) { result.push('ADD_REACTIONS'); }
        if ((value & 0x0000000080) !== 0) { result.push('VIEW_AUDIT_LOG'); }
        if ((value & 0x0000000100) !== 0) { result.push('PRIORITY_SPEAKER'); }
        if ((value & 0x0000000200) !== 0) { result.push('STREAM'); }
        if ((value & 0x0000000400) !== 0) { result.push('VIEW_CHANNEL'); }
        if ((value & 0x0000000800) !== 0) { result.push('SEND_MESSAGES'); }
        if ((value & 0x0000001000) !== 0) { result.push('SEND_TTS_MESSAGES'); }
        if ((value & 0x0000002000) !== 0) { result.push('MANAGE_MESSAGES'); }
        if ((value & 0x0000004000) !== 0) { result.push('EMBED_LINKS'); }
        if ((value & 0x0000008000) !== 0) { result.push('ATTACH_FILES'); }
        if ((value & 0x0000010000) !== 0) { result.push('READ_MESSAGE_HISTORY'); }
        if ((value & 0x0000020000) !== 0) { result.push('MENTION_EVERYONE'); }
        if ((value & 0x0000040000) !== 0) { result.push('USE_EXTERNAL_EMOJIS'); }
        if ((value & 0x0000080000) !== 0) { result.push('VIEW_GUILD_INSIGHTS'); }
        if ((value & 0x0000100000) !== 0) { result.push('CONNECT'); }
        if ((value & 0x0000200000) !== 0) { result.push('SPEAK'); }
        if ((value & 0x0000400000) !== 0) { result.push('MUTE_MEMBERS'); }
        if ((value & 0x0000800000) !== 0) { result.push('DEAFEN_MEMBERS'); }
        if ((value & 0x0001000000) !== 0) { result.push('MOVE_MEMBERS'); }
        if ((value & 0x0002000000) !== 0) { result.push('USE_VAD'); }
        if ((value & 0x0004000000) !== 0) { result.push('CHANGE_NICKNAME'); }
        if ((value & 0x0008000000) !== 0) { result.push('MANAGE_NICKNAMES'); }
        if ((value & 0x0010000000) !== 0) { result.push('MANAGE_ROLES'); }
        if ((value & 0x0020000000) !== 0) { result.push('MANAGE_WEBHOOKS'); }
        if ((value & 0x0040000000) !== 0) { result.push('MANAGE_EMOJIS_AND_STICKERS'); }
        if ((value & 0x0080000000) !== 0) { result.push('USE_APPLICATION_COMMANDS'); }
        if ((value & 0x0100000000) !== 0) { result.push('REQUEST_TO_SPEAK'); }
        if ((value & 0x0400000000) !== 0) { result.push('MANAGE_THREADS'); }
        if ((value & 0x0800000000) !== 0) { result.push('CREATE_PUBLIC_THREADS'); }
        if ((value & 0x1000000000) !== 0) { result.push('CREATE_PRIVATE_THREADS'); }
        if ((value & 0x2000000000) !== 0) { result.push('USE_EXTERNAL_STICKERS'); }
        if ((value & 0x4000000000) !== 0) { result.push('SEND_MESSAGES_IN_THREADS'); }
        if ((value & 0x8000000000) !== 0) { result.push('START_EMBEDDED_ACTIVITIES'); }

        return result.join(', ');
    }
}
