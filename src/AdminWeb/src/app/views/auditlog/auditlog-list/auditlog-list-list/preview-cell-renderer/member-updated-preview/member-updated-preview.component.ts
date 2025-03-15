import { Component, computed, input } from "@angular/core";
import { UserLookupPipe } from "../../../../../../components";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-member-updated-preview',
  templateUrl: './member-updated-preview.component.html',
  standalone: true,
  imports: [
    UserLookupPipe,
    AsyncPipe
  ]
})
export class MemberUpdatedPreviewComponent {
  preview = input.required<any>();

  isSomeChanged = computed(() => {
    return Object.keys(this.preview())
      .filter(k => typeof this.preview()[k] === 'boolean')
      .some(k => this.preview()[k]);
  });

  changedItems = computed(() => {
    return Object.keys(this.preview())
      .filter(k => typeof this.preview()[k] === 'boolean' && this.preview()[k])
      .map(k => k
        .toLowerCase()
        .replace('nicknamechanged', 'Přezdívka')
        .replace('flagschanged', 'Příznaky')
        .replace('voicemutechanged', 'Umlčení')
        .replace('selfunverifyminimaltimechange', 'SelfUnverify min. čas')
        .replace('pointsdeactivatedchanged', 'Deaktivace bodů')
      );
  })
}
