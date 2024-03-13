import { Type } from '@sinclair/typebox';

export const formSchema = Type.Object({
	email: Type.String({
		format: 'email'
	}),
	password: Type.String({
		minLength: 6
	})
});

export type FormSchema = typeof formSchema;
