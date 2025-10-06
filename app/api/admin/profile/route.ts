import { NextRequest, NextResponse } from 'next/server';
const md5 = require('js-md5');
import { getUserById, getUserByUsername, updateUserProfile } from '@/lib/supabaseHelper';

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('admin_session');
    
    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    const userData = JSON.parse(session.value);
    const userId = userData.userId;

    const { 
      oldUsername, 
      oldPassword, 
      newUsername, 
      newPassword, 
      confirmPassword, 
      profileImage 
    } = await request.json();

    // Jika update username dan/atau password
    if (oldUsername && oldPassword) {
      // Validasi username & password lama
      const user = await getUserById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
      }

      const hashedOldPassword = md5(oldPassword);
      if (user.username !== oldUsername || user.password !== hashedOldPassword) {
        return NextResponse.json(
          { error: 'Username atau password lama tidak sesuai' },
          { status: 401 }
        );
      }

      const updates: any = {};

      // Update username jika ada perubahan
      if (newUsername && newUsername !== oldUsername) {
        // Cek username baru sudah dipakai atau belum
        const existingUser = await getUserByUsername(newUsername);
        if (existingUser && existingUser.id !== userId) {
          return NextResponse.json(
            { error: 'Username sudah digunakan' },
            { status: 409 }
          );
        }
        updates.username = newUsername;
      }

      // Update password jika ada
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          return NextResponse.json(
            { error: 'Password baru dan konfirmasi password tidak cocok' },
            { status: 400 }
          );
        }

        if (newPassword.length < 6) {
          return NextResponse.json(
            { error: 'Password baru minimal 6 karakter' },
            { status: 400 }
          );
        }

        updates.password = md5(newPassword);
      }

      // Update ke database
      if (Object.keys(updates).length > 0) {
        const updatedUser = await updateUserProfile(userId, updates);

        // Update session dengan data baru
        const newSession = {
          userId: updatedUser.id,
          username: updatedUser.username,
          profileImage: updatedUser.profile_image
        };

        const response = NextResponse.json({
          success: true,
          message: 'Profil berhasil diubah'
        });

        response.cookies.set('admin_session', JSON.stringify(newSession), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
      }
    }

    // Jika update profile image saja
    if (profileImage !== undefined) {
      const updatedUser = await updateUserProfile(userId, { 
        profile_image: profileImage 
      });

      // Update session dengan profile image baru
      const newSession = {
        userId: updatedUser.id,
        username: updatedUser.username,
        profileImage: updatedUser.profile_image
      };

      const response = NextResponse.json({
        success: true,
        message: 'Foto profil berhasil diubah',
        profileImage: updatedUser.profile_image
      });

      response.cookies.set('admin_session', JSON.stringify(newSession), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Data tidak valid' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

