const seoGuard = async (route, fallbackTitle='') => {
	const nearestWithTitle = route.matched.slice().reverse().find(r => r.meta && r.meta.seo && r.meta.seo.title);
	const nearestWithMeta = route.matched.slice().reverse().find(r => r.meta && r.meta.seo && r.meta.seo.metaTags);
	if( nearestWithTitle ) {
		const { title } = nearestWithTitle.meta.seo;
		if (typeof title === 'function') {
			document.title = await nearestWithTitle.meta.seo.title(to);
		} else {
			document.title = nearestWithTitle.meta.seo.title;
		}
	}
	else { document.title = fallbackTitle; }

	Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
	if ( nearestWithMeta ) {
		nearestWithMeta.meta.seo.metaTags.map(tagDef => {
			const tag = document.createElement('meta');
			Object.keys(tagDef).forEach(async key => {
				if (typeof tagDef[key] === 'function') {
					tag.setAttribute(key, await tagDef[key](to));
				} else {
					tag.setAttribute(key, tagDef[key]);
				}
			});
			tag.setAttribute('data-vue-router-controlled', '');
			return tag;
		}).forEach(tag => document.head.appendChild(tag));
	}
};

const seoGuardWithNext = async (to, from, next, fallbackTitle='') => {
	await seoGuard(to, fallbackTitle);
	next();
}

export { seoGuard, seoGuardWithNext }
