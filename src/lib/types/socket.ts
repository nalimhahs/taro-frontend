import { Type, type Static } from '@sinclair/typebox';

const webSocketMessage = Type.Object({
	t: Type.String(), //type
	d: Type.Any() //data
});

export type WebSocketMessage = Static<typeof webSocketMessage>;
