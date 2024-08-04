const catchAsync = require('../utils/catchAsync');

// Get content for the resources page
exports.getResourcesContent = catchAsync(async (req, res, next) => {
  const content = {
    title: "Educational Resources",
    description: "Access valuable farming resources and educational materials to enhance your agricultural knowledge and practices.",
    categories: [
      {
        name: "Soil Management",
        resources: [
          { title: "Understanding Soil pH", link: "https://extension.psu.edu/understanding-soil-ph", description: "Learn about soil pH and its impact on crop growth." },
          { title: "Soil Nutrient Management", link: "https://www.teagasc.ie/media/website/animals/dairy/SoilFertility.pdf", description: "Discover techniques for maintaining optimal soil nutrient levels." },
          { title: "Soil Conservation Practices", link: "https://geopard.tech/blog/why-is-soil-conservation-important/", description: "Explore methods to prevent soil erosion and maintain soil health." }
        ]
      },
      {
        name: "Crop Management",
        resources: [
          { title: "Crop Rotation Basics", link: "https://kg2.com.au/crop-rotation-guide-principles-and-benefits/", description: "Understand the benefits and principles of crop rotation." },
          { title: "Pest Management Strategies", link: "https://eos.com/blog/integrated-pest-management/", description: "Learn about integrated pest management techniques." },
          { title: "Water Conservation in Agriculture", link: "https://vlsci.com/blog/water-conservation-in-agriculture/", description: "Discover ways to efficiently use water in farming." }
        ]
      },
      {
        name: "Sustainable Farming",
        resources: [
          { title: "Introduction to Organic Farming", link: "https://www.organic-africa.net/organic-agriculture/organic-agriculture/conversion-to-organic-agriculture/how-can-i-start-with-organic-farming.html", description: "Learn the basics of organic farming practices." },
          { title: "Agroforestry Techniques", link: "https://www.fao.org/sustainable-forest-management/toolbox/modules/agroforestry/basic-knowledge/en/?type=111", description: "Explore how to integrate trees in agricultural landscapes." },
          { title: "Renewable Energy in Agriculture", link: "https://tracextech.com/renewable-energy-solutions-for-sustainable-farming/", description: "Discover how to use renewable energy sources in farming." }
        ]
      }
    ]
  };
  res.status(200).json({
    status: 'success',
    data: content
  });
});