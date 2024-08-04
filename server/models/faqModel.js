class FAQModel {
    constructor() {
      // Define FAQ categories and questions
      this.categories = [
        {
          name: "Account Management",
          questions: [
            {
              question: "How do I create an account?",
              answer: "To create an account, click on the 'Register' button in the top right corner of the homepage. Fill out the required information and submit the form."
            },
            {
              question: "How do I log into my account?",
              answer: "To log into your account, click on the 'Log In' button in the top right corner of the homepage. Fill out the required information and submit the form."
            }
          ]
        },
        {
          name: "Soil Data",
          questions: [
            {
              question: "What soil properties do I need to input for accurate crop recommendations?",
              answer: "To receive the most accurate crop recommendations, please provide data on essential soil properties such as nitrogen (N), phosphorus (P), potassium (K), temperature, humidity, pH, rainfall."
            },
            {
              question: "How often should I input new soil data?",
              answer: "We recommend inputting new soil data at the beginning of each growing season or whenever you notice significant changes in your soil's properties. This will ensure that you receive the most up-to-date and accurate crop recommendations.."
            }
          ]
        },
        {
          name: "Crop Recommendations",
          questions: [
            {
              question: "How are crop recommendations generated?",
              answer: "Our crop recommendation engine analyses the soil data you provide and compares it against optimal growing conditions for various crops. The system then generates personalized recommendations based on your soil's unique properties."
            },
            {
              question: "Can I view past crop recommendations?",
              answer: "Yes, you can access your previous crop recommendations by navigating to the 'Historical Recommendations' page in your account dashboard."
            }
          ]
        },
        {
          name: "Platform Usage",
          questions: [
            {
              question: "Is the platform mobile-friendly?",
              answer: "Yes, CropSage is designed to be fully responsive and works well on desktop computers, tablets, and smartphones."
            },
            {
              question: "How can I contact support?",
              answer: "You can reach our support team by filling out the form on the 'Contact' page."
            }
          ]
        }
      ];
    }

    // Get all FAQ data
    getFAQData() {
      return this.categories;
    }
  
    // Get a specific category by name (case-insensitive)
    getCategoryByName(categoryName) {
      return this.categories.find(category => category.name.toLowerCase() === categoryName.toLowerCase());
    }
  }
  
  module.exports = FAQModel;