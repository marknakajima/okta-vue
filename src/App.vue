<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list class="mt-5">
                <v-list-item-group
                    color="primary"
                    v-for="route in this.$router.options.routes"
                    :key="route.name"
                >
                    <v-list-item v-if="route.name" :to="{ path: route.path }">
                        <v-list-item-icon>
                            <v-icon v-text="route.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="route.name"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
            color="#ffffff"
            elevation="4"
        >
            <v-app-bar-nav-icon
                :class="{ 'mr-5': isMounted && $vuetify.breakpoint.mdAndUp }"
                @click.stop="drawer = !drawer"
            />
            <v-spacer class="d-lg-none" />
            <router-link to="/" style="text-decoration: none"
                ><span
                    class="font-weight-bold text-uppercase display-1"
                    :class="{
                        '': isMounted && $vuetify.breakpoint.xsAndDown,
                        '': isMounted && $vuetify.breakpoint.mdAndUp,
                    }"
                >
                    Okta Vue
                </span></router-link
            >
            <span class="ml-8 d-none d-lg-flex caption"
                >Auth protection for Vue example</span
            >
            <v-spacer />

            <v-btn
                v-if="!activeUser"
                v-bind="buttonSize"
                color="primary white--text"
                depressed
                href="#"
                @click.prevent="login"
                >login</v-btn
            >
            <v-btn
                v-else
                v-bind="buttonSize"
                color="grey white--text"
                depressed
                href="#"
                @click.prevent="logout"
                >logout</v-btn
            >
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-fade-transition mode="out-in">
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-main>

        <v-footer></v-footer>
    </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            activeUser: null,
            isMounted: false,
            clipped: true,
            drawer: this.$vuetify.breakpoint.lgAndUp,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
        };
    },
    components: {},
    mounted() {
        // https://stackoverflow.com/questions/50991071/vuetify-breakpoints-not-working-in-nuxt-js
        // use this hack to move logo to the left to center it on page load
        this.isMounted = true;
    },
    computed: {
        buttonSize() {
            const size = {
                xs: "x-small",
                sm: "small",
                md: "small",
                lg: "small",
                xl: "small",
            }[this.$vuetify.breakpoint.name];
            return size ? { [size]: true } : {};
        },
    },
    watch: {
        $route: "refreshActiveUser",
    },
    methods: {
        login() {
            this.$auth.loginRedirect();
        },
        async refreshActiveUser() {
            this.activeUser = await this.$auth.getUser();

            try {
                let accessToken = await this.$auth.getAccessToken();
                this.$store.dispatch("loadAuthToken", accessToken);
            } catch (e) {
                console.log(`error at refreshActiveUser with error ${e}`);
            }
        },
        async logout() {
            await this.$auth.logout();
            await this.refreshActiveUser();
            location.reload(); // Refresh the page when user signs out so they have to login again
        },
    },
};
</script>

<style lang="scss" >
body {
    background-color: #edf2f9;
}
</style>