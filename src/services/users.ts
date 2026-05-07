import { apiFetch } from "./api";

export type CreateUserPayload = {
  name: string;
  avatar: string;
  ageGroup: "kid" | "teen";
};

export async function createUser(payload: CreateUserPayload): Promise<{ userId: string }> {
  return await apiFetch<{ userId: string }>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
