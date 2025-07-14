// src/app/core/in-memory-data.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from '../projects/project.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects: Project[] = [
      { id: 1, name: 'Alpha', description: 'First project', status: 'active' },
      { id: 2, name: 'Beta',  description: 'Second project', status: 'pending' }
    ];
    return { projects };
  }

  // Optional: auto-generate incremental IDs
  genId(projects: Project[]): number {
    return projects.length > 0
      ? Math.max(...projects.map(p => p.id)) + 1
      : 1;
  }
}
