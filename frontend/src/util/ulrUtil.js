
export function getBaseURL() {
    return process.env.NODE_ENV !== 'production'
      ? 'http://127.0.0.1:5001'
      : import.meta.env.VITE_SERVER_URL
}
