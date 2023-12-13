import { Component, Input } from '@angular/core';

interface IimageConfig {
  width: string;
  height: string;
}

@Component({
  selector: 'app-loading-center',
  templateUrl: './loading-center.component.html',
  styleUrls: ['./loading-center.component.scss'],
})
export class LoadingCenterComponent {
  @Input() IimageConfig: IimageConfig = { width: 'auto', height: 'auto' };
}
