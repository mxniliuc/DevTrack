import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Skeleton } from './ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

export function DesignSystemPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <h1 className="mb-2 text-[#0F172A]">Design System</h1>
      <p className="text-[#64748B] mb-8">
        DevTrack's visual identity and component library
      </p>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { name: 'Primary', color: '#2563EB' },
            { name: 'Background', color: '#F8FAFC' },
            { name: 'Surface/Card', color: '#FFFFFF' },
            { name: 'Text Primary', color: '#0F172A' },
            { name: 'Text Muted', color: '#64748B' },
            { name: 'Border', color: '#E2E8F0' },
            { name: 'Success', color: '#10B981' },
            { name: 'Warning', color: '#F59E0B' },
            { name: 'Danger', color: '#EF4444' }
          ].map((item) => (
            <div key={item.name} className="space-y-2">
              <div
                className="h-20 rounded-lg border border-[#E2E8F0]"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-[#0F172A]">{item.name}</p>
                <p className="text-[#64748B]">{item.color}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Typography</h2>
        <div className="space-y-4">
          <div className="pb-4 border-b border-[#E2E8F0]">
            <h1 className="text-[#0F172A]">Heading 1</h1>
            <p className="text-[#64748B]">24px • Bold • Inter</p>
          </div>
          <div className="pb-4 border-b border-[#E2E8F0]">
            <h2 className="text-[#0F172A]">Heading 2</h2>
            <p className="text-[#64748B]">18px • SemiBold • Inter</p>
          </div>
          <div className="pb-4 border-b border-[#E2E8F0]">
            <p className="text-[#0F172A]">Body Text</p>
            <p className="text-[#64748B]">14px • Regular • Inter</p>
          </div>
          <div className="pb-4 border-b border-[#E2E8F0]">
            <label className="text-[#0F172A]">Label Text</label>
            <p className="text-[#64748B]">14px • Medium • Inter</p>
          </div>
          <div>
            <p className="text-[#64748B]">Muted Text</p>
            <p className="text-[#64748B]">12px • Regular • Inter</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Spacing Scale</h2>
        <div className="space-y-4">
          {[
            { name: '4px', value: '4px' },
            { name: '8px', value: '8px' },
            { name: '16px', value: '16px' },
            { name: '24px', value: '24px' },
            { name: '32px', value: '32px' }
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className="w-20 text-[#64748B]">{item.name}</div>
              <div
                className="h-8 bg-[#2563EB] rounded"
                style={{ width: item.value }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Shadows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="h-24 bg-white rounded-lg shadow-sm border border-[#E2E8F0] mb-2" />
            <p className="text-[#64748B]">Small</p>
          </div>
          <div>
            <div className="h-24 bg-white rounded-lg shadow-md mb-2" />
            <p className="text-[#64748B]">Medium</p>
          </div>
          <div>
            <div className="h-24 bg-white rounded-lg shadow-lg mb-2" />
            <p className="text-[#64748B]">Large</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg">
            Primary
          </Button>
          <Button variant="outline" className="border-[#E2E8F0] rounded-lg">
            Outline
          </Button>
          <Button variant="ghost" className="text-[#2563EB] hover:bg-[#2563EB]/5">
            Text
          </Button>
          <Button disabled className="rounded-lg">
            Disabled
          </Button>
          <Button
            variant="destructive"
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg"
          >
            Danger
          </Button>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <p className="text-[#64748B] mb-2">Default</p>
            <Input
              placeholder="Enter text..."
              className="bg-white border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <p className="text-[#64748B] mb-2">Focused (with blue ring)</p>
            <Input
              placeholder="Enter text..."
              className="bg-white border-[#2563EB] rounded-lg ring-2 ring-[#2563EB]/20"
            />
          </div>
          <div>
            <p className="text-[#64748B] mb-2">Error</p>
            <Input
              placeholder="Enter text..."
              className="bg-white border-[#EF4444] rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Select Dropdowns</h2>
        <div className="max-w-xs">
          <Select defaultValue="option1">
            <SelectTrigger className="bg-white border-[#E2E8F0] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-4 text-[#0F172A]">Status Badges</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge
            variant="outline"
            className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
          >
            Planning
          </Badge>
          <Badge
            variant="outline"
            className="bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20"
          >
            In Progress
          </Badge>
          <Badge
            variant="outline"
            className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
          >
            Completed
          </Badge>
        </div>

        <h2 className="mb-4 text-[#0F172A]">Priority Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="outline"
            className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
          >
            Low
          </Badge>
          <Badge
            variant="outline"
            className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
          >
            Medium
          </Badge>
          <Badge
            variant="outline"
            className="bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20"
          >
            High
          </Badge>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-[#0F172A] mb-2">Default Card</h3>
            <p className="text-[#64748B]">
              White background, subtle shadow, rounded corners
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#2563EB] shadow-md p-6 transform hover:scale-105 transition-transform">
            <h3 className="text-[#0F172A] mb-2">Hovered Card</h3>
            <p className="text-[#64748B]">
              Blue border, enhanced shadow, slight scale
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Progress Bar</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#64748B]">25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#64748B]">65%</span>
            </div>
            <Progress value={65} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#64748B]">100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Toggle Switches</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between max-w-md">
            <span className="text-[#0F172A]">Enabled</span>
            <Switch defaultChecked className="data-[state=checked]:bg-[#2563EB]" />
          </div>
          <div className="flex items-center justify-between max-w-md">
            <span className="text-[#0F172A]">Disabled</span>
            <Switch className="data-[state=checked]:bg-[#2563EB]" />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6">
        <h2 className="mb-6 text-[#0F172A]">Loading Skeletons</h2>
        <div className="space-y-4">
          <div>
            <p className="text-[#64748B] mb-3">Card Skeleton</p>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-4">
              <Skeleton className="h-12 w-12 rounded-lg mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <div>
            <p className="text-[#64748B] mb-3">List Item Skeleton</p>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 md:p-8">
        <h2 className="mb-6 text-[#0F172A]">Toast Notifications</h2>
        <p className="text-[#64748B] mb-4">
          Click the buttons below to see different types of toast notifications
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => toast.success('Task completed successfully!')}
            className="bg-[#10B981] hover:bg-[#059669] text-white rounded-lg"
          >
            Success Toast
          </Button>
          <Button
            onClick={() => toast.error('Failed to delete project')}
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg"
          >
            Error Toast
          </Button>
          <Button
            onClick={() => toast('This is an info message')}
            variant="outline"
            className="border-[#E2E8F0] rounded-lg"
          >
            Info Toast
          </Button>
          <Button
            onClick={() => toast.warning('Are you sure you want to proceed?')}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg"
          >
            Warning Toast
          </Button>
        </div>
      </section>
    </div>
  );
}
