type HrefConfigs = Record<string, Record<"href" | "text", string>>;

const appConfigs = {
  title: "Din Dins",
  description: "Planning your meals made easy!",
  href: "/",
};

const pageHrefs: HrefConfigs = {
  home: { href: "/", text: "Home" },
  login: {
    href: "/app",
    text: "Log in",
  },
  signup: {
    text: "Get started",
    href: "/login",
  },
  learnMore: {
    text: "Learn more",
    href: "/learn-more",
  },
  feedback: {
    text: "Feedback",
    href: "/give-us-feedback",
  },
};

const authHrefs: HrefConfigs = {
  home: {
    href: "/app",
    text: "Home",
  },
  settings: {
    href: "/app/settings",
    text: "Settings",
  },
  menu: {
    text: "Menu",
    href: "/app/menu",
  },
  plan: {
    text: "Plan",
    href: "/app/plan",
  },
  lists: {
    text: "Lists",
    href: "/app/lists",
  },
};

export { pageHrefs, authHrefs, appConfigs };
