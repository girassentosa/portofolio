"use client";

import { useEffect, useState } from "react";

interface HomeData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  profile_name?: string;
  profile_title?: string;
  profile_handle?: string;
  stats: Array<{ value: string; label: string }>;
}

export default function HomeAdmin() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<HomeData>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    profile_name: "",
    profile_title: "",
    profile_handle: "",
    stats: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/home");
      const data = await res.json();
      setData(data);
      // Ensure stats array exists
      setFormData({
        ...data,
        stats: data?.stats || []
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch("/api/admin/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("Data berhasil disimpan!");
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Gagal menyimpan data!");
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Kelola Home Section</h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Edit judul, deskripsi, foto profil, dan statistik</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Basic Info Card */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Informasi Dasar</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Subtitle (Text Atas)
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Halo, saya"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nama Lengkap (Title)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Taji Jadda Giras Sentosa"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Deskripsi
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ceritakan tentang diri Anda..."
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Foto Profil URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/images/profile.jpg"
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-600"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card Info */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Informasi Profile Card</h2>
          <p className="text-sm text-gray-400 mb-4">Data yang tampil di card foto halaman utama</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nama Lengkap (Profile Card)
              </label>
              <input
                type="text"
                value={formData.profile_name || ""}
                onChange={(e) => setFormData({ ...formData, profile_name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="TAJI JADDA GIRAS SENTOSA"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Job Title / Posisi
              </label>
              <input
                type="text"
                value={formData.profile_title || ""}
                onChange={(e) => setFormData({ ...formData, profile_title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Web developer"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username / Handle (tanpa @)
              </label>
              <input
                type="text"
                value={formData.profile_handle || ""}
                onChange={(e) => setFormData({ ...formData, profile_handle: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tajijaddagirasntosa"
              />
              <p className="text-xs text-gray-400 mt-1">Akan ditampilkan dengan @ di depan</p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Statistik</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {formData.stats?.map((stat, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-xs mb-2">Statistik {index + 1}</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nilai (e.g., 2 Tahun)"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Label (e.g., Pengalaman)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Preview</h2>
          <div className="bg-gray-900 rounded-lg p-4 sm:p-6">
            <p className="text-gray-400 text-xs sm:text-sm mb-2">{formData.subtitle}</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">{formData.title}</h1>
            <p className="text-sm sm:text-base text-gray-300 mb-4">{formData.description}</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {formData.stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <p className="text-white font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={fetchData}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm sm:text-base"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

