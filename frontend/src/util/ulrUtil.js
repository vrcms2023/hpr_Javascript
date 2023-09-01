export function getBaseURL() {
  return process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:5001"
    : process.env.REACT_APP_SERVER_URL;
}

export function removeActiveClass() {
  const id = document.getElementById("projectLink");
  if (id) {
    id.classList.remove("active");
  }
}
