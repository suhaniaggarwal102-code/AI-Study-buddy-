import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss'
})
export class Analytics {

  overallProgress = 72;
  studyHours = 18;
  quizAverage = 78;
  streak = 7;
  completedTasks = 12;

  subjects = [
    {
      name: 'Python',
      progress: 85,
      icon: '🐍'
    },
    {
      name: 'DBMS',
      progress: 70,
      icon: '🗄️'
    },
    {
      name: 'Computer Networks',
      progress: 60,
      icon: '🌐'
    },
    {
      name: 'Java',
      progress: 45,
      icon: '☕'
    }
  ];

  weeklyHours = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 3 },
    { day: 'Sat', hours: 3 },
    { day: 'Sun', hours: 2 }
  ];

  quizPerformance = [
    { subject: 'Python', score: 85 },
    { subject: 'DBMS', score: 78 },
    { subject: 'Java', score: 72 },
    { subject: 'CN', score: 65 }
  ];

  goals = [
    {
      title: 'Complete Python',
      progress: 85,
      target: '85%'
    },
    {
      title: 'Complete DBMS',
      progress: 70,
      target: '70%'
    },
    {
      title: '7 Day Study Streak',
      progress: 100,
      target: '7 Days'
    }
  ];

  getMaxHours(): number {
    return Math.max(...this.weeklyHours.map(item => item.hours));
  }
}