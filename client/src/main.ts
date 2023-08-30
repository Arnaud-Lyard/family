import { createApp, provide, h, onMounted } from "vue";
import "./assets/scss/main.scss";
import App from "./App.vue";
import router from "./router/router";
import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client/core";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCode,
  faHome,
  faUser,
  faEnvelope,
  faBriefcase,
  faArrowRight,
  faPhoneSquare,
  faEnvelopeOpen,
  faMap,
  faRightToBracket,
  faLock,
  faFileLines,
  faUpRightFromSquare,
  faLightbulb,
  faBoltLightning,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  DefaultApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";

library.add(
  faCode,
  faHome,
  faUser,
  faEnvelope,
  faBriefcase,
  faArrowRight,
  faPhoneSquare,
  faEnvelopeOpen,
  faMap,
  faLinkedin,
  faRightToBracket,
  faLock,
  faGithub,
  faFileLines,
  faUpRightFromSquare,
  faLightbulb,
  faBoltLightning
);
const pinia = createPinia();

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  credentials: "include",
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

provideApolloClient(apolloClient);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
