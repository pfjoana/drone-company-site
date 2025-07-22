import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '5g0pov44',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// Helper function para vídeos
export const getVideoUrl = (videoAsset) => {
  if (!videoAsset) return null
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${videoAsset.asset._ref.replace('file-', '').replace('-mp4', '.mp4')}`
}
