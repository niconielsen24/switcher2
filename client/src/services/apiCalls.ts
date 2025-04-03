export async function googleLogin(credential: string) {
  const payload = { idToken: credential };

  const response = await fetch("http://localhost:1816/users/google-login", {
    method: "POST",
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

  const response = await fetch("http://localhost:1816/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

  const response = await fetch("http://localhost:1816/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok)
    throw new Error(`error creating user, status: ${response.status}`);

  return response.json();
}
