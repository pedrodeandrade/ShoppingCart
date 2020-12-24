async function getProducts () {
  try {
    const response = await fetch('https://shielded-wildwood-82973.herokuapp.com/products.json')

    const { products: jsonResponse } = await response.json()

    return jsonResponse
  } catch (error) {
    throw new Error('Error fetching products')
  }
}

export {
  getProducts
}
