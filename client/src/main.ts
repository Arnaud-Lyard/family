import { createApp, provide, h, onMounted } from "vue";
import "./assets/scss/main.scss";
import App from "./App.vue";
import router from "./router/router";
import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { createPinia } from "pinia";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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
  faPen,
  faFloppyDisk,
  faArrowUp,
  faArrowDown,
  faComments,
  faBars,
  faXmark,
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
  faBoltLightning,
  faPen,
  faFloppyDisk,
  faArrowUp,
  faArrowDown,
  faComments,
  faBars,
  faXmark
);

const pinia = createPinia();

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_WEBSOCKET_URL,
  })
);

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  credentials: "include",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

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
  link: splitLink,
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
