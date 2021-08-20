const faker = require('faker');
const axios = require('axios');
const uuid = require('uuid');

const numRandom = 10;

const genders = ['Male', 'Female'];
const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL'];
const seasons = ['Winter', 'Sprint', 'Summer', 'Autumn'];

const uniqueCategories = new Set(Array.from({ length: numRandom }, () => faker.commerce.department()));
const uniqueBrands = new Set(Array.from({ length: numRandom }, () => faker.company.companyName()));
const uniqueMaterials = new Set(Array.from({ length: numRandom }, () => faker.commerce.productMaterial()));
const uniqueColors = new Set(Array.from({ length: numRandom }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`));

const filters = {
  gender: {
    name: "Gender",
    type: "default",
    list: genders.map(item => ({ id: uuid.v4(), name: item }))
  },
  category: {
    name: "Category",
    type: "default",
    list: [...uniqueCategories.keys()].map(item => ({ id: uuid.v4(), name: item }))
  },
  size: {
    name: "Size",
    type: "default",
    list: sizes.map(item => ({ id: uuid.v4(), name: item }))
  },
  brand: {
    name: "Brand",
    type: "default",
    list: [...uniqueBrands.keys()].map(item => ({ id: uuid.v4(), name: item }))
  },
  season: {
    name: "Season",
    type: "default",
    list: [...seasons].map(item => ({ id: uuid.v4(), name: item }))
  },
  material: {
    name: "Material",
    type: "default",
    list: [...uniqueMaterials.keys()].map(item => ({ id: uuid.v4(), name: item }))
  },
  color: {
    name: "Color",
    type: "color",
    list: [...uniqueColors.keys()].map(item => ({ id: uuid.v4(), name: item }))
  }
};

// console.log(Object.values(filters))

const generateProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.imageUrl(300, 300, 'fashion', true),
    price: Number(faker.commerce.price(50, 500, 0)),
    sale: faker.datatype.boolean(),
    gender: faker.helpers.randomize(filters.gender.list).id,
    category: faker.helpers.randomize(filters.category.list).id,
    size: faker.helpers.randomize(filters.size.list).id,
    brand: faker.helpers.randomize(filters.brand.list).id,
    material: faker.helpers.randomize(filters.material.list).id,
    season: faker.helpers.randomize(filters.season.list).id,
    color: faker.helpers.randomize(filters.category.list).id
  }
}

const products = Array.from({ length: 200 }, () => generateProduct())

for (let product of products) {
  axios.post('http://localhost:5000/products', {
    ...product
  })
    .then(() => console.log(`product ${product.name} added`))
}

for (let filter of Object.values(filters)) {
  axios.post('http://localhost:5000/filters', {
    ...filter
  })
    .then(() => console.log(`filter ${filter.name} added`))
}

// console.log(products)