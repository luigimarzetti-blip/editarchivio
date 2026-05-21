export default async (request, context) => {
  const USERNAME = "Edgardo";
  const PASSWORD = "Marea2026!";

  const authHeader = request.headers.get("authorization") || "";
  const expected = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

  if (authHeader !== expected) {
    return new Response("Autenticazione richiesta", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Area riservata"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const url = new URL(request.url);
  const target = "https://editarchivio.netlify.app" + url.pathname + url.search;

  const upstream = await fetch(target, {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });

  return upstream;
};

export const config = {
  path: "/*",
};
