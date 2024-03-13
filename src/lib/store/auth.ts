import { persisted } from 'svelte-persisted-store';

// Define the initial state of the store
const initialState = {
	token: '',
	isAuthenticated: false
};

// Create the writable store
export const authStore = persisted('auth', initialState);

// Define actions to update the store
export const login = (token: string) => {
	authStore.update((state) => ({
		...state,
		token,
		isAuthenticated: true
	}));
};

export const logout = () => {
	authStore.update((state) => ({
		...state,
		token: '',
		isAuthenticated: false
	}));
};
