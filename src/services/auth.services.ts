'use server';

import { setTokenInCookies } from '@/lib/tokenUtils';
import { cookies } from 'next/headers';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export async function getNewTokensWithRefreshToken(refreshToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) return false;

    const { data } = await res.json();
    const { accessToken, refreshToken: newRefreshToken, token } = data;

    if (accessToken) {
      await setTokenInCookies('accessToken', accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies('refreshToken', newRefreshToken);
    }

    if (token) {
      await setTokenInCookies('better-auth_session_token', token, 24 * 60 * 60); // 1 day in seconds
    }

    return true;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}

export async function getUserInfo() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return null;

  const res = await fetch(`${BASE_API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `accessToken=${accessToken}`,
    },
  });

  if (!res.ok) return null;

  const { data } = await res.json();
  return data;
}
