// Object containing sustainable practices for various crops
const sustainablePractices = {
  rice: [
    "Adopt the System of Rice Intensification (SRI) to reduce water usage and increase yields",
    "Use organic fertilizers like cow dung and poultry droppings to enhance soil fertility",
    "Practice Integrated Pest Management (IPM) using neem oil and other biopesticides"
  ],
  maize: [
    "Intercrop with legumes like cowpea to fix nitrogen and improve soil health",
    "Use crop residues as mulch to conserve soil moisture and reduce erosion",
    "Adopt push-pull technology using Desmodium and Napier grass to control Striga and stemborers"
  ],
  chickpea: [
    "Practice crop rotation with cereals to break pest and disease cycles",
    "Use rhizobium inoculants to enhance nitrogen fixation and soil fertility",
    "Adopt Integrated Pest Management (IPM) using neem oil and other biopesticides for pod borer control"
  ],
  kidneybeans: [
    "Intercrop with maize to maximize land use efficiency and improve soil health",
    "Use organic mulch to conserve soil moisture and suppress weeds",
    "Practice hand picking and destruction of pest-infested pods to control pod borers"
  ],
  pigeonpeas: [
    "Intercrop with sorghum or millet to improve soil health and reduce pest pressure",
    "Use bird perches to attract insectivorous birds for natural pest control",
    "Adopt short-duration, disease-resistant varieties to mitigate drought and disease risks"
  ],
  mothbeans: [
    "Practice mixed cropping with pearl millet to improve soil health and reduce pest pressure",
    "Use pheromone traps to monitor and control pod borers",
    "Adopt disease-resistant varieties to mitigate risks from yellow mosaic virus and other diseases"
  ],
  mungbean: [
    "Practice relay cropping with cereals to maximize land use efficiency",
    "Use yellow sticky traps to monitor and control whiteflies and other sucking pests",
    "Adopt short-duration, disease-resistant varieties to mitigate drought and disease risks"
  ],
  blackgram: [
    "Intercrop with sorghum or pearl millet to improve soil health and reduce pest pressure",
    "Use yellow sticky traps to monitor and control whiteflies and other sucking pests",
    "Adopt short-duration, disease-resistant varieties to mitigate drought and disease risks"
  ],
  lentil: [
    "Practice conservation tillage to reduce soil erosion and conserve moisture",
    "Use neem cake and other organic amendments to enhance soil health and fertility",
    "Adopt Integrated Pest Management (IPM) using biopesticides and pheromone traps for pest control"
  ],
  pomegranate: [
    "Use organic mulch like straw or dried leaves to conserve soil moisture and suppress weeds",
    "Practice pruning and training to improve sunlight penetration and air circulation",
    "Adopt Integrated Pest Management (IPM) using sticky traps, biopesticides, and sanitation measures for pest control"
  ],
  banana: [
    "Use tissue culture planting material to ensure disease-free, high-quality plants",
    "Adopt drip irrigation to conserve water and improve nutrient uptake",
    "Practice desuckering and pruning to improve bunch size and quality"
  ],
  mango: [
    "Use organic mulch like straw or dried leaves to conserve soil moisture and suppress weeds",
    "Practice pruning to improve sunlight penetration and air circulation",
    "Adopt Integrated Pest Management (IPM) using sticky traps, biopesticides, and sanitation measures for pest control"
  ],
  grapes: [
    "Use organic mulch like straw or dried leaves to conserve soil moisture and suppress weeds",
    "Practice pruning and training to improve sunlight penetration and air circulation",
    "Adopt Integrated Pest Management (IPM) using sticky traps, biopesticides, and sanitation measures for pest control"
  ],
  watermelon: [
    "Use plastic mulch to conserve soil moisture and suppress weeds",
    "Adopt drip irrigation to conserve water and improve nutrient uptake",
    "Practice Integrated Pest Management (IPM) using sticky traps, biopesticides, and crop rotation for pest and disease control"
  ],
  muskmelon: [
    "Use plastic mulch to conserve soil moisture and suppress weeds",
    "Adopt drip irrigation to conserve water and improve nutrient uptake",
    "Practice Integrated Pest Management (IPM) using sticky traps, biopesticides, and crop rotation for pest and disease control"
  ],
  apple: [
    "Use organic mulch like straw or dried leaves to conserve soil moisture and suppress weeds",
    "Practice pruning and training to improve sunlight penetration and air circulation",
    "Adopt Integrated Pest Management (IPM) using sticky traps, biopesticides, and sanitation measures for pest control"
  ],
  orange: [
    "Use organic mulch like straw or dried leaves to conserve soil moisture and suppress weeds",
    "Practice pruning to improve sunlight penetration and air circulation",
    "Adopt Integrated Pest Management (IPM) using sticky traps, biopesticides, and sanitation measures for pest control"
  ],
  papaya: [
    "Use organic mulch like straw or dried leaves to conserve soil moisture and suppress weeds",
    "Practice desuckering to maintain single-stem growth and improve fruit size",
    "Adopt Integrated Pest Management (IPM) using sticky traps, biopesticides, and sanitation measures for pest control"
  ],
  coconut: [
    "Practice intercropping with legumes to improve soil health and generate additional income",
    "Use organic mulch like coconut husks to conserve soil moisture and suppress weeds",
    "Adopt Integrated Pest Management (IPM) using pheromone traps, biopesticides, and sanitation measures for pest control"
  ],
  cotton: [
    "Practice crop rotation with legumes to improve soil health and break pest and disease cycles",
    "Adopt drip irrigation to conserve water and improve nutrient uptake",
    "Use pheromone traps and biopesticides for Integrated Pest Management (IPM) of bollworms and other pests"
  ],
  jute: [
    "Practice crop rotation with legumes to improve soil health and break pest and disease cycles",
    "Adopt retting in clean water bodies to improve fiber quality and reduce environmental impact",
    "Use biopesticides and cultural practices like early sowing for Integrated Pest Management (IPM) of pests and diseases"
  ],
  coffee: [
    "Practice agroforestry with shade trees to improve soil health and microclimate",
    "Use organic mulch like coffee husks to conserve soil moisture and suppress weeds",
    "Adopt Integrated Pest Management (IPM) using biopesticides, sticky traps, and cultural practices for pest and disease control"
  ]
};

class SustainablePracticesModel {
  // Get sustainable practices for a specific crop
  getPracticesForCrop(crop) {
    return sustainablePractices[crop.toLowerCase()] || [];
  }
  
  // Get a list of all crops
  getAllCrops() {
    return Object.keys(sustainablePractices);
  }
}

module.exports = new SustainablePracticesModel();