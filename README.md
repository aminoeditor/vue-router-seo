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

### Contributing

This project welcomes contributions of all types. Submit PRs, issues, and discussion topics [on GitHub](https://github.com/aminoeditor/vue-router-seo).
