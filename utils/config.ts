/* eslint-disable import/no-anonymous-default-export */
export default {
  server: process.env.SERVER_URL,
  title: "Grocery - eCommerce website",
  phoneNumber: "0382986838",
  email: "quochuy.dev@gmail.com",
  address: "Nhat Chi Mai - Q.Tan Binh, TP.HCM, VietNam",
  desciption: "Website development eCommerce",
  company: "quochuydev",
  facebookUrl: "http://instagram.com/#",
  pinterestUrl: "https://www.pinterest.com/#",
  instagramUrl: "http://instagram.com/#",
  linkedinUrl: "https://www.linkedin.com/in/#",
  twitterUrl: "https://twitter.com/#",
  order: {
    //
  },
  authenticate: {
    isLoginLocal: false,
    isLoginGoogle: true,
    isLoginFacebook: false,
    isLoginTwitter: false,
  },
  tickets: false,
  checkin: true,
  shop: {
    brand: "cafe2hdaily",
    logo: "./images/home/logo.png",
  },
  banner: {
    title: "fresh and organic",
    description: "your daily need products",
    url: "#",
    image: "images/home-img.png",
  },
  contents: [
    {
      title: "special offer",
      description: "upto 45% off",
      url: "#",
      image: "images/banner-1.jpg",
    },
    {
      title: "limited offer",
      description: "upto 50% off",
      url: "#",
      image: "images/banner-2.jpg",
    },
  ],
  categories: [
    {
      title: "vegitables",
      description: "upto 50% off",
      url: "#",
      image: "images/category-1.png",
    },
    {
      title: "juice",
      description: "upto 44% off",
      url: "#",
      image: "images/category-2.png",
    },
    {
      title: "meat",
      description: "upto 35% off",
      url: "#",
      image: "images/category-3.png",
    },
    {
      title: "fruite",
      description: "upto 12% off",
      url: "#",
      image: "images/category-4.png",
    },
  ],
  deal: {
    title: "deal of the day",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
    possimus voluptates commodi laudantium! Doloribus sint voluptatibus
    quaerat sequi suscipit nulla?`,
    url: "#",
  },
};
