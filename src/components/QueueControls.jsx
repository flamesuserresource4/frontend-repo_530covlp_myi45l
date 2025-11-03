import { useMemo } from "react";
import { Filter, Trash2 } from "lucide-react";

export default function QueueControls({ items, onClearCompleted, filter, setFilter, sortBy, setSortBy }) {
  const stats = useMemo(() => {
    const total = items.length;
    const waiting = items.filter((i) => i.status === "waiting").length;
    const active = items.filter((i) => i.status === "active").length;
    const done = items.filter((i) => i.status === "done" || i.status === "canceled").length;
    return { total, waiting, active, done };
  }, [items]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Queue Overview</h2>
        <button
          onClick={onClearCompleted}
          className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" /> Clear completed
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border p-3">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-semibold">{stats.total}</p>
        </div>
        <div className="rounded-xl border p-3">
          <p className="text-xs text-gray-500">Waiting</p>
          <p className="text-xl font-semibold text-amber-600">{stats.waiting}</p>
        </div>
        <div className="rounded-xl border p-3">
          <p className="text-xs text-gray-500">Active/Done</p>
          <p className="text-xl font-semibold"><span className="text-emerald-600 mr-1">{stats.active}</span>/<span className="text-gray-600 ml-1">{stats.done}</span></p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <Filter className="h-4 w-4" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border px-3 py-2 bg-white text-sm"
          >
            <option value="all">All</option>
            <option value="waiting">Waiting</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border px-3 py-2 bg-white text-sm"
          >
            <option value="createdAt">Created time</option>
            <option value="priority">Priority</option>
            <option value="scheduledAt">Scheduled time</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}
