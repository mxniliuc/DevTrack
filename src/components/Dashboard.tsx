import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  FolderKanban,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WelcomeModal } from "./WelcomeModal";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";

export function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const navigate = useNavigate();

  async function fetchDashboardData() {
    try {
      const [projRes, taskRes] = await Promise.all([
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/tasks`),
      ]);
      const [projData, taskData] = await Promise.all([
        projRes.json(),
        taskRes.json(),
      ]);
      setProjects(Array.isArray(projData) ? projData : []);
      setTasks(Array.isArray(taskData) ? taskData : []);
    } catch (err) {
      console.error("Error loading dashboard data", err);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await fetch(`${API_BASE}/activity`);
        const data = await res.json();

        const activityWithNames = data.map((a: any) => {
          let detail = a.detail || "";

          projects.forEach((p) => {
            if (detail.includes(p.id)) {
              detail = detail.replaceAll(p.id, p.name);
            }
          });

          tasks.forEach((t) => {
            if (detail.includes(t.id)) {
              const project = projects.find((p) => p.id === t.projectId);
              const projectName = project ? project.name : "Unknown Project";
              detail = detail.replaceAll(
                t.id,
                `${t.title || "Untitled Task"} (${projectName})`
              );
            }
          });

          const project = projects.find((p) => p.id === a.projectId);
          const projectName = project ? project.name : "Unknown Project";

          return {
            ...a,
            detail,
            projectName,
          };
        });

        setRecentActivity(activityWithNames.slice(0, 6));
      } catch (err) {
        console.error("Failed to load activity feed", err);
      }
    }

    loadActivity();
    const activityInterval = setInterval(loadActivity, 15000);
    return () => clearInterval(activityInterval);
  }, [projects, tasks]); 

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("devtrack-welcome-seen");
    if (!hasSeenWelcome) setShowWelcome(true);
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("devtrack-welcome-seen", "true");
  };

  const computeDynamicStatus = (project: any) => {
    const progress = project.progress || 0;
    if (progress === 0) return "Planning";
    if (progress < 100) return "In Progress";
    return "Completed";
  };

  const totalProjects = projects.length;
  const tasksCompleted = tasks.filter((t) => t.completed).length;
  const tasksInProgress = tasks.filter((t) => !t.completed).length;
  const averageCompletion =
    totalProjects > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + (p.progress || 0), 0) / totalProjects
        )
      : 0;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
      color: "#2563EB",
    },
    {
      title: "Tasks Completed",
      value: tasksCompleted,
      icon: CheckCircle2,
      color: "#10B981",
    },
    {
      title: "Tasks In Progress",
      value: tasksInProgress,
      icon: Clock,
      color: "#F59E0B",
    },
    {
      title: "Average Completion",
      value: `${averageCompletion}%`,
      icon: TrendingUp,
      color: "#2563EB",
    },
  ];

  const chartData = projects.map((p) => {
    const projectTasks = tasks.filter((t) => t.projectId === p.id);
    return {
      name: p.name || "Unnamed Project",
      tasks: projectTasks.length,
      completed: projectTasks.filter((t) => t.completed).length,
    };
  });

  return (
    <div className="p-4 md:p-8">
      <WelcomeModal open={showWelcome} onClose={handleCloseWelcome} />
      <h1 className="mb-6 md:mb-8 text-[#0F172A]">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-[#64748B] mb-1">{stat.title}</p>
              <p className="text-[#0F172A]">{stat.value}</p>
            </div>
          );
        })}
      </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
  <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
    <h2 className="mb-4 text-[#0F172A]">Tasks Overview</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
        <YAxis stroke="#64748B" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="tasks" fill="#2563EB" radius={[8, 8, 0, 0]} />
        <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <Activity className="w-5 h-5 text-[#2563EB]" />
      <h2 className="text-[#0F172A]">Recent Activity</h2>
    </div>

    <div className="space-y-4">
      {recentActivity.map((a, i) => {
        const project = projects.find((p) => p.id === a.projectId);
        const status = project ? computeDynamicStatus(project) : null;
        const actor =
          a.user?.fullName ||
          a.user?.username ||
          (a.username ? a.username : "Unknown user");

        return (
          <div
            key={i}
            className="flex gap-3 pb-4 border-b border-[#E2E8F0] last:border-0 last:pb-0"
          >
            <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[#0F172A]">
                {a.action}{" "}
                <span className="text-[#64748B]">by {actor}</span>
              </p>
              <p className="text-[#64748B] truncate">
                {a.detail || (project ? project.name : "N/A")}
              </p>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                {status && (
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      status === "Completed"
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : status === "In Progress"
                        ? "bg-[#2563EB]/10 text-[#2563EB]"
                        : "bg-[#F59E0B]/10 text-[#F59E0B]"
                    }`}
                  >
                    {status}
                  </span>
                )}
                <span className="text-[#94A3B8] text-xs">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
        <h2 className="mb-4 text-[#0F172A]">Recent Projects</h2>
        <div className="space-y-4">
          {projects
            .slice(-3)
            .reverse()
            .map((project) => {
              const dynamicStatus = computeDynamicStatus(project);
              return (
                <button
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-[#E2E8F0] hover:border-[#2563EB] transition-all gap-4 hover:shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-[#0F172A] font-medium">
                      {project.name}
                    </h3>
                    <p className="text-[#64748B] line-clamp-2">
                      {project.description || "No description"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        dynamicStatus === "Completed"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : dynamicStatus === "In Progress"
                          ? "bg-[#2563EB]/10 text-[#2563EB]"
                          : "bg-[#F59E0B]/10 text-[#F59E0B]"
                      }`}
                    >
                      {dynamicStatus}
                    </span>
                    {project.priority && (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs ${
                          project.priority === "High"
                            ? "bg-[#EF4444]/10 text-[#EF4444]"
                            : project.priority === "Medium"
                            ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                            : "bg-[#10B981]/10 text-[#10B981]"
                        }`}
                      >
                        {project.priority}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}