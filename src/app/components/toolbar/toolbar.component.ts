import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  readonly tick: Observable<Date>;

  constructor(
    private sidenavService: SidenavService
  ) {
    this.tick = this.getCurrentTime();
  }

  ngOnInit(): void {
  }

  getCurrentTime(): Observable<Date> {
    return new Observable<Date>(observer => {
      observer.next(new Date());

      const interval = setInterval(() => {
        observer.next(new Date());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    });
  }

  toggleSideNav(): void {
    this.sidenavService.opened = !this.sidenavService.opened;
  }

}
