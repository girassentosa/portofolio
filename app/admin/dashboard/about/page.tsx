"use client";

import { useEffect, useState } from "react";

interface AboutData {
  whoAmI: string;
  myApproach: string;
  personalInfo: {
    name: string;
    location: string;
    email: string;
    phone: string;
    education: string;
  };
  image: string;
}

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AboutData>({
    whoAmI: "",
    myApproach: "",
    personalInfo: {
      name: "",
      location: "",
      email: "",
      phone: "",
      education: "",
    },
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/about");
      const data = await res.json();
      setData(data);
      // Ensure personalInfo exists
      setFormData({
        whoAmI: data?.whoAmI || "",
        myApproach: data?.myApproach || "",
        personalInfo: {
          name: data?.personalInfo?.name || data?.name || "",
          location: data?.personalInfo?.location || data?.location || "",
          email: data?.personalInfo?.email || data?.email || "",
          phone: data?.personalInfo?.phone || data?.phone || "",
          education: data?.personalInfo?.education || data?.education || "",
        },
        image: data?.image || "",
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
      await fetch("/api/admin/about", {
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

  const updatePersonalInfo = (field: keyof typeof formData.personalInfo, value: string) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value,
      },
    });
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Kelola About Section</h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Edit informasi tentang Anda</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Who Am I Card */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Who Am I</h2>
          <textarea
            value={formData.whoAmI}
            onChange={(e) => setFormData({ ...formData, whoAmI: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ceritakan siapa Anda dan apa yang Anda lakukan..."
          />
        </div>

        {/* My Approach Card */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">My Approach</h2>
          <textarea
            value={formData.myApproach}
            onChange={(e) => setFormData({ ...formData, myApproach: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Jelaskan pendekatan atau filosofi kerja Anda..."
          />
        </div>

        {/* Personal Info Card */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Personal Info</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.personalInfo?.name || ""}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Lokasi
              </label>
              <input
                type="text"
                value={formData.personalInfo?.location || ""}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.personalInfo?.email || ""}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.personalInfo?.phone || ""}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white text-sm font-medium mb-2">
                Pendidikan
              </label>
              <input
                type="text"
                value={formData.personalInfo?.education || ""}
                onChange={(e) => updatePersonalInfo("education", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Informatika - IPK 3.68/4.00"
              />
            </div>
          </div>
        </div>

        {/* Image Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Foto About</h2>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="/images/profile.jpg"
            />
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-48 h-48 rounded-lg object-cover border-2 border-gray-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-purple-400 font-bold mb-2">WHO AM I</h3>
              <p className="text-gray-300 text-sm">{formData.whoAmI}</p>
            </div>
            <div>
              <h3 className="text-purple-400 font-bold mb-2">MY APPROACH</h3>
              <p className="text-gray-300 text-sm">{formData.myApproach}</p>
            </div>
            <div>
              <h3 className="text-purple-400 font-bold mb-2">PERSONAL INFO</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <p>📝 {formData.personalInfo.name}</p>
                <p>📍 {formData.personalInfo.location}</p>
                <p>✉️ {formData.personalInfo.email}</p>
                <p>📱 {formData.personalInfo.phone}</p>
                <p>🎓 {formData.personalInfo.education}</p>
              </div>
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
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

