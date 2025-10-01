import { currentUser } from "@clerk/nextjs/server";
import { userRepository } from "@/repositories/user.repository";
import { logger } from "@/lib/logger";

/**
 * Asegura que el usuario existe en la base de datos
 * Si no existe, lo sincroniza desde Clerk
 * @param userId - ID del usuario de Clerk
 */
export async function ensureUserExists(userId: string): Promise<void> {
  const dbUser = await userRepository.findById(userId);

  if (!dbUser) {
    logger.debug("User not found in DB, syncing from Clerk", { userId });
    const clerkUser = await currentUser();

    if (clerkUser) {
      await userRepository.upsert(userId, {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName || null,
        lastName: clerkUser.lastName || null,
        imageUrl: clerkUser.imageUrl || null,
      });
      logger.debug("User synced successfully", { userId });
    } else {
      logger.warn("Clerk user not found for sync", { userId });
    }
  }
}