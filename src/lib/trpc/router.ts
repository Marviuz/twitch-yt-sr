import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import { searchVideo, searchVideoSchema } from '../utils/search-video';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
	searchVideo: t.procedure.input(searchVideoSchema).query(({ input }) => {
		return searchVideo(input.query);
	})
});

export type Router = typeof router;
