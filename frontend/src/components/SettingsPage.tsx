import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [defaultSort, setDefaultSort] = useState("name");
  const [loading, setLoading] = useState(true);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("devtrack-token");

  useEffect(() => {
    async function loadUserData() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();

        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setEmailNotifications(!!data.emailNotifications);
        setInAppNotifications(!!data.inAppNotifications);
        setDefaultSort(data.defaultSort || "name");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user settings");
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, [token]);

  async function handleSave() {
    if (!token) return;
    try {
      const payload = {
        fullName,
        email,
        emailNotifications,
        inAppNotifications,
        defaultSort,
      };

      const res = await fetch(`${API_BASE}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      toast.success("Settings saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings");
    }
  }

  async function handlePasswordChange() {
    if (!token) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/user/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error("Failed to change password");

      toast.success("Password updated successfully");
      setPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Password update failed");
    }
  }

  async function handleDeleteAccount() {
    if (!token) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/user/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete account");

      toast.success("Account deleted successfully");
      localStorage.removeItem("devtrack-token");
      localStorage.removeItem("devtrack-user");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      toast.error("Could not delete account");
    }
  }

  if (loading) {
    return <div className="p-8 text-[#64748B]">Loading settings...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="mb-6 md:mb-8 text-[#0F172A]">Settings</h1>

      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Profile Settings</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="mt-6 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
        >
          Save Changes
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Preferences</h2>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <Label>Email Notifications</Label>
              <p className="text-[#64748B]">Receive updates via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              className="data-[state=checked]:bg-[#2563EB]"
            />
          </div>

          <Separator className="bg-[#E2E8F0]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <Label>In-App Notifications</Label>
              <p className="text-[#64748B]">Receive notifications within the app</p>
            </div>
            <Switch
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
              className="data-[state=checked]:bg-[#2563EB]"
            />
          </div>

          <Separator className="bg-[#E2E8F0]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <Label>Default Project Sort</Label>
              <p className="text-[#64748B]">Set default sorting for projects</p>
            </div>
            <Select value={defaultSort} onValueChange={setDefaultSort}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-[#E2E8F0] rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">By Name</SelectItem>
                <SelectItem value="dueDate">By Due Date</SelectItem>
                <SelectItem value="progress">By Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8">
        <h2 className="mb-6 text-[#0F172A]">Account & Security</h2>

        <div className="space-y-4 mb-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-[#E2E8F0] rounded-lg"
            onClick={() => setPasswordDialogOpen(true)}
          >
            Change Password
          </Button>
        </div>

        <Separator className="bg-[#E2E8F0] my-6" />

        <div>
          <Label className="text-[#0F172A] block mb-2">Danger Zone</Label>
          <p className="text-[#64748B] mb-4">
            Once you delete your account, there is no going back. This action
            will permanently remove your data.
          </p>
          <Button
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg"
          >
            Delete Account
          </Button>
        </div>
      </div>

      <AlertDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your current and new password below.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePasswordChange}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white"
            >
              Save Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}