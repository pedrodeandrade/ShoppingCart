async function getVouchers () {
  try {
    const response = await fetch('https://shielded-wildwood-82973.herokuapp.com/vouchers.json')

    const { vouchers: jsonResponse } = await response.json()

    return jsonResponse
  } catch (error) {
    throw new Error('Error fetching vouchers')
  }
}

export {
  getVouchers
}
