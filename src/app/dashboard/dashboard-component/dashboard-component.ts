import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../../projects/project.service';
import { Project } from '../../projects/project.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard-dashboard',
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  total$!: Observable<number>;
  active$!: Observable<number>;

  constructor(private service: ProjectService) {}

  ngOnInit(): void {
    this.total$ = this.service.getProjects().pipe(
      map(list => list.length)
    );
    this.active$ = this.service.getActiveProjects().pipe(
      map(list => list.length)
    );
  }
}