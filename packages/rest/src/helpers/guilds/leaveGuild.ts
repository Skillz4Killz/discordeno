import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Leaves a guild.
 *
 * @param rest - The rest manager used to make the request
 * @param guildId - The ID of the guild to leave.
 *
 * @remarks
 * Fires a _Guild Delete_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/user#leave-guild}
 */
export async function leaveGuild (
  rest: RestManager,
  guildId: BigString
): Promise<void> {
  return await rest.runMethod<void>(

    'DELETE',
    routes.GUILD_LEAVE(guildId)
  )
}
