import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss'
})
export class Chatbot {

  userMessage = '';
  isTyping = false;

  messages: ChatMessage[] = [
    {
      sender: 'bot',
      text: 'Hi! 👋 I am your AI Study Buddy. How can I help you today?'
    }
  ];

  constructor(private http: HttpClient) {}

  sendMessage() {

    const message = this.userMessage.trim();

    if (!message || this.isTyping) {
      return;
    }

    this.messages.push({
      sender: 'user',
      text: message
    });

    this.userMessage = '';
    this.isTyping = true;

    this.http.post<any>(
      'http://localhost:3000/api/chat',
      {
        message: message
      }
    ).subscribe({

      next: (response) => {

        this.messages.push({
          sender: 'bot',
          text: response.reply
        });

        this.isTyping = false;
      },

      error: (error) => {

        console.error(error);

        this.messages.push({
          sender: 'bot',
          text: 'Sorry 😔 AI service se response nahi aa raha. Please try again.'
        });

        this.isTyping = false;
      }

    });
  }

  askSuggestion(question: string) {
    this.userMessage = question;
    this.sendMessage();
  }

  clearChat() {
    this.messages = [
      {
        sender: 'bot',
        text: 'Hi! 👋 I am your AI Study Buddy. How can I help you today?'
      }
    ];
  }
}