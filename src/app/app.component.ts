import { Component, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { DelegateService } from './services/delegate.service';
import { VotersService } from './services/voters.service';
import { NodeService } from './services/node.service';
import { SocialService } from './services/social.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [
    DelegateService,
    VotersService,
    NodeService,
    SocialService
  ]
})
export class AppComponent implements AfterViewChecked {
  private timer: any = null;

  constructor(
    public router: Router,
    private delegateService: DelegateService,
    private votersService: VotersService,
    private nodeService: NodeService,
    private socialService: SocialService
  ) {
    delegateService.start();
    votersService.start();
    nodeService.start();
    socialService.start();
  }

  ngAfterViewChecked() {}
}
