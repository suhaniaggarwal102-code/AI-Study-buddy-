
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ai-planner',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ai-planner.html',
  styleUrl: './ai-planner.scss'
})
export class AiPlannerComponent {

  subject = '';
  examDate = '';
  studyHours = 2;
  level = 'Intermediate';

  planGenerated = false;

  studyPlan = [
    {
      day: 'Day 1',
      topic: 'Introduction & Fundamentals',
      duration: '60 minutes',
      completed: false
    },
    {
      day: 'Day 2',
      topic: 'Important Concepts',
      duration: '90 minutes',
      completed: false
    },
    {
      day: 'Day 3',
      topic: 'Practice Questions',
      duration: '60 minutes',
      completed: false
    },
    {
      day: 'Day 4',
      topic: 'Revision & Mock Test',
      duration: '90 minutes',
      completed: false
    }
  ];

  generatePlan(): void {
    if (!this.subject || !this.examDate) {
      alert('Please select a subject and exam date.');
      return;
    }

    this.planGenerated = true;

    this.studyPlan = [
      {
        day: 'Day 1',
        topic: `${this.subject} Fundamentals`,
        duration: `${this.studyHours} hours`,
        completed: false
      },
      {
        day: 'Day 2',
        topic: `${this.subject} Important Concepts`,
        duration: `${this.studyHours} hours`,
        completed: false
      },
      {
        day: 'Day 3',
        topic: `${this.subject} Practice Questions`,
        duration: `${this.studyHours} hours`,
        completed: false
      },
      {
        day: 'Day 4',
        topic: `${this.subject} Revision & Mock Test`,
        duration: `${this.studyHours} hours`,
        completed: false
      }
    ];
  }

  toggleTask(task: any): void {
    task.completed = !task.completed;
  }

  resetPlan(): void {
    this.planGenerated = false;
    this.subject = '';
    this.examDate = '';
    this.studyHours = 2;
    this.level = 'Intermediate';
  }
}