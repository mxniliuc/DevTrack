export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progress: number;
  dueDate: string;
  tasks: Task[];
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    status: 'In Progress',
    progress: 65,
    dueDate: '2025-11-15',
    tasks: [
      {
        id: '1',
        title: 'Create wireframes',
        completed: true,
        dueDate: '2025-10-30',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Design homepage mockup',
        completed: true,
        dueDate: '2025-11-02',
        priority: 'High'
      },
      {
        id: '3',
        title: 'Develop responsive layout',
        completed: false,
        dueDate: '2025-11-08',
        priority: 'Medium'
      },
      {
        id: '4',
        title: 'Implement contact form',
        completed: false,
        dueDate: '2025-11-12',
        priority: 'Low'
      },
      {
        id: '5',
        title: 'Test cross-browser compatibility',
        completed: false,
        dueDate: '2025-11-15',
        priority: 'Medium'
      }
    ]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build native iOS and Android applications for customer engagement',
    status: 'In Progress',
    progress: 40,
    dueDate: '2025-12-20',
    tasks: [
      {
        id: '1',
        title: 'Set up development environment',
        completed: true,
        dueDate: '2025-10-25',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Design app navigation',
        completed: false,
        dueDate: '2025-11-05',
        priority: 'High'
      },
      {
        id: '3',
        title: 'Implement authentication',
        completed: false,
        dueDate: '2025-11-15',
        priority: 'High'
      },
      {
        id: '4',
        title: 'Build user profile screen',
        completed: false,
        dueDate: '2025-11-25',
        priority: 'Medium'
      }
    ]
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party payment and analytics APIs',
    status: 'Planning',
    progress: 15,
    dueDate: '2025-11-30',
    tasks: [
      {
        id: '1',
        title: 'Research payment providers',
        completed: true,
        dueDate: '2025-10-28',
        priority: 'Medium'
      },
      {
        id: '2',
        title: 'Set up Stripe account',
        completed: false,
        dueDate: '2025-11-01',
        priority: 'High'
      },
      {
        id: '3',
        title: 'Implement payment flow',
        completed: false,
        dueDate: '2025-11-15',
        priority: 'High'
      }
    ]
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate legacy database to new cloud infrastructure',
    status: 'Completed',
    progress: 100,
    dueDate: '2025-10-20',
    tasks: [
      {
        id: '1',
        title: 'Backup existing data',
        completed: true,
        dueDate: '2025-10-10',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Set up new database',
        completed: true,
        dueDate: '2025-10-15',
        priority: 'High'
      },
      {
        id: '3',
        title: 'Run migration scripts',
        completed: true,
        dueDate: '2025-10-18',
        priority: 'High'
      },
      {
        id: '4',
        title: 'Verify data integrity',
        completed: true,
        dueDate: '2025-10-20',
        priority: 'High'
      }
    ]
  },
  {
    id: '5',
    name: 'Marketing Campaign',
    description: 'Launch Q4 marketing campaign across social media platforms',
    status: 'Planning',
    progress: 25,
    dueDate: '2025-12-01',
    tasks: [
      {
        id: '1',
        title: 'Define target audience',
        completed: true,
        dueDate: '2025-10-27',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Create content calendar',
        completed: false,
        dueDate: '2025-11-05',
        priority: 'Medium'
      },
      {
        id: '3',
        title: 'Design social media assets',
        completed: false,
        dueDate: '2025-11-10',
        priority: 'Medium'
      }
    ]
  }
];
