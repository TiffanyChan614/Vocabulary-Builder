import { createClient } from 'pexels'

const getImage = async (query, num = 1) => {
  const client = createClient(process.env.REACT_APP_PEXELS_API_KEY)
  try {
    const result = await client.photos.search({ query, per_page: num })
    return result.photos
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getImage }
