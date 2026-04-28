import { loadProfile, saveProfile, type UserProfile } from "@/services/db";

type PersistOptions = {
  sync?: boolean;
};

/**
 * Merge a partial profile update into the persisted record so each domain store
 * can save its own slice without importing sibling stores.
 */
export async function persistProfilePatch(
  patch: Partial<UserProfile>,
  _options: PersistOptions = {},
): Promise<UserProfile> {
  const profile = { ...(await loadProfile()), ...patch };
  await saveProfile(profile);

  return profile;
}
