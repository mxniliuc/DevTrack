import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Welcome to DevTrack</DialogTitle>
          <DialogDescription>
            A complete, scalable, and responsive SaaS dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-[#0F172A]">
          <div>
            <h3 className="mb-2">✨ Features</h3>
            <ul className="space-y-1 text-[#64748B] ml-4">
              <li>• Dashboard with analytics, charts, and activity feed</li>
              <li>• Projects page with search, filter, and sort</li>
              <li>• Project details with task management</li>
              <li>• Settings page for user preferences</li>
              <li>• Design system documentation</li>
              <li>• Login, Signup, and Forgot Password flows</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2">📱 Responsive Design</h3>
            <ul className="space-y-1 text-[#64748B] ml-4">
              <li>• Desktop (1440px+): Full sidebar visible</li>
              <li>• Tablet (1024px): Collapsible sidebar</li>
              <li>• Mobile (390px): Hidden sidebar with menu button</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2">🎨 Design System</h3>
            <ul className="space-y-1 text-[#64748B] ml-4">
              <li>• Clean, minimal aesthetic</li>
              <li>• Consistent color palette (Primary: #2563EB)</li>
              <li>• Inter font family</li>
              <li>• White cards with subtle shadows</li>
              <li>• Rounded corners (8-12px)</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2">💬 Interactions</h3>
            <ul className="space-y-1 text-[#64748B] ml-4">
              <li>• Toast notifications for user feedback</li>
              <li>• Confirmation dialogs for destructive actions</li>
              <li>• Loading states and skeletons</li>
              <li>• Empty states with helpful CTAs</li>
              <li>• Hover and focus states</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0]">
            <p className="text-[#64748B]">
              Navigate through the sidebar to explore all features. Visit the Design System page
              to see all components and styling guidelines.
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
          >
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
