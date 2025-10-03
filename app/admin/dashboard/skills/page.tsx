"use client";

import { useEffect, useState } from "react";

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
    color: "#000000",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSkill) {
        // Update
        await fetch(`/api/admin/skills/${editingSkill.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        await fetch("/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      fetchSkills();
      closeModal();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Gagal menyimpan skill!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus skill ini?")) return;

    try {
      await fetch(`/api/admin/skills/${id}`, {
        method: "DELETE",
      });
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Gagal menghapus skill!");
    }
  };

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        icon: skill.icon,
        color: skill.color,
      });
    } else {
      setEditingSkill(null);
      setFormData({ name: "", category: "", icon: "", color: "#000000" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSkill(null);
    setFormData({ name: "", category: "", icon: "", color: "#000000" });
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Kelola Skills</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">Tambah, edit, atau hapus skills Anda</p>
        </div>
        <button
          onClick={() => openModal()}
          className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center text-sm sm:text-base"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-gray-600 transition group"
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
                style={{ backgroundColor: skill.color }}
              />
              <div className="flex space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                <button
                  onClick={() => openModal(skill)}
                  className="p-1 sm:p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-1 sm:p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-white text-sm sm:text-base font-semibold mb-0.5 sm:mb-1 truncate">{skill.name}</h3>
            <p className="text-gray-400 text-xs sm:text-sm truncate">{skill.category}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              {editingSkill ? "Edit Skill" : "Tambah Skill Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Nama Skill</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Kategori</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Icon URL</label>
                <input
                  type="url"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://..."
                  required
                />
                <p className="text-gray-400 text-xs mt-1">
                  Gunakan: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/...
                </p>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Warna</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:flex-1 px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm sm:text-base"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition text-sm sm:text-base"
                >
                  {editingSkill ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

