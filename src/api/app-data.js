const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return { error: true, message: error.message };
  }
}

async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    putAccessToken(responseJson.data.accessToken);
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error("Login Error:", error.message);
    return { error: true, message: error.message };
  }
}

async function register({ name, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return { error: false };
  } catch (error) {
    console.error("Register Error:", error.message);
    return { error: true, message: error.message };
  }
}

async function getUserLogged() {
  return fetchWithToken(`${BASE_URL}/users/me`);
}

async function addNote({ title, body }) {
  return fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
}

async function getActiveNotes() {
  return fetchWithToken(`${BASE_URL}/notes`);
}

async function getArchivedNotes() {
  return fetchWithToken(`${BASE_URL}/notes/archived`);
}

async function getNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}`);
}

async function archiveNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
}

async function unarchiveNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
}

async function deleteNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
