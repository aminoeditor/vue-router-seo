const seoGuard = async (route, fallbackTitle='') => {
	const nearestWithTitle = findNearest(route, r => r?.meta?.seo?.title);
	const nearestWithMeta = findNearest(route, r => r?.meta?.seo?.metaTags);
	const nearestWithRichSnippet = findNearest(route, r => r?.meta?.seo?.richSnippet);
	if( nearestWithTitle ) {
		const { title } = nearestWithTitle.meta.seo;
		if (typeof title === 'function') {
			document.title = await Promise.resolve().then(() => nearestWithTitle.meta.seo.title(route));
		} else {
			document.title = nearestWithTitle.meta.seo.title;
		}
	}
	else { document.title = fallbackTitle; }

	Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
	if ( nearestWithMeta ) {
		const { metaTags } = nearestWithMeta.meta.seo;
		let tags = metaTags;
		if (typeof metaTags === 'function') {
			tags = await Promise.resolve().then(() => metaTags());
		}
		tags.map(tagDef => {
			const tag = document.createElement('meta');
			Object.keys(tagDef).forEach(async key => {
				if (typeof tagDef[key] === 'function') {
					tag.setAttribute(key, await tagDef[key](route));
				} else {
					tag.setAttribute(key, tagDef[key]);
				}
			});
			tag.setAttribute('data-vue-router-controlled', '');
			return tag;
		}).forEach(tag => document.head.appendChild(tag));
		}
	}
	if ( nearestWithRichSnippet ) {
		const snippet = JSON.stringify(nearestWithRichSnippet.meta.seo.richSnippet);
		const tag = document.createElement('script');
		tag.setAttribute('type', 'application/ld+json');
		tag.setAttribute('data-vue-router-controlled', '');
		tag.text = snippet;
		document.head.appendChild(tag);
	}
};

const seoGuardWithNext = async (to, from, next, fallbackTitle='') => {
	await seoGuard(to, fallbackTitle);
	next();
}

export { seoGuard, seoGuardWithNext }

function findNearest (route, filter) {
	return route.matched.slice().reverse().find(filter);
}
