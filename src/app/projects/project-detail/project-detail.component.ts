import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  standalone: false
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project$ = this.service.projects$.pipe(
      map(list => list.find(p => p.id === id)!)
    );
  }

  edit(id: number): void {
    this.router.navigate(['projects/edit', id]);
  }
}
