import { Component, computed, input } from "@angular/core";

@Component({
  selector: 'app-guild-updated-preview',
  templateUrl: './guild-updated-preview.component.html',
  standalone: true,
  imports: [
  ]
})
export class GuildUpdatedPreviewComponent {
  preview = input.required<any>();

  isSomeChanged = computed(() => {
    return Object.keys(this.preview())
      .filter(k => typeof this.preview()[k] === 'boolean' && this.preview()[k])
      .some(k => this.preview()[k]);
  });

  changedItems = computed(() => {
    return Object.keys(this.preview())
      .filter(k => typeof this.preview()[k] === 'boolean' && this.preview()[k])
      .map(k => k
        .toLowerCase()
        .replace('systemchannelflags', 'Nastavení sys. kanálu')
        .replace('name', 'Název')
        .replace('defaultmessagenotifications', 'Výchozí notifikace')
        .replace('description', 'Popis')
        .replace('features', 'Funkcionalita')
        .replace('afktimeout', 'AFK timeout')
        .replace('bannerid', 'Banner')
        .replace('iconid', 'Ikona')
        .replace('mfalevel', '2FA')
        .replace('nsfwlevel', 'NSFW')
        .replace('premiumtier', 'Boost level')
        .replace(/^splashid$/, 'Pozadí pozvánky')
        .replace('vanityurl', 'Univerzální pozvánka')
        .replace('verificationlevel', 'Úroveň ověření účtu')
        .replace('afkchannelid', 'AFK kanál')
        .replace('discoverysplashid', 'Komunitní pozadí')
        .replace('explicitcontentfilter', 'Filtr explicitního obsahu')
        .replace('ruleschannelid', 'Kanál s pravidly')
        .replace('systemchannelid', 'Systémový kanál')
        .replace('publicupdateschannelid', 'Kanál na novinky')
      );
  });
}
