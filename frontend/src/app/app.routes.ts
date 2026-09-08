
import { Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { Notes } from './pages/notes/notes';
import { Chatbot } from './pages/chatbot/chatbot';
import { Quiz } from './pages/quiz/quiz';
import { AiPlannerComponent } from './pages/ai-planner/ai-planner';
import { Analytics } from './pages/analytics/analytics';

import { Profile } from './pages/profile/profile';

export const routes: Routes = [

  // Landing Page
  {
    path: '',
    component: LandingComponent
  },

  // Authentication
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  // Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  // AI Study Planner
  
  // Chatbot
  {
    path: 'chatbot',
    component: Chatbot
  },

  // Quiz
  {
    path: 'quiz',
    component: Quiz
  },
{
  path: 'ai-planner',
  component: AiPlannerComponent
},
  // Notes
  {
    path: 'notes',
    component: Notes
  },

  // Study Plan
  

  // Analytics / Progress
  {
    path: 'analytics',
    component: Analytics
  },

  // Profile
  {
    path: 'profile',
    component: Profile
  },

  // Unknown URL
  {
    path: '**',
    redirectTo: ''
  }

];
