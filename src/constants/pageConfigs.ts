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
  cookbook: {
    text: "Cookbook",
    href: "/app/cookbook",
  },
  plan: {
    text: "Planner",
    href: "/app/planner",
  },
  lists: {
    text: "Groceries",
    href: "/app/groceries",
  },
};

const otherHrefs: HrefConfigs = {
  createAccount: {
    text: "Your account",
    href: "/app/create-account",
  },
  addMeal: {
    text: "Add meal",
    href: "/app/cookbook/add",
  },
};

export { pageHrefs, authHrefs, appConfigs, otherHrefs };
