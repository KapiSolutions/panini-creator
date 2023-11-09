import type { SandwichPayload } from "../../src/types/types";

export async function APIRequest(payload: SandwichPayload) {
  const url = "https://training.nerdbord.io/api/v1/panini-creator/order";
  return fetch(url, {
    method: "POST",
    headers: {
      // @ts-ignore
      Authorization: import.meta.env.VITE_API_SECRET,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
