import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { BrandDTO } from '../../dtos/brand.dto';

@Component({
  selector: 'app-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.scss'],
})
export class BrandsPageComponent implements OnInit {
  public brands: BrandDTO[];

  constructor(private brandService: BrandService) {}
  ngOnInit(): void {
    this.brandService.loadBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }
}
