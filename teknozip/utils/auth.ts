// lib/auth.ts
export function setTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
  
  export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  
  export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  
  export function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  
  export function parseJwt(token: string) {
    try {
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }
  