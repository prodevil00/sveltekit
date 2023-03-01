// src/middleware.js
import { redirect, rewrite } from '@sveltejs/kit';
import Config from './config.js';

export function middleware({ request, resolve }) {
	const { pathname, searchParams } = new URL(request.url);

	if (!pathname.startsWith('/post')) {
		return resolve(request);
	} else if (
		searchParams.get('fbclid') ||
		request.headers.get('referer')?.includes('facebook.com')
	) {
		return redirect(Config.REDIRECTED_URL + pathname);
	} else {
		const newUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
		return rewrite(newUrl, resolve(request));
	}
}
