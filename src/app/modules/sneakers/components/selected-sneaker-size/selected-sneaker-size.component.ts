import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SneakerSizeDTO } from './../../dtos/sneaker-size.dto';

@Component({
  selector: 'app-selected-sneaker-size',
  templateUrl: './selected-sneaker-size.component.html',
  styleUrls: ['./selected-sneaker-size.component.scss'],
})
export class SelectedSneakerSizeComponent {
  @Input() sneakerSizes: SneakerSizeDTO[] | undefined;
  @Input() selectedSize: number | undefined;
  @Output() selectSize: EventEmitter<number> = new EventEmitter();
}
