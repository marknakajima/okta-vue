<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1
                    class="headline mt-5 mb-5 text-uppercase text-center"
                    :class="[$vuetify.breakpoint.mdAndDown ? 'subtitle-1' : '']"
                >
                    About
                </h1>

                <v-card
                    outlined
                    class="pa-4 rounded-lg mx-auto"
                    max-width="540"
                >
                    <v-img src="img-about.png"></v-img>

                    <v-card-text>
                        <p class="mb-6">
                            Welcome to the about page which is also protected.
                            Try logging in/out with the button on the top right
                        </p>

                        <h4 class="mb-6 subtitle-1 text-uppercase text-center">
                            Document links
                        </h4>

                        <v-list>
                            <v-list-item
                                :href="'https://developer.okta.com/'"
                                target="_blank"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="text-center"
                                        >https://developer.okta.com/
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "home",
    components: {},
    async mounted() {},
    data() {
        return {};
    },
    computed: {},
    methods: {},
};
</script>
