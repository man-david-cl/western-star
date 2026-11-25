import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "ws_access";

function secret() {
  const value = process.env.WESTERN_STAR_LINK_SECRET;
  if (!value) throw new Error("WESTERN_STAR_LINK_SECRET is not configured");
  return value;
}

export function verifyAccessToken(token: string): { exp: number } | null {
  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return null;
    const expected = createHmac("sha256", secret()).update(payload).digest();
    const received = Buffer.from(signature, "base64url");
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!Number.isSafeInteger(decoded.exp) || decoded.exp <= Math.floor(Date.now() / 1000)) return null;
    return { exp: decoded.exp };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
