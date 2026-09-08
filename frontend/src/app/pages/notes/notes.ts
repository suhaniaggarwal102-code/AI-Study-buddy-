import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Note {
  id: number;
  title: string;
  subject: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-notes',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './notes.html',
  styleUrl: './notes.scss'
})
export class Notes {

  selectedFile: File | null = null;
  fileName = '';

  noteTitle = '';
  noteSubject = '';
  noteContent = '';

  showSummary = false;
  isSummarizing = false;

  summary = '';
  keyPoints: string[] = [];
  importantQuestions: string[] = [];

  searchText = '';

  notes: Note[] = [
    {
      id: 1,
      title: 'Python Functions',
      subject: 'Python',
      content: 'Functions are reusable blocks of code used to perform a particular task.',
      date: '06 Sep 2026'
    },
    {
      id: 2,
      title: 'DBMS Normalization',
      subject: 'DBMS',
      content: 'Normalization is the process of organizing data to reduce redundancy.',
      date: '05 Sep 2026'
    }
  ];

  onFileSelected(event: any) {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;

    if (!this.noteTitle) {
      this.noteTitle = file.name.replace(/\.[^/.]+$/, '');
    }
  }

  generateSummary() {

    if (!this.selectedFile && !this.noteContent.trim()) {
      alert('Please upload a PDF or enter notes first.');
      return;
    }

    this.isSummarizing = true;
    this.showSummary = false;

    setTimeout(() => {

      this.summary =
        'This study material contains important concepts that should be understood carefully. Focus on the main definitions, important concepts, examples and practical applications. Regular revision and practice questions can help improve understanding.';

      this.keyPoints = [
        'Understand the basic concepts first.',
        'Focus on important definitions and terminology.',
        'Practice examples after learning each concept.',
        'Revise important topics regularly.',
        'Solve previous questions for better preparation.'
      ];

      this.importantQuestions = [
        'What are the important concepts in this topic?',
        'Explain the main concepts with an example.',
        'What are the advantages and applications?',
        'What are the differences between important concepts?',
        'Write short notes on the major topics.'
      ];

      this.isSummarizing = false;
      this.showSummary = true;

    }, 1200);
  }

  saveNote() {

    if (!this.noteTitle || !this.noteSubject || !this.noteContent.trim()) {
      alert('Please enter title, subject and note content.');
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      title: this.noteTitle,
      subject: this.noteSubject,
      content: this.noteContent,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    this.notes.unshift(newNote);

    alert('Note saved successfully!');

    this.noteTitle = '';
    this.noteSubject = '';
    this.noteContent = '';
  }

  deleteNote(id: number) {

    this.notes = this.notes.filter(note => note.id !== id);

  }

  get filteredNotes(): Note[] {

    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.notes;
    }

    return this.notes.filter(note =>
      note.title.toLowerCase().includes(search) ||
      note.subject.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search)
    );
  }

  clearSummary() {

    this.showSummary = false;
    this.summary = '';
    this.keyPoints = [];
    this.importantQuestions = [];
  }
}