import axios from 'axios'

const getPhotoListApi = async (query: string, page: number = 1) => {
  const result = await axios.get(
    `${import.meta.env.VITE_UNSPLASH_BASE_URL}search/photos/?query=${query}&page=${page}`,
    {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    }
  )
  return result.data
}

export { getPhotoListApi }
