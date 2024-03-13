import { writable, get } from 'svelte/store';
import { authStore } from './auth';
import type { WebSocketMessage } from '$lib/types/socket';
import { WS_URL } from '$lib/config';
import { toast } from 'svelte-sonner';

const initialState: WebSocketMessage[] = [];
export const messageStore = writable(initialState);

export const isConnected = writable(-1);

let socket = new WebSocket(WS_URL);

socket.addEventListener('message', (messageEvent) => {
	processIncomingMessage(JSON.parse(messageEvent.data.toString()));
});

socket.addEventListener('close', () => {
	console.log('Socket Closed :(');
	isConnected.set(-1);
});

export const joinRoom = (room: string) => {
	if (socket.readyState !== 1) {
		toast('Recconecting to server');
		socket = new WebSocket(WS_URL);
	}
	isConnected.set(0);
	flushMessageStore();
	socket.send(JSON.stringify({ t: 'join', d: { token: get(authStore).token, room: room } }));
};

export const leaveRoom = (room: string) => {
	socket.send(JSON.stringify({ t: 'leave', d: { token: get(authStore).token, room: room } }));
};

const processIncomingMessage = (data: WebSocketMessage) => {
	if (data.t === 'status' && data.d.message === 'success' && data.d.action === 'join') {
		isConnected.set(1);
	}
	if (data.t === 'status' && data.d.message === 'success' && data.d.action === 'leave') {
		isConnected.set(-1);
	}
	if (data.t === 'message') {
		messageStore.update((messages) => {
			return [data, ...messages];
		});
	}
};

export const flushMessageStore = () => {
	messageStore.update(() => {
		return [];
	});
};
