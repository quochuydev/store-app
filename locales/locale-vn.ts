/* eslint-disable import/no-anonymous-default-export */
export default {
  global: {
    siteTitle: "Grocery",
    siteShortName: "A short name",
    twitterHandle: "@example",
  },
  navigation: {
    dropdown: "Menu",
    profile: "Profile",
    logout: "Logout",
    login: "Login",
    register: "Register",
    category: "Danh mục",
    product: "Sản phẩm",
  },
  page: {
    notFound: {
      body: "The page you are looking for does not exist.",
      callToAction: "Return home",
      title: "Not found",
    },
    chat: {
      title: "Chat",
      description: "",
    },
    profile: {
      title: "Profile",
      description: "",
      form: {
        name: {
          label: "Name",
          placeholder: "Jane Doe",
        },
        email: {
          label: "Email",
          placeholder: "test@example.com",
        },
        bio: {
          label: "Bio",
          placeholder: "I am a...",
        },
        callToAction: "SAVE SETTINGS",
        onSuccess: {
          title: "Profile updated",
          message: "Your profile has successfully been updated",
        },
      },
    },
    login: {
      title: "Login",
      description: "",
      heading: "Login with one of the following:",
    },
    register: {
      title: "Register",
      description: "",
    },
    github: {
      title: "Login with GitHub",
      description: "",
      errors: {
        missingCode: "Invalid GitHub code",
      },
    },
    google: {
      title: "Login with Google",
      description: "",
      errors: {
        missingCode: "Invalid Google code",
      },
    },
    reddit: {
      title: "Login with Reddit",
      description: "",
      errors: {
        missingCode: "Invalid Reddit code",
      },
    },
  },
};
