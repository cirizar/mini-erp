// src/app/projects/project-form/project-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';   // ← import FormBuilder
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: false
})
export class ProjectFormComponent implements OnInit {
  form!: FormGroup;   // ← only declare here
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 1) Initialize the form now that fb is ready
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });

    // 2) If editing, load existing project data
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.service.getProject(this.id).subscribe(proj => {
        if (proj) {
          this.form.patchValue(proj);
        }
      });
    }
  }

  onSubmit(): void {
    const project: Project = { id: this.id ?? 0, ...this.form.value };
    if (this.id) {
      this.service.updateProject(project);
    } else {
      this.service.addProject(project);
    }
    this.router.navigate(['/projects']);
  }
}
