// src/app/projects/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Project } from './project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'api/projects';

  constructor(private http: HttpClient) { }

  // Initialize with some default projects
  private projectsSubject = new BehaviorSubject<Project[]>([
    { id: 1, name: 'Alpha', description: 'First project', status: 'active' },
    { id: 2, name: 'Beta', description: 'Second project', status: 'pending' }
  ]);

  // Expose the stream
  projects$ = this.projectsSubject.asObservable();

  // Polls every intervalMs milliseconds
  startPolling(intervalMs: number = 5000): Observable<Project[]> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getProjects())
    );
  }

  // Simulated HTTP fetch (could be replaced with HttpClient.get)
  private fetchFromServer(): Observable<Project[]> {
    // For demo, just re-emit current BehaviorSubject
    return this.projects$;
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
  /** GET all projects */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  /** GET active projects only */
  getActiveProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map(list => list.filter(p => p.status === 'active'))
    );
  }

  /** ADD a new project */
  addProject(proj: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, proj);
  }

  /** UPDATE an existing project */
  updateProject(proj: Project): Observable<any> {
    return this.http.put(`${this.apiUrl}/${proj.id}`, proj);
  }

  /** DELETE a project */
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** Helper to generate next ID */
  private nextId(list: Project[]): number {
    return list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 1;
  }
}
