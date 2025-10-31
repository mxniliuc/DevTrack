import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Calendar, ListTodo, MessageSquare } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  projectId: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  category?: string;
  progress: number;
  lastUpdated: string;
};

type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

const API_BASE = "http://localhost:8080/api";

export function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectRes, tasksRes, commentsRes] = await Promise.all([
          fetch(`${API_BASE}/projects/${id}`),
          fetch(`${API_BASE}/tasks?projectId=${id}`),
          fetch(`${API_BASE}/comments?projectId=${id}`),
        ]);

        const projectData = await projectRes.json();
        const tasksData = await tasksRes.json();
        const commentsData = await commentsRes.json();

        setProject(projectData);
        setTasks(tasksData);
        setComments(commentsData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load project data");
      }
    }
    loadData();
  }, [id]);

  useEffect(() => {
    if (!project || tasks.length === 0) return;
    const completed = tasks.filter((t: Task) => t.completed).length;
    const newProgress = Math.round((completed / tasks.length) * 100);

    if (newProgress !== project.progress) {
      fetch(`${API_BASE}/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, progress: newProgress }),
      })
        .then((r) => r.json())
        .then(setProject)
        .catch(console.error);
    }
  }, [tasks]);

  async function handleAddTask() {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          description: "",
          completed: false,
          projectId: id,
        }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
      toast.success("Task added");
    } catch {
      toast.error("Failed to add task");
    }
  }

  async function handleToggleTask(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    try {
      const updated = { ...task, completed: !task.completed };
      await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updated : t))
      );
    } catch {
      toast.error("Failed to update task");
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      await fetch(`${API_BASE}/tasks/${taskId}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setDeleteDialogOpen(false);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  }

  async function handleAddComment() {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: id,
          author: "You",
          content: newComment,
        }),
      });
      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setNewComment("");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      await fetch(`${API_BASE}/comments/${commentId}`, { method: "DELETE" });
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  }

  if (!project)
    return (
      <div className="p-8">
        <h1 className="text-gray-700">Loading project...</h1>
      </div>
    );

  const completedTasks = tasks.filter((t: Task) => t.completed).length;
  const completionPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const dueDate = new Date(project.dueDate);
  const daysRemaining = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 md:p-8">
      <Link to="/projects">
        <Button
          variant="ghost"
          className="mb-6 text-[#2563EB] hover:bg-[#2563EB]/5 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </Link>

      <div className="mb-6">
        <h1 className="mb-2 text-[#0F172A]">{project.name}</h1>
        <p className="text-[#64748B] mb-4">{project.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-[#64748B]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              Due:{" "}
              {dueDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <span className={daysRemaining < 0 ? "text-[#EF4444]" : ""}>
            {daysRemaining < 0
              ? `${Math.abs(daysRemaining)} days overdue`
              : `${daysRemaining} days remaining`}
          </span>
          <span
    className={`inline-block px-3 py-1 text-sm rounded-full ${
      project.priority === "High"
        ? "bg-[#EF4444]/10 text-[#EF4444]"
        : project.priority === "Medium"
        ? "bg-[#F59E0B]/10 text-[#F59E0B]"
        : "bg-[#10B981]/10 text-[#10B981]"
    }`}
  ></span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mt-6">
        {tasks.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-b border-[#E2E8F0]">
            <div className="flex justify-between mb-3">
              <h2 className="text-[#0F172A]">Tasks</h2>
              <span className="text-[#64748B]">
                {completedTasks} of {tasks.length} completed (
                {completionPercentage}%)
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        )}

        {tasks.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            description="This project has no tasks. Add your first task to get started."
            actionLabel="Add First Task"
            onAction={() => document.getElementById("task-input")?.focus()}
          />
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {tasks.map((task: Task) => (
              <div
                key={task.id}
                className="px-4 md:px-6 py-4 flex flex-wrap items-center justify-between hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleTask(task.id)}
                    className="border-[#E2E8F0]"
                  />
                  <span
                    className={`text-[#0F172A] ${
                      task.completed ? "line-through text-[#64748B]" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTaskToDelete(task.id);
                    setDeleteDialogOpen(true);
                  }}
                  className="text-[#EF4444] hover:bg-[#EF4444]/5"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="px-4 md:px-6 py-6 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <h3 className="mb-4 text-[#0F172A]">Add New Task</h3>
          <div className="flex flex-wrap gap-3">
            <Input
              id="task-input"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 border-[#E2E8F0]"
            />
            <Button
              onClick={handleAddTask}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* === COMMENTS SECTION === */}
      <div className="mt-8 bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#2563EB]" />
          <h2 className="text-[#0F172A]">Comments</h2>
        </div>

        {comments.length === 0 ? (
          <div className="p-6 text-center text-[#64748B]">
            No comments yet. Start the discussion below!
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {comments.map((c) => (
              <div
                key={c.id}
                className="px-4 md:px-6 py-3 flex items-start justify-between hover:bg-[#F8FAFC]"
              >
                <div>
                  <div className="font-medium text-[#0F172A]">
                    {c.author}
                  </div>
                  <div className="text-[#64748B]">{c.content}</div>
                  <div className="text-xs text-[#94A3B8] mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteComment(c.id)}
                  className="text-[#EF4444] hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-[#E2E8F0] flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button
            onClick={handleAddComment}
            className="bg-[#2563EB] text-white"
          >
            Send
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => taskToDelete && handleDeleteTask(taskToDelete)}
              className="bg-[#EF4444] hover:bg-[#DC2626]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}