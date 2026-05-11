import { ProtectedRoute } from '@/components/protected-route';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function DashboardLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto md:ml-64">
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
