import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Deletes an integration attached to a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild from which to delete the integration.
 * @param integrationId - The ID of the integration to delete from the guild.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.
 *
 * Fires a _Guild Integrations Update_ gateway event.
 * Fires a _Integration Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-integration}
 */
export async function deleteIntegration (
  rest: RestManager,
  guildId: BigString,
  integrationId: BigString
): Promise<void> {
  return await rest.runMethod<void>(

    'DELETE',
    routes.GUILD_INTEGRATION(guildId, integrationId)
  )
}
