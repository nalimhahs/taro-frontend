import { Type } from '@sinclair/typebox';

const discordServer = Type.Object({
	id: Type.String(),
	name: Type.String(),
	channels: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.String()
		})
	)
});

export type DiscordServer = typeof discordServer;
export type DiscordChannel = (typeof discordServer)['channels'][0];
