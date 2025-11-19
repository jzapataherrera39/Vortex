const BASE_URL = "http://localhost:5000/api/users";

export async function getUsers(token) {
  const res = await fetch(`${BASE_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}
