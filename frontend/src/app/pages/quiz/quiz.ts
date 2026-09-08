import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../core/services/firestore';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class Quiz {

  // ==============================
  // QUIZ SETTINGS
  // ==============================

  subject = '';
  difficulty = '';
  questionCount = 5;

  // ==============================
  // QUIZ STATE
  // ==============================

  quizStarted = false;
  quizCompleted = false;

  currentQuestionIndex = 0;
  selectedAnswer = '';

  userAnswers: string[] = [];

  score = 0;

  isSaving = false;
  saveMessage = '';

  // ==============================
  // QUESTION BANK
  // ==============================

  questionBank: Record<string, QuizQuestion[]> = {

    Python: [
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        answer: 'def',
        difficulty: 'Easy'
      },
      {
        question: 'Which of the following is a Python data type?',
        options: ['int', 'integer', 'number', 'decimal'],
        answer: 'int',
        difficulty: 'Easy'
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/*', '--'],
        answer: '#',
        difficulty: 'Easy'
      },
      {
        question: 'Which function is used to display output in Python?',
        options: ['display()', 'print()', 'show()', 'output()'],
        answer: 'print()',
        difficulty: 'Easy'
      },
      {
        question: 'Which keyword is used for a loop in Python?',
        options: ['loop', 'repeat', 'for', 'iterate'],
        answer: 'for',
        difficulty: 'Easy'
      },
      {
        question: 'What does len() return?',
        options: [
          'Memory size',
          'Number of elements',
          'Data type',
          'Index'
        ],
        answer: 'Number of elements',
        difficulty: 'Medium'
      },
      {
        question: 'Which collection is mutable in Python?',
        options: ['Tuple', 'String', 'List', 'Integer'],
        answer: 'List',
        difficulty: 'Medium'
      },
      {
        question: 'What is the output type of input()?',
        options: ['int', 'float', 'string', 'boolean'],
        answer: 'string',
        difficulty: 'Medium'
      },
      {
        question: 'Which keyword is used to handle exceptions?',
        options: ['catch', 'error', 'try', 'handle'],
        answer: 'try',
        difficulty: 'Hard'
      },
      {
        question: 'Which concept allows the same function name to behave differently?',
        options: [
          'Encapsulation',
          'Polymorphism',
          'Inheritance',
          'Abstraction'
        ],
        answer: 'Polymorphism',
        difficulty: 'Hard'
      }
    ],

    DBMS: [
      {
        question: 'What does DBMS stand for?',
        options: [
          'Database Management System',
          'Data Backup Management System',
          'Database Machine System',
          'Data Management Software'
        ],
        answer: 'Database Management System',
        difficulty: 'Easy'
      },
      {
        question: 'Which language is used to query databases?',
        options: ['HTML', 'SQL', 'CSS', 'Python'],
        answer: 'SQL',
        difficulty: 'Easy'
      },
      {
        question: 'Which key uniquely identifies a record?',
        options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Super Key'],
        answer: 'Primary Key',
        difficulty: 'Easy'
      },
      {
        question: 'What does SQL stand for?',
        options: [
          'Structured Query Language',
          'Simple Query Language',
          'System Query Language',
          'Sequential Query Language'
        ],
        answer: 'Structured Query Language',
        difficulty: 'Easy'
      },
      {
        question: 'Which command is used to retrieve data?',
        options: ['GET', 'SELECT', 'FETCH', 'READ'],
        answer: 'SELECT',
        difficulty: 'Easy'
      },
      {
        question: 'Which normal form removes partial dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        answer: '2NF',
        difficulty: 'Medium'
      },
      {
        question: 'Which normal form removes transitive dependency?',
        options: ['1NF', '2NF', '3NF', '4NF'],
        answer: '3NF',
        difficulty: 'Medium'
      },
      {
        question: 'Which key connects two tables?',
        options: ['Primary Key', 'Foreign Key', 'Super Key', 'Unique Key'],
        answer: 'Foreign Key',
        difficulty: 'Medium'
      },
      {
        question: 'What is a transaction property?',
        options: ['ACID', 'CRUD', 'BASE', 'HTTP'],
        answer: 'ACID',
        difficulty: 'Hard'
      },
      {
        question: 'Which property ensures committed data is not lost?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        answer: 'Durability',
        difficulty: 'Hard'
      }
    ],

    Java: [
      {
        question: 'Which keyword is used to create a class in Java?',
        options: ['class', 'Class', 'define', 'object'],
        answer: 'class',
        difficulty: 'Easy'
      },
      {
        question: 'Which method is the entry point of Java?',
        options: ['start()', 'main()', 'run()', 'execute()'],
        answer: 'main()',
        difficulty: 'Easy'
      },
      {
        question: 'Which keyword creates an object?',
        options: ['create', 'object', 'new', 'instance'],
        answer: 'new',
        difficulty: 'Easy'
      },
      {
        question: 'Which concept hides implementation details?',
        options: [
          'Inheritance',
          'Abstraction',
          'Polymorphism',
          'Compilation'
        ],
        answer: 'Abstraction',
        difficulty: 'Easy'
      },
      {
        question: 'Which keyword is used for inheritance?',
        options: ['inherits', 'extends', 'implements', 'super'],
        answer: 'extends',
        difficulty: 'Easy'
      },
      {
        question: 'Which concept allows method overloading?',
        options: [
          'Compile-time polymorphism',
          'Runtime polymorphism',
          'Inheritance',
          'Encapsulation'
        ],
        answer: 'Compile-time polymorphism',
        difficulty: 'Medium'
      },
      {
        question: 'Which keyword refers to parent class?',
        options: ['parent', 'base', 'super', 'this'],
        answer: 'super',
        difficulty: 'Medium'
      },
      {
        question: 'Which keyword refers to current object?',
        options: ['current', 'self', 'this', 'object'],
        answer: 'this',
        difficulty: 'Medium'
      },
      {
        question: 'Which feature provides runtime polymorphism?',
        options: [
          'Method overloading',
          'Method overriding',
          'Constructor',
          'Encapsulation'
        ],
        answer: 'Method overriding',
        difficulty: 'Hard'
      },
      {
        question: 'Which collection does not allow duplicate elements?',
        options: ['List', 'Set', 'Array', 'Queue'],
        answer: 'Set',
        difficulty: 'Hard'
      }
    ],

    'Computer Networks': [
      {
        question: 'How many layers are in the OSI model?',
        options: ['5', '6', '7', '8'],
        answer: '7',
        difficulty: 'Easy'
      },
      {
        question: 'Which protocol is used for web browsing?',
        options: ['FTP', 'HTTP', 'SMTP', 'SSH'],
        answer: 'HTTP',
        difficulty: 'Easy'
      },
      {
        question: 'Which device connects different networks?',
        options: ['Switch', 'Router', 'Hub', 'Repeater'],
        answer: 'Router',
        difficulty: 'Easy'
      },
      {
        question: 'Which protocol is connection-oriented?',
        options: ['UDP', 'TCP', 'IP', 'ARP'],
        answer: 'TCP',
        difficulty: 'Easy'
      },
      {
        question: 'What does IP stand for?',
        options: [
          'Internet Protocol',
          'Internal Protocol',
          'Internet Process',
          'Information Protocol'
        ],
        answer: 'Internet Protocol',
        difficulty: 'Easy'
      },
      {
        question: 'Which layer is responsible for routing?',
        options: [
          'Transport',
          'Network',
          'Data Link',
          'Application'
        ],
        answer: 'Network',
        difficulty: 'Medium'
      },
      {
        question: 'Which protocol translates domain names to IP addresses?',
        options: ['HTTP', 'DNS', 'FTP', 'DHCP'],
        answer: 'DNS',
        difficulty: 'Medium'
      },
      {
        question: 'Which protocol automatically assigns IP addresses?',
        options: ['DNS', 'HTTP', 'DHCP', 'FTP'],
        answer: 'DHCP',
        difficulty: 'Medium'
      },
      {
        question: 'Which routing protocol is commonly used within an autonomous system?',
        options: ['BGP', 'OSPF', 'SMTP', 'HTTP'],
        answer: 'OSPF',
        difficulty: 'Hard'
      },
      {
        question: 'Which protocol is mainly used between autonomous systems?',
        options: ['RIP', 'OSPF', 'BGP', 'ARP'],
        answer: 'BGP',
        difficulty: 'Hard'
      }
    ],

    'Data Structures': [
      {
        question: 'Which data structure follows LIFO?',
        options: ['Queue', 'Stack', 'Array', 'Tree'],
        answer: 'Stack',
        difficulty: 'Easy'
      },
      {
        question: 'Which data structure follows FIFO?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        answer: 'Queue',
        difficulty: 'Easy'
      },
      {
        question: 'Which data structure uses nodes and links?',
        options: ['Array', 'Linked List', 'Stack', 'Hash'],
        answer: 'Linked List',
        difficulty: 'Easy'
      },
      {
        question: 'Which structure is used in BFS?',
        options: ['Stack', 'Queue', 'Tree', 'Heap'],
        answer: 'Queue',
        difficulty: 'Easy'
      },
      {
        question: 'Which structure is used in DFS?',
        options: ['Queue', 'Stack', 'Array', 'Hash'],
        answer: 'Stack',
        difficulty: 'Easy'
      },
      {
        question: 'Which data structure is hierarchical?',
        options: ['Array', 'Tree', 'Stack', 'Queue'],
        answer: 'Tree',
        difficulty: 'Medium'
      },
      {
        question: 'Which data structure stores key-value pairs?',
        options: ['Stack', 'Queue', 'Hash Table', 'Linked List'],
        answer: 'Hash Table',
        difficulty: 'Medium'
      },
      {
        question: 'What is the average search time in a hash table?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 'O(1)',
        difficulty: 'Medium'
      },
      {
        question: 'Which traversal uses Root-Left-Right?',
        options: ['Inorder', 'Preorder', 'Postorder', 'Level Order'],
        answer: 'Preorder',
        difficulty: 'Hard'
      },
      {
        question: 'Which traversal uses Left-Root-Right?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
        answer: 'Inorder',
        difficulty: 'Hard'
      }
    ]
  };

  questions: QuizQuestion[] = [];

  // ==============================
  // CONSTRUCTOR
  // ==============================

  constructor(
    private firestoreService: FirestoreService
  ) {}

  // ==============================
  // GENERATE QUIZ
  // ==============================

  generateQuiz(): void {

    if (!this.subject || !this.difficulty) {
      return;
    }

    const subjectQuestions = this.questionBank[this.subject] || [];

    let filteredQuestions = subjectQuestions.filter(
      question => question.difficulty === this.difficulty
    );

    // If selected difficulty has no questions,
    // use all questions from that subject.
    if (filteredQuestions.length === 0) {
      filteredQuestions = [...subjectQuestions];
    }

    this.questions = this.shuffleArray(filteredQuestions)
      .slice(0, Math.min(this.questionCount, filteredQuestions.length));

    if (this.questions.length === 0) {
      return;
    }

    this.currentQuestionIndex = 0;
    this.selectedAnswer = '';
    this.userAnswers = new Array(this.questions.length).fill('');
    this.score = 0;

    this.quizStarted = true;
    this.quizCompleted = false;

    this.isSaving = false;
    this.saveMessage = '';
  }

  // ==============================
  // CURRENT QUESTION
  // ==============================

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex] || {
      question: '',
      options: [],
      answer: '',
      difficulty: 'Easy'
    };
  }

  // ==============================
  // SELECT ANSWER
  // ==============================

  selectAnswer(answer: string): void {

    if (!this.quizStarted || !this.currentQuestion) {
      return;
    }

    this.selectedAnswer = answer;

    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  // ==============================
  // NEXT QUESTION
  // ==============================

  nextQuestion(): void {

    if (!this.selectedAnswer) {
      return;
    }

    this.userAnswers[this.currentQuestionIndex] =
      this.selectedAnswer;

    if (this.currentQuestionIndex < this.questions.length - 1) {

      this.currentQuestionIndex++;

      this.selectedAnswer =
        this.userAnswers[this.currentQuestionIndex] || '';

    } else {

      this.submitQuiz();
    }
  }

  // ==============================
  // PREVIOUS QUESTION
  // ==============================

  previousQuestion(): void {

    if (this.currentQuestionIndex <= 0) {
      return;
    }

    this.userAnswers[this.currentQuestionIndex] =
      this.selectedAnswer;

    this.currentQuestionIndex--;

    this.selectedAnswer =
      this.userAnswers[this.currentQuestionIndex] || '';
  }

  // ==============================
  // SUBMIT QUIZ
  // ==============================

  async submitQuiz(): Promise<void> {

    // Save last answer
    if (this.selectedAnswer) {
      this.userAnswers[this.currentQuestionIndex] =
        this.selectedAnswer;
    }

    // Calculate score
    this.score = 0;

    this.questions.forEach((question, index) => {

      if (this.userAnswers[index] === question.answer) {
        this.score++;
      }

    });

    // Show result
    this.quizStarted = false;
    this.quizCompleted = true;

    // Save to Firebase
    this.isSaving = true;
    this.saveMessage = 'Saving your result...';

    try {

      await this.firestoreService.saveQuizResult(
        this.subject,
        this.score,
        this.questions.length
      );

      this.saveMessage =
        '✅ Quiz result saved successfully!';

      console.log('Quiz result saved to Firebase!');

    } catch (error) {

      console.error('Firebase save error:', error);

      this.saveMessage =
        '⚠️ Quiz completed, but result could not be saved.';
    }

    this.isSaving = false;
  }

  // ==============================
  // PERCENTAGE
  // ==============================

  get percentage(): number {

    if (this.questions.length === 0) {
      return 0;
    }

    return Math.round(
      (this.score / this.questions.length) * 100
    );
  }

  // ==============================
  // PROGRESS
  // Used by quiz.html
  // ==============================

  get progress(): number {

    if (this.questions.length === 0) {
      return 0;
    }

    return Math.round(
      ((this.currentQuestionIndex + 1) /
        this.questions.length) * 100
    );
  }

  // ==============================
  // PERFORMANCE MESSAGE
  // Used by quiz.html
  // ==============================

  get performanceMessage(): string {

    if (this.percentage >= 90) {
      return 'Excellent! 🎉 Your performance is outstanding.';
    }

    if (this.percentage >= 75) {
      return 'Great job! 👏 Keep improving your knowledge.';
    }

    if (this.percentage >= 50) {
      return 'Good effort! 📚 A little more practice will help.';
    }

    return 'Keep practicing! 💪 Review the topics and try again.';
  }

  // ==============================
  // RESULT MESSAGE
  // ==============================

  get resultMessage(): string {

    if (this.percentage >= 90) {
      return 'Outstanding Performance! 🏆';
    }

    if (this.percentage >= 75) {
      return 'Excellent Work! 🎉';
    }

    if (this.percentage >= 50) {
      return 'Good Job! 👍';
    }

    return 'Keep Learning! 💪';
  }

  // ==============================
  // QUESTION NUMBER
  // ==============================

  get questionNumber(): number {
    return this.currentQuestionIndex + 1;
  }

  // ==============================
  // TOTAL QUESTIONS
  // ==============================

  get totalQuestions(): number {
    return this.questions.length;
  }

  // ==============================
  // PROGRESS PERCENTAGE
  // ==============================

  get progressPercentage(): number {

    if (this.questions.length === 0) {
      return 0;
    }

    return Math.round(
      ((this.currentQuestionIndex + 1) /
        this.questions.length) * 100
    );
  }

  // ==============================
  // CHECK ANSWER
  // ==============================

  isCorrectAnswer(
    option: string,
    index: number
  ): boolean {

    return option === this.questions[index]?.answer;
  }

  // ==============================
  // SCORE CLASS
  // ==============================

  get scoreClass(): string {

    if (this.percentage >= 75) {
      return 'good';
    }

    if (this.percentage >= 50) {
      return 'average';
    }

    return 'poor';
  }

  // ==============================
  // RESTART QUIZ
  // ==============================

  restartQuiz(): void {

    this.quizStarted = false;
    this.quizCompleted = false;

    this.currentQuestionIndex = 0;
    this.selectedAnswer = '';

    this.userAnswers = [];
    this.questions = [];

    this.score = 0;

    this.isSaving = false;
    this.saveMessage = '';
  }

  // ==============================
  // SHUFFLE QUESTIONS
  // ==============================

  private shuffleArray<T>(array: T[]): T[] {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }
}
