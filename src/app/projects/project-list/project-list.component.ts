import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  standalone: false
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects$!: Observable<Project[]>;
  activeProjects$!: Observable<Project[]>; 
  private destroy$ = new Subject<void>();

  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    // Start polling every 5s
    this.projects$ = this.service.startPolling(5000);

    // Alternatively, to update the BehaviorSubject on each poll:
    this.service.startPolling(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => console.log('Polled Projects', list));
  }

  delete(id: number): void {
    this.service.deleteProject(id).subscribe();
  }

  ngOnDestroy():void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
