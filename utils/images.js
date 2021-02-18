const { promisify } = require('util')
const fs = require('fs')
const QS = require('querystring')
const got = require('got')
require('dotenv').config()
const products = require('../static/mock/products.json')

const API_KEY = process.env.PIXABAY_API_KEY

const writeFileAsync = promisify(fs.writeFile)

async function fetchApiImg(searchQuery) {
  try {
    const query = QS.stringify({
      key: API_KEY,
      q: searchQuery,
      per_page: '3',
      image_type: 'photo',
    })
    const resPr = got(`https://pixabay.com/api/?${query}`)
    const json = await resPr.json()
    if (
      json.hits &&
      json.hits.length > 0 &&
      json.hits[0].largeImageURL &&
      json.hits[0].webformatURL
    ) {
      return {
        imgXL: json.hits[0].largeImageURL,
        imgL: json.hits[0].webformatURL,
      }
    } else {
      throw new Error('no image')
    }
  } catch (error) {
    return {
      imgXL: null,
      imgL: null,
    }
  }
}
async function getImagesUrls() {
  let imagesUrlWithId = products.map((product) => {
    const productName = product.pName.split(' ')[0]
    const urls = fetchApiImg(productName)
    return { id: product.id, urls }
  })
  const imagesUrls = await Promise.all(imagesUrlWithId.map((iu) => iu.urls))
  imagesUrlWithId = imagesUrlWithId.map((ob, index) => {
    return {
      id: ob.id,
      urls: imagesUrls[index],
    }
  })
  return imagesUrlWithId
}
async function main() {
  try {
    const imagesUrls = await getImagesUrls()
    await writeFileAsync(
      './static/mock/products-images.json',
      JSON.stringify(imagesUrls),
      { flag: 'w+' }
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
main()
