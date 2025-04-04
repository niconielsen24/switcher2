export async function googleLogin(credential: string) {
  const payload = { idToken: credential };

  const response = await fetch("https://localhost:8080/users/google-login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok)
    throw new Error(`error using google login, status: ${response.status}`);

  return response.json();
}

export async function login(email: string, password: string) {
  const payload = { email, password };

  const response = await fetch("https://localhost:8080/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:8080",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok)
    throw new Error(`error loging in, status: ${response.status}`);

  return response.json();
}

export async function register(
  username: string,
  email: string,
  password: string,
) {
  const payload = { email, username, password };

  const response = await fetch("https://localhost:8080/users/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok)
    throw new Error(`error creating user, status: ${response.status}`);

  return response.json();
}

export async function createGame() {
  const response = await fetch("https://localhost:8080/game/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok)
    throw new Error(`error creating game, status: ${response.status}`);

  return response.json();
}
