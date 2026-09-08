import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

  profile = {
    name: 'Student',
    email: 'student@example.com',
    course: 'B.Tech Computer Science',
    semester: '6th Semester',
    college: 'My College',
    studyGoal: 'Prepare for semester exams',
    bio: 'Focused on improving my technical skills and academic performance.'
  };

  subjects = [
    'Python',
    'Java',
    'DBMS',
    'Computer Networks',
    'Data Structures'
  ];

  selectedSubjects: string[] = [
    'Python',
    'DBMS',
    'Computer Networks'
  ];

  stats = [
    {
      icon: '📚',
      value: '5',
      label: 'Subjects'
    },
    {
      icon: '📝',
      value: '24',
      label: 'Quizzes Completed'
    },
    {
      icon: '⏱️',
      value: '42h',
      label: 'Study Time'
    },
    {
      icon: '🔥',
      value: '7',
      label: 'Day Streak'
    }
  ];

  isEditing = false;

  constructor(private router: Router) {}

  goToDashboard(): void {
  this.router.navigate(['/dashboard']);
}

  toggleSubject(subject: string): void {
    if (this.selectedSubjects.includes(subject)) {
      this.selectedSubjects = this.selectedSubjects.filter(
        item => item !== subject
      );
    } else {
      this.selectedSubjects.push(subject);
    }
  }

  isSubjectSelected(subject: string): boolean {
    return this.selectedSubjects.includes(subject);
  }

  editProfile(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    this.isEditing = false;
    alert('Profile updated successfully!');
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}