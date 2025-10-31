import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-[#F8FAFC] border-2 border-[#E2E8F0] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#64748B]" />
      </div>
      <h3 className="text-[#0F172A] mb-2">{title}</h3>
      {description && (
        <p className="text-[#64748B] text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
