import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'discordPermsPipe'
})
export class DiscordPermsPipePipe implements PipeTransform {
    transform(value: number, ..._: any[]): string {
        const result: string[] = [];

        if ((value & 0x0000000000000001) !== 0) { result.push('CREATE_INSTANT_INVITE'); }
        if ((value & 0x0000000000000002) !== 0) { result.push('KICK_MEMBERS'); }
        if ((value & 0x0000000000000004) !== 0) { result.push('BAN_MEMBERS'); }
        if ((value & 0x0000000000000008) !== 0) { result.push('ADMINISTRATOR'); }
        if ((value & 0x0000000000000010) !== 0) { result.push('MANAGE_CHANNELS'); }
        if ((value & 0x0000000000000020) !== 0) { result.push('MANAGE_GUILD'); }
        if ((value & 0x0000000000000040) !== 0) { result.push('ADD_REACTIONS'); }
        if ((value & 0x0000000000000080) !== 0) { result.push('VIEW_AUDIT_LOG'); }
        if ((value & 0x0000000000000100) !== 0) { result.push('PRIORITY_SPEAKER'); }
        if ((value & 0x0000000000000200) !== 0) { result.push('STREAM'); }
        if ((value & 0x0000000000000400) !== 0) { result.push('VIEW_CHANNEL'); }
        if ((value & 0x0000000000000800) !== 0) { result.push('SEND_MESSAGES'); }
        if ((value & 0x0000000000001000) !== 0) { result.push('SEND_TTS_MESSAGES'); }
        if ((value & 0x0000000000002000) !== 0) { result.push('MANAGE_MESSAGES'); }
        if ((value & 0x0000000000004000) !== 0) { result.push('EMBED_LINKS'); }
        if ((value & 0x0000000000008000) !== 0) { result.push('ATTACH_FILES'); }
        if ((value & 0x0000000000010000) !== 0) { result.push('READ_MESSAGE_HISTORY'); }
        if ((value & 0x0000000000020000) !== 0) { result.push('MENTION_EVERYONE'); }
        if ((value & 0x0000000000040000) !== 0) { result.push('USE_EXTERNAL_EMOJIS'); }
        if ((value & 0x0000000000080000) !== 0) { result.push('VIEW_GUILD_INSIGHTS'); }
        if ((value & 0x0000000000100000) !== 0) { result.push('CONNECT'); }
        if ((value & 0x0000000000200000) !== 0) { result.push('SPEAK'); }
        if ((value & 0x0000000000400000) !== 0) { result.push('MUTE_MEMBERS'); }
        if ((value & 0x0000000000800000) !== 0) { result.push('DEAFEN_MEMBERS'); }
        if ((value & 0x0000000001000000) !== 0) { result.push('MOVE_MEMBERS'); }
        if ((value & 0x0000000002000000) !== 0) { result.push('USE_VAD'); }
        if ((value & 0x0000000004000000) !== 0) { result.push('CHANGE_NICKNAME'); }
        if ((value & 0x0000000008000000) !== 0) { result.push('MANAGE_NICKNAMES'); }
        if ((value & 0x0000000010000000) !== 0) { result.push('MANAGE_ROLES'); }
        if ((value & 0x0000000020000000) !== 0) { result.push('MANAGE_WEBHOOKS'); }
        if ((value & 0x0000000040000000) !== 0) { result.push('MANAGE_GUILD_EXPRESSIONS'); }
        if ((value & 0x0000000080000000) !== 0) { result.push('USE_APPLICATION_COMMANDS'); }
        if ((value & 0x0000000100000000) !== 0) { result.push('REQUEST_TO_SPEAK'); }
        if ((value & 0x0000000200000000) !== 0) { result.push('MANAGE_EVENTS'); }
        if ((value & 0x0000000400000000) !== 0) { result.push('MANAGE_THREADS'); }
        if ((value & 0x0000000800000000) !== 0) { result.push('CREATE_PUBLIC_THREADS'); }
        if ((value & 0x0000001000000000) !== 0) { result.push('CREATE_PRIVATE_THREADS'); }
        if ((value & 0x0000002000000000) !== 0) { result.push('USE_EXTERNAL_STICKERS'); }
        if ((value & 0x0000004000000000) !== 0) { result.push('SEND_MESSAGES_IN_THREADS'); }
        if ((value & 0x0000008000000000) !== 0) { result.push('USE_EMBEDDED_ACTIVITIES'); }
        if ((value & 0x0000010000000000) !== 0) { result.push('MODERATE_MEMBERS'); }
        if ((value & 0x0000020000000000) !== 0) { result.push('VIEW_CREATOR_MONETIZATION_ANALYTICS'); }
        if ((value & 0x0000040000000000) !== 0) { result.push('USE_SOUNDBOARD'); }
        if ((value & 0x0000400000000000) !== 0) { result.push('SEND_VOICE_MESSAGES'); }

        return result.join(', ');
    }
}
