class HomeModel {
  constructor() {
    // Define static content for the home page
    this.title = "Welcome to CropSage";
    this.mission = "Optimising Crop Selection to Enhance Food Security in Nigeria";
    this.benefits = [
      "Data-driven crop recommendations",
      "Improved agricultural productivity",
      "Sustainable farming practices",
      "Enhanced food security"
    ];
    this.quickLinks = [
      { name: "FAQ", path: "/faq" },
      { name: "Contact Us", path: "/contact" },
      { name: "Log In", path: "/login" },
      { name: "Register", path: "/register" }
    ];
  }

  // Method to retrieve all home page data
  getHomeData() {
    return {
      title: this.title,
      mission: this.mission,
      benefits: this.benefits,
      quickLinks: this.quickLinks
    };
  }
}

module.exports = HomeModel;