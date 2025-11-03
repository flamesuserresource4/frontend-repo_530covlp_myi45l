import { useMemo } from "react";
import { ArrowUp, CheckCircle2, Clock, User2, XCircle, Play, Pause } from "lucide-react";

function formatRelative(t) {
  if (!t) return "—";
  const now = Date.now();
  const diff = now - new Date(t).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatTime(t) {
  if (!t) return "—";
  const d = new Date(t);
  return d.toLocaleString();
}

export default function QueueList({ items, onPromote, onStart, onFinish, onCancel }) {
  const ordered = useMemo(() => {
    // items are already sorted by parent; just return
    return items;
  }, [items]);

  if (ordered.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-10 text-center text-gray-500">
        No bookings yet. Add your first booking to populate the queue.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b text-xs font-medium text-gray-500 bg-gray-50">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Customer</div>
        <div className="col-span-2">Service</div>
        <div className="col-span-2">Scheduled</div>
        <div className="col-span-2">Created</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      <ul className="divide-y">
        {ordered.map((item, idx) => (
          <li key={item.id} className="grid grid-cols-12 gap-3 px-4 py-3 items-center">
            <div className="col-span-1">
              <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold ${
                item.status === "active" ? "bg-emerald-50 text-emerald-700" : item.priority ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-700"
              }`}>
                {idx + 1}
              </span>
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.status}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 capitalize">{item.service.replace("_", " ")}</div>
            <div className="col-span-2 text-sm">
              <div className="text-gray-900">{formatTime(item.scheduledAt)}</div>
              <div className="text-xs text-gray-500">{item.scheduledAt ? <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> upcoming</span> : "—"}</div>
            </div>
            <div className="col-span-2 text-sm">
              <div className="text-gray-900">{formatTime(item.createdAt)}</div>
              <div className="text-xs text-gray-500">{formatRelative(item.createdAt)}</div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center justify-end gap-2">
                {item.status === "waiting" && (
                  <>
                    <button
                      onClick={() => onPromote(item.id)}
                      title="Promote"
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onStart(item.id)}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700"
                    >
                      <Play className="h-3 w-3" /> Start
                    </button>
                    <button
                      onClick={() => onCancel(item.id)}
                      className="inline-flex items-center gap-1 rounded-md bg-red-50 text-red-700 px-2 py-1 text-xs hover:bg-red-100"
                    >
                      <XCircle className="h-3 w-3" /> Cancel
                    </button>
                  </>
                )}
                {item.status === "active" && (
                  <>
                    <button
                      onClick={() => onFinish(item.id)}
                      className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2 py-1 text-xs text-white hover:bg-indigo-700"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Done
                    </button>
                    <button
                      onClick={() => onCancel(item.id)}
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    >
                      <Pause className="h-3 w-3" /> Cancel
                    </button>
                  </>
                )}
                {(item.status === "done" || item.status === "canceled") && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
