# Vue-Router + SEO

![Hero image for Vue-Router + SEO](doc/hero.png)

A router guard to add robust SEO functionality to Vue Router. Another handy utility from [Team Amino](https://aminoeditor.com).

### Installing Vue-Router + SEO

```
npm install --save @aminoeditor/vue-router-seo
```

### Router configuration

```
import { seoGuardWithNext } from '@aminoeditor/vue-router-seo';
const routes = [{
	path: '/',
	component: Home,
	meta: {
		seo: {
			title: 'My title here',
			metaTags: [
				{
					name: 'description',
					content: 'My Description here'
				},
				{
					name: 'keywords',
					content: 'some,keywords,here'
				}
			],
			richSnippet: {
				"@context": "https://schema.org",
				"@type": "Project",
				"name": "My Project",
				"url": "https://exampl.com",
				"logo": "https://example.com/images/logo.png",
				"sameAs": [
					"https://twitter.com/example",
					"https://github.com/example"
				]
			}
		}
	}
},{
	path: '/about',
	component: About,
	meta: {
		seo: {
			// do some async stuff for my page title
			title: async route => {
				const data = await fetch('somedataurl');
				return `${data} in my title!`;
			}
		}
	}
}]

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
})

// install the seo route guard here
router.beforeEach(seoGuardWithNext)

const app = Vue.createApp({})
app.use(router)
app.mount('#app')
```

### Available Exports
| name | arguments | context
|--|--|--|--|
| seoGuard | `(route, fallbackTitle='')` | before, after
| seoGuardWithNext | `(to, from, next, fallbackTitle='')` | before

#### Advanced { seoGuard } Examples
the `seoGuard` function is the main source of logic and should be used directly if you already have router guards in your `beforeEach` or if you want to call in `afterEach`

**I already have a `beforeEach` route guard**
```
import { seoGuard } from '@aminoeditor/vue-router-seo';
router.beforeEach((to, from, next) => {
	// you can put code before if you want
	seoGuard(to, 'My Default Title Here');
	// you can put code after if you want
});
```
_WARNING_:  Make sure to call `next()` in your `beforeEach` function otherwise your routes will not load correctly

**I want to run this in `afterEach`**
```
import { seoGuard } from '@aminoeditor/vue-router-seo';
router.afterEach(seoGuard)
```

#### Advanced { seoGuardWithNext } Examples
the `seoGuardWithNext` function is just a convenience wrapper around `seoGuard` that automatically calls next. As such it should not be used in the `afterEach` function.

**I want to pass the fallback title to `seoGuardWithNext`**
```
import { seoGuardWithNext } from '@aminoeditor/vue-router-seo';
router.beforeEach(() => seoGuardWithNext(...arguments, 'My Default Title Here'));
```

### Nested Routes
Often times in more complex sites we use nested routes with layouts at the top level. To improve convenience this library will search all the up the hierarchy and grab the title closest to the active route.

**Example**
```
const title = 'Vue Router + SEO';
const routes = [
	{
		path: '',
		component: MainLayout,
		meta: {
			seo: {
				title
			}
		},
		children: [
			{
				path: '/',
				component: HomeView
			},
			{
				path: '/about-us',
				component: AboutView,
				meta: {
					seo: {
						title: `About Us - ${title}`
					}
				}
			},
			{
				path: '/contact-us',
				component: ContactView,
				meta: {
					seo: {
						title: `Contact Us - ${title}`
					}
				}
			}
		]
	}
]
```
In the above example there is the default title set in the parent component, no title in the `HomeView`, and a custom title in the `AboutView` and `ContactView`. They would render as follows...

| path | title |
| -- | -- |
| / | Vue Router + SEO
| /about-us | About Us - Vue Router + SEO
| /contact-us | Contact Us - Vue Router + SEO

### Contributing

This project welcomes contributions of all types. Submit PRs, issues, and discussion topics [on GitHub](https://github.com/aminoeditor/vue-router-seo).
