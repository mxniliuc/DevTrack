export const projects = [
  {
  id: 1,
  name: "Website Redesign",
  description: "Complete overhaul of the landing page and dashboard UI.",
  progress: 70,
  dueDate: "2025-11-15",
  status: "In Progress",
  lastUpdated: "2025-10-25",
  priority: "High",
  category: "Design",
  attachments: [
    {
      id: "att1",
      name: "UI Mockups.pdf",
      url: "https://example.com/mockups.pdf",
      uploadedAt: "2025-10-20"
    },
    {
      id: "att2",
      name: "Logo.png",
      url: "https://example.com/logo.png",
      uploadedAt: "2025-10-22"
    }
  ],
  },
  {
    id: 2,
    name: "API Integration",
    description: "Integrate backend APIs with the new frontend.",
    progress: 40,
    dueDate: "2025-11-10T00:00:00Z",
    tasks: [
      { id: "1", title: "Set up Stripe account", completed: true, dueDate: "2025-10-20", priority: "Medium" },
      { id: "2", title: "Connect endpoints", completed: false, dueDate: "2025-11-05", priority: "High" },
    ],
    status: "In Progress",
    lastUpdated: "2025-10-25T12:00:00Z",
  },
  {
    id: 3,
    name: "Database Migration",
    description: "Migrate legacy database to PostgreSQL.",
    progress: 100,
    dueDate: "2025-10-30T00:00:00Z",
    tasks: [
      { id: "1", title: "Export old data", completed: true, dueDate: "2025-10-15", priority: "Low" },
      { id: "2", title: "Run migration scripts", completed: true, dueDate: "2025-10-18", priority: "Medium" },
      { id: "3", title: "Verify schema", completed: true, dueDate: "2025-10-20", priority: "High" },
    ],
    status: "Completed",
    lastUpdated: "2025-10-23T15:00:00Z",
  },
];