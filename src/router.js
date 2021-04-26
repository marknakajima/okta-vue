import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Auth from '@okta/okta-vue';

Vue.use(Auth, {
	issuer       : process.env.VUE_APP_OKTA_ISSUER,
	client_id    : process.env.VUE_APP_OKTA_CLIENT_ID,
	redirect_uri : window.location.origin + '/implicit/callback',
	scope        : 'openid profile email'
});

Vue.use(Router);

let router = new Router({
	mode   : 'history',
	routes : [
		{
			path      : '/implicit/callback',
			component : Auth.handleCallback()
		},
		{
			path      : '/',
			name      : 'Home',
			component : Home,
			icon      : 'mdi-home',
			meta      : {
				requiresAuth : true
			}
		},
		{
			path      : '/about',
			name      : 'About',
			component : About,
			icon      : 'mdi-information-outline',
			meta      : {
				requiresAuth : true
			}
		}
	]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
