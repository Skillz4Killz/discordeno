import { routes } from '@discordeno/constant'
import type {
  BigString,
  Camelize,
  DiscordInviteMetadata
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import { snakeToCamelCaseNested } from '../../transformer.js'

/**
 * Gets the list of invites for a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to get the invites of.
 * @returns A collection of {@link DiscordInviteMetadata} objects assorted by invite code.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * Only usable for guild channels.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
 */
export async function getChannelInvites (
  rest: RestManager,
  channelId: BigString
): Promise<Collection<string, Camelize<DiscordInviteMetadata>>> {
  const results = await rest.runMethod<DiscordInviteMetadata[]>(
    'GET',
    routes.CHANNEL_INVITES(channelId)
  )

  return new Collection(
    results.map<[string, Camelize<DiscordInviteMetadata>]>((result) => {
      return [result.code, snakeToCamelCaseNested(result)]
    })
  )
}
