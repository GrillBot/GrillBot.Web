import { NgClass } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { ToastBodyComponent, ToastCloseDirective, ToastComponent, ToastHeaderComponent } from "@coreui/angular";

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.scss',
  providers: [
    {
      provide: ToastComponent,
      useExisting: forwardRef(() => NotificationToastComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [
    ToastHeaderComponent,
    ToastBodyComponent,
    ToastCloseDirective,
    NgClass
  ]
})
export class NotificationToastComponent extends ToastComponent {
  @Input() notification!: { message: string, isError: boolean };
}
