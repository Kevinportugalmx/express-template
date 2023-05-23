import axios, { AxiosResponse } from 'axios'
import fs from 'fs'

const data = []

const fetchData = async (url: string): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get(url)
    data.push(response.data.data)

    fs.writeFileSync('data.json', JSON.stringify(data))

    const paging = response.data.paging
    const next = paging.next

    if (next) {
      await fetchData(next)
    }
  } catch (error) {
    console.error(error.response.data)
  }
}

const bootstrap = async (): Promise<void> => {
  const accessToken = ''
  const liveId = ''
  await fetchData(
    `https://graph.facebook.com/v16.0/${liveId}/comments?access_token=${accessToken}`,
  )
}
bootstrap()
