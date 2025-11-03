import { useState } from "react";
import { Plus } from "lucide-react";

const defaultServices = [
  { id: "consult", label: "Consultation" },
  { id: "followup", label: "Follow-up" },
  { id: "treatment", label: "Treatment" },
];

export default function BookingForm({ onAdd }) {
  const [name, setName] = useState("");
  const [service, setService] = useState(defaultServices[0].id);
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState(false);
  const [notes, setNotes] = useState("");

  const reset = () => {
    setName("");
    setService(defaultServices[0].id);
    setTime("");
    setPriority(false);
    setNotes("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = crypto.randomUUID();
    const scheduledAt = time ? new Date(time).toISOString() : null;
    const createdAt = new Date().toISOString();

    onAdd({
      id,
      name: name.trim(),
      service,
      scheduledAt,
      createdAt,
      status: "waiting",
      priority,
      notes: notes.trim() || null,
    });
    reset();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">New Booking</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer name"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {defaultServices.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled time (optional)</label>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
            <input
              id="priority"
              type="checkbox"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="priority" className="text-sm text-gray-700">Mark as priority</label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any extra details"
            rows={3}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4" /> Add to queue
          </button>
        </div>
      </form>
    </div>
  );
}
