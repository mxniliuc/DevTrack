import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const API_BASE = "http://localhost:8080/api";

export function ProjectsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProjectName, setNewProjectName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        const data = await res.json();
        setProjects(data);
        if (id) {
          const match = data.find((p: any) => p.id === id);
          if (match) setSelectedProject(match);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    loadProjects();
  }, [id]);

  const computeDynamicStatus = (project: any) => {
    const progress = project.progress || 0;
    if (progress === 0) return "Planning";
    if (progress < 100) return "In Progress";
    return "Completed";
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    const newProject = {
      name: newProjectName,
      description: newDescription || "Newly created project.",
      priority: newPriority,
      progress: 0,
      dueDate: newDueDate ? new Date(newDueDate).toISOString() : new Date().toISOString(),
      status: "Planning",
      lastUpdated: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      const saved = await res.json();
      setProjects([...projects, saved]);
      setIsModalOpen(false);
      setNewProjectName("");
      setNewDescription("");
      setNewPriority("Medium");
      setNewDueDate("");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}`);
  };

  let filteredProjects = [...projects];
  if (searchQuery)
    filteredProjects = filteredProjects.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  if (statusFilter !== "All")
    filteredProjects = filteredProjects.filter(
      (p) => computeDynamicStatus(p) === statusFilter
    );
  if (sortBy === "name")
    filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "dueDate")
    filteredProjects.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  else if (sortBy === "progress")
    filteredProjects.sort((a, b) => b.progress - a.progress);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      case "In Progress":
        return "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20";
      case "Planning":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 md:p-8 transition-all duration-300 w-full max-[1000px]:pl-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-[#0F172A] text-lg md:text-xl font-semibold">Projects</h1>
        <Button
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#E2E8F0] rounded-lg"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px] bg-white border-[#E2E8F0] rounded-lg">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[140px] bg-white border-[#E2E8F0] rounded-lg">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden min-[900px]:block w-full overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
        <table className="w-full border-collapse min-w-[700px]">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="text-left px-6 py-4 text-[#64748B] font-medium">Project Name</th>
              <th className="text-left px-6 py-4 text-[#64748B] font-medium">Status</th>
              <th className="text-left px-6 py-4 text-[#64748B] font-medium">Progress</th>
              <th className="text-left px-6 py-4 text-[#64748B] font-medium">Due Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => {
              const dynamicStatus = computeDynamicStatus(project);
              return (
                <tr
                  key={project.id}
                  className={`border-b border-[#E2E8F0] hover:bg-[#F8FAFC] ${
                    selectedProject?.id === project.id ? "bg-[#EFF6FF]" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-[#0F172A] mb-1 font-medium">{project.name}</div>
                      <div className="text-[#64748B] text-sm">{project.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getStatusBadgeClass(dynamicStatus)}>
                      {dynamicStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-2 w-[100px] rounded-full bg-[#E2E8F0] overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-[#2563EB] rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-[#475569] text-sm font-medium w-[40px] text-center">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#64748B] text-sm">
                    {new Date(project.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#E2E8F0] rounded-lg"
                      onClick={() => handleViewProject(project)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 min-[900px]:hidden">
        {filteredProjects.map((project) => {
          const dynamicStatus = computeDynamicStatus(project);
          return (
            <div
              key={project.id}
              className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[#0F172A] font-medium">{project.name}</h3>
                <Badge variant="outline" className={`${getStatusBadgeClass(dynamicStatus)} text-xs`}>
                  {dynamicStatus}
                </Badge>
              </div>
              <p className="text-[#64748B] text-sm">{project.description}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="relative h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#2563EB] rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-[#475569] text-xs font-medium w-[40px] text-right">
                    {project.progress}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-[#64748B] text-xs">
                  Due:{" "}
                  {new Date(project.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-[#E2E8F0] text-xs"
                  onClick={() => handleViewProject(project)}
                >
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <textarea
                placeholder="Project description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                rows={3}
              />
              <Select value={newPriority} onValueChange={setNewPriority}>
                <SelectTrigger className="w-full border-[#E2E8F0] rounded-lg">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="border-[#E2E8F0] rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border-[#E2E8F0]"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
                onClick={handleCreateProject}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}