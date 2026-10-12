import { useState } from 'react';
import type React from 'react';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  RotateCcw,
  Clock,
  Filter,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import type { Task, TaskCategory } from '../types';

interface PlannerPageProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onResetTasks: () => void;
  completionPercentage: number;
  completedTasks: number;
  totalTasks: number;
}

const CATEGORIES: TaskCategory[] = [
  'OIR & Screening',
  'Psychology',
  'GTO Tasks',
  'Personal Interview',
  'Current Affairs',
  'Physical Fitness'
];

export const PlannerPage: React.FC<PlannerPageProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onResetTasks,
  completionPercentage,
  completedTasks,
  totalTasks
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Psychology');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [notes, setNotes] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      estimatedMinutes: Number(estimatedMinutes) || 30,
      priority,
      completed: false,
      notes: notes.trim() ? notes.trim() : undefined
    });

    setTitle('');
    setNotes('');
    setEstimatedMinutes(30);
    setPriority('medium');
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return !task.completed;
    if (selectedFilter === 'completed') return task.completed;
    return task.category === selectedFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top action header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#0a192f] text-[#d4af37]">
                <CheckSquare className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">SSB Daily Study Planner</h2>
                <p className="text-xs text-slate-700">
                  Customizable daily drills saved automatically to your browser storage
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetTasks}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Reset to recommended study routine"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Sample Plan</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0a192f] to-[#102a4c] hover:from-[#102a4c] hover:to-[#1a3a60] rounded-lg shadow-sm transition-all border border-[#d4af37]/30"
            >
              <Plus className="w-4 h-4 text-[#d4af37]" />
              <span>Add Custom Task</span>
            </button>
          </div>
        </div>

        {/* Progress bar overview */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">
                Plan Completion: {completedTasks} / {totalTasks} Tasks
              </span>
              <span className="font-bold text-[#0a192f]">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0a192f] to-[#d4af37] transition-all duration-300 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-xs text-slate-700">
            <Sparkles className="w-4 h-4 text-[#b48a28]" />
            <span>Target: 4.5 hours daily SSB drills</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-700 font-semibold flex items-center gap-1 px-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>

        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedFilter === 'all'
              ? 'bg-[#0a192f] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All ({tasks.length})
        </button>

        <button
          onClick={() => setSelectedFilter('pending')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedFilter === 'pending'
              ? 'bg-[#0a192f] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </button>

        <button
          onClick={() => setSelectedFilter('completed')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedFilter === 'completed'
              ? 'bg-[#0a192f] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>

        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedFilter === cat
                ? 'bg-[#0a192f] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          const priorityStyles = {
            high: 'text-rose-700 bg-rose-50 border-rose-200',
            medium: 'text-amber-700 bg-amber-50 border-amber-200',
            low: 'text-slate-600 bg-slate-100 border-slate-200'
          };

          return (
            <div
              key={task.id}
              className={`p-4 rounded-xl border bg-white shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.completed ? 'opacity-70 bg-slate-50/70 border-slate-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-[#0a192f] transition-colors focus:outline-none"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-[#0a192f] shrink-0" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </span>

                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        priorityStyles[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {task.notes && (
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">{task.notes}</p>
                  )}

                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-700">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                      {task.estimatedMinutes} mins
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  aria-label="Delete task"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 p-8">
            <CheckSquare className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 text-sm font-medium">No tasks found matching this filter.</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="mt-3 text-xs text-[#0a192f] font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Schedule New Preparation Task</h3>
            <p className="text-xs text-slate-700 mb-4">
              Add a personalized drill to your daily Naval SSB study routine.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practice 30 SRT situations with 30-sec timer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as TaskCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Estimated Time (Mins)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={240}
                    value={estimatedMinutes}
                    onChange={e => setEstimatedMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-1.5 text-xs font-bold uppercase rounded-lg border transition-all ${
                        priority === p
                          ? 'bg-[#0a192f] text-white border-[#0a192f]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preparation Notes / Guidance (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Key OLQs to focus on, specific topics, or goals..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] rounded-lg shadow-sm transition-colors border border-[#d4af37]/30"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
