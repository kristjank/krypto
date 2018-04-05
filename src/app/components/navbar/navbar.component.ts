import { Component, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements AfterViewChecked {
  public delegate: any = null;
  constructor(
    public router: Router,
    delegateService: DelegateService
  ) {
    delegateService.$delegate.subscribe(delegate => this.delegate = delegate);
  }

  ngAfterViewChecked() {}
}
