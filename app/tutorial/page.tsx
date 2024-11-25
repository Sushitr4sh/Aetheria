"use client";

import React from "react";
import PageWrapper from "@/components/utilities/PageWrapper";
import { motion } from "framer-motion";

export default function Tutorial() {
  return (
    <PageWrapper>
      <div className="min-h-screen p-8 md:p-16 space-y-12 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          How to Use Aetheria
        </motion.h1>

        {/* English Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-[#007AFF]">
            English Guide
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">1. Getting Started</h3>
              <p>
                Visit our website at{" "}
                <a
                  href="https://aetheria-delta.vercel.app/"
                  className="text-[#007AFF] hover:underline"
                >
                  https://aetheria-delta.vercel.app/
                </a>
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">2. Sign In</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Click the "Get Started" button in the navigation bar</li>
                <li>
                  Sign in using your Google account (currently, we only support
                  Google sign-in)
                </li>
                <li>
                  After successful sign-in, you'll be redirected to the landing
                  page
                </li>
                <li>
                  Your email username will replace the "Get Started" button,
                  indicating successful sign-in
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">3. Navigation</h3>
              <p className="mb-2">
                Click the hamburger menu (☰) in the top right corner to access:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Profile:</strong> View your account information, sign
                  out option, mood progress, progress summary, and average mood
                </li>
                <li>
                  <strong>Journals:</strong> Access all your written journals
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">
                4. Creating a Journal
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>In the Journals section, click "Create Journal"</li>
                <li>
                  Need inspiration? Click the "Tips" button for guidance on
                  writing meaningful journals
                </li>
                <li>Write your journal (minimum 50 words)</li>
                <li>
                  Click "Save Journal" and wait for the AI-generated response
                </li>
                <li>
                  The response includes:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Journal summary</li>
                    <li>Emotion radar chart based on your journal</li>
                    <li>Personalized recommendations for mood improvement</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">5. Managing Journals</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Return to "Back to Journals" to see your saved journal</li>
                <li>Click "See Details" to view or edit your journal</li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">6. Contact Support</h3>
              <p>
                Click "Contact" in the sidebar to report any issues or provide
                feedback
              </p>
            </div>
          </div>
        </motion.div>

        {/* Indonesian Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6 mt-16"
        >
          <h2 className="text-2xl font-semibold text-[#007AFF]">
            Panduan Bahasa Indonesia
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">1. Memulai</h3>
              <p>
                Kunjungi website kami di{" "}
                <a
                  href="https://aetheria-delta.vercel.app/"
                  className="text-[#007AFF] hover:underline"
                >
                  https://aetheria-delta.vercel.app/
                </a>
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">2. Masuk</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Klik tombol "Get Started" di navigation bar</li>
                <li>
                  Masuk menggunakan akun Google Anda (saat ini, kami hanya
                  mendukung masuk dengan Google)
                </li>
                <li>
                  Setelah berhasil masuk, Anda akan diarahkan kembali ke halaman
                  utama
                </li>
                <li>
                  Email Anda akan menggantikan tombol "Get Started", menandakan
                  Anda telah berhasil masuk
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">3. Navigasi</h3>
              <p className="mb-2">
                Klik menu hamburger (☰) di pojok kanan atas untuk mengakses:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Profile:</strong> Lihat informasi akun, opsi keluar,
                  progres suasana hati, ringkasan progres, dan rata-rata suasana
                  hati
                </li>
                <li>
                  <strong>Journals:</strong> Akses semua jurnal yang telah Anda
                  tulis
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">4. Membuat Jurnal</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Di bagian Journals, klik "Create Journal"</li>
                <li>
                  Butuh inspirasi? Klik tombol "Tips" untuk panduan menulis
                  jurnal yang bermakna
                </li>
                <li>Tulis jurnal Anda (minimal 50 kata)</li>
                <li>
                  Klik "Save Journal" dan tunggu respons yang dihasilkan AI
                </li>
                <li>
                  Respons mencakup:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Ringkasan jurnal</li>
                    <li>Grafik radar emosi berdasarkan jurnal Anda</li>
                    <li>
                      Rekomendasi personal untuk meningkatkan suasana hati
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">5. Mengelola Jurnal</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Kembali ke "Back to Journals" untuk melihat jurnal yang
                  tersimpan
                </li>
                <li>
                  Klik "See Details" untuk melihat atau mengedit jurnal Anda
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-3">6. Kontak Dukungan</h3>
              <p>
                Klik "Contact" di sidebar untuk melaporkan masalah atau
                memberikan masukan
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
