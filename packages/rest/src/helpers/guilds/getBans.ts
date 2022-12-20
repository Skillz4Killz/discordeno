import { routes } from '@discordeno/constant'
import type { BigString, DiscordBan, GetBans } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Ban } from './getBan.js'

/**
 * Gets the list of bans for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of bans for.
 * @param options - The parameters for the fetching of the list of bans.
 * @returns A collection of {@link Ban} objects assorted by user ID.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Users are ordered by their IDs in _ascending_ order.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-bans}
 */
export async function getBans (
  rest: RestManager,
  guildId: BigString,
  options?: GetBans
): Promise<Collection<bigint, Ban>> {
  const results = await rest.runMethod<DiscordBan[]>(

    'GET',
    routes.GUILD_BANS(guildId, options)
  )

  return new Collection(
    results.map<[bigint, Ban]>((result) => {
      const user = rest.transformers.user(rest, result.user)
      return [
        user.id,
        {
          reason: result.reason ?? undefined,
          user
        }
      ]
    })
  )
}
