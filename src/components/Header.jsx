import { CalendarDays, Users, Clock } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">QueueBook</h1>
            <p className="text-sm text-gray-500">Lightweight booking queue manager</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Manage bookings</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Reduce wait times</span>
        </div>
      </div>
    </header>
  );
}
