
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

  studentName = 'Student';

  stats = [
    {
      icon: '📚',
      value: '5',
      label: 'Subjects'
    },
    {
      icon: '⏱️',
      value: '12h',
      label: 'Study Time'
    },
    {
      icon: '📝',
      value: '85%',
      label: 'Quiz Score'
    },
    {
      icon: '🔥',
      value: '7',
      label: 'Day Streak'
    }
  ];

  subjects = [
    {
      name: 'Python',
      progress: 75
    },
    {
      name: 'Java',
      progress: 60
    },
    {
      name: 'DBMS',
      progress: 80
    },
    {
      name: 'Computer Networks',
      progress: 55
    }
  ];

  studyTasks = [
    {
      subject: 'DBMS',
      task: 'Database Normalization',
      time: '60 min',
      completed: false
    },
    {
      subject: 'Java',
      task: 'Object-Oriented Programming',
      time: '45 min',
      completed: false
    },
    {
      subject: 'AI Quiz',
      task: 'Test Your Knowledge',
      time: '15 min',
      completed: false
    }
  ];

  toggleTask(task: any): void {
    task.completed = !task.completed;
  }
}

