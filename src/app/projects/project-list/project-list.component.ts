import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
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

  private destroy$ = new Subject<void>();

  constructor(private service: ProjectService, private zone: NgZone) { }

  ngOnInit(): void {
    // Start polling every 5s
   this.loadList();
    window.addEventListener('storage', this.onStorageEvent);
  }

  private loadList(): void {
    this.projects$ = this.service.getProjects();
  }

  private onStorageEvent = (event: StorageEvent) => {
    if (event.key === 'projects-updated') {
      this.zone.run(() => this.loadList());
    }
  };

  delete(id: number): void {
    this.service.deleteProject(id).subscribe(() => {
      localStorage.setItem('projects-updated', Date.now().toString());
      // optional immediate reload
      this.loadList();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.onStorageEvent);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
