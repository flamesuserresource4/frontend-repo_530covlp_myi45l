import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import BookingForm from "./components/BookingForm";
import QueueControls from "./components/QueueControls";
import QueueList from "./components/QueueList";

function useLocalQueue(key = "queuebook-items") {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {}
  }, [items, key]);

  return [items, setItems];
}

export default function App() {
  const [items, setItems] = useLocalQueue();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const promote = (id) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(idx, 1);
      next.splice(moved.priority ? 0 : Math.max(0, idx - 1), 0, moved);
      return next;
    });
  };

  const setStatus = (id, status) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const start = (id) => setStatus(id, "active");
  const finish = (id) => setStatus(id, "done");
  const cancel = (id) => setStatus(id, "canceled");

  const clearCompleted = () => {
    setItems((prev) => prev.filter((i) => i.status !== "done" && i.status !== "canceled"));
  };

  const visible = useMemo(() => {
    const list = items.filter((i) => (filter === "all" ? true : i.status === filter));
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "priority") {
        if (a.priority === b.priority) return 0;
        return a.priority ? -1 : 1;
      }
      if (sortBy === "scheduledAt") {
        const at = a.scheduledAt ? new Date(a.scheduledAt).getTime() : Infinity;
        const bt = b.scheduledAt ? new Date(b.scheduledAt).getTime() : Infinity;
        return at - bt;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      // default createdAt
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return sorted;
  }, [items, filter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BookingForm onAdd={addItem} />
            <QueueList
              items={visible}
              onPromote={promote}
              onStart={start}
              onFinish={finish}
              onCancel={cancel}
            />
          </div>
          <div className="lg:col-span-1">
            <QueueControls
              items={items}
              onClearCompleted={clearCompleted}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        Built with ❤️ — Manage your bookings with ease.
      </footer>
    </div>
  );
}
