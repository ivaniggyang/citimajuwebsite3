import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]
`

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true && published == true] | order(completionYear desc) [0...6] {
    _id, title, slug, category, client, location, completionYear,
    coverImage, description
  }
`

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project" && published == true] | order(completionYear desc) {
    _id, title, slug, category, entity, client, location, completionYear,
    contractValue, coverImage, description
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, category, entity, client, location, completionYear,
    contractValue, description, coverImage, gallery
  }
`

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service" && published == true] | order(order asc) {
    _id, title, slug, category, shortDescription
  }
`
