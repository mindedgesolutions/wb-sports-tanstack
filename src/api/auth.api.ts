import { refreshFetch } from './refresh.fetch';
import { tokenManager } from './token.manager';
import { userManager } from './user.manager';

export async function refreshToken() {
  try {
    const response = await refreshFetch.post('/auth/refresh-token');

    const newAccessToken = response.data.token;
    const user = response.data.data;
    tokenManager.setToken(newAccessToken);
    userManager.setUser(user);

    return newAccessToken;
  } catch (err) {
    tokenManager.clear();
    userManager.clear();
    throw err;
  }
}
