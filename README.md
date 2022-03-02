**Install**

```
npm install --save @aminoeditor/vue-router-seo
```

**Add to your router**

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

Issues, discussions and PR on github :D
