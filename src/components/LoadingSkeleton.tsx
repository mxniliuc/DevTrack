import { Skeleton } from './ui/skeleton';

export function ProjectsListSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="text-left px-6 py-4 text-[#64748B]">Project Name</th>
              <th className="text-left px-6 py-4 text-[#64748B]">Status</th>
              <th className="text-left px-6 py-4 text-[#64748B]">Progress</th>
              <th className="text-left px-6 py-4 text-[#64748B]">Due Date</th>
              <th className="text-left px-6 py-4 text-[#64748B]"></th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-[#E2E8F0]">
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-3 w-64" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-2 w-32" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TasksListSkeleton() {
  return (
    <div className="divide-y divide-[#E2E8F0]">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="px-6 py-4 flex items-center gap-4">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
            <Skeleton className="h-12 w-12 rounded-lg mb-4" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
