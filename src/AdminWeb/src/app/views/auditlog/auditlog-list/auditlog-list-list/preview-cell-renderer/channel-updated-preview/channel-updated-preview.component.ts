import { Component, computed, input } from "@angular/core";

@Component({
  selector: 'app-channel-updated-preview',
  templateUrl: './channel-updated-preview.component.html',
  standalone: true,
  imports: []
})
export class ChannelUpdatedPreviewComponent {
  preview = input.required<any>();

  isSomeChanged = computed(() => {
    return Object.keys(this.preview())
      .filter(o => typeof this.preview()[o] === 'boolean')
      .some(k => this.preview()[k]);
  });

  changedItems = computed(() => {
    return Object.keys(this.preview())
      .filter(k => typeof this.preview()[k] === 'boolean' && this.preview()[k])
      .map(k => k
        .toLowerCase()
        .replace('position', 'Pozice')
        .replace('slowmode', 'Slowmode')
        .replace('bitrate', 'Bitrate')
        .replace('name', 'Název')
        .replace('isnsfw', 'NSFW')
        .replace('flags', 'Příznaky')
        .replace('topic', 'Téma')
      );
  });
}
