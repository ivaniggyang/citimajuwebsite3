import { client } from './client'
import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  SERVICES_PAGE_QUERY,
  PROJECTS_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
} from './queries'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = any

const noStore = { next: { revalidate: 0 } }

export async function getSiteSettings(): Promise<Doc> {
  try { return (await client.fetch(SITE_SETTINGS_QUERY, {}, noStore)) ?? {} } catch { return {} }
}
export async function getHomePage(): Promise<Doc> {
  try { return (await client.fetch(HOME_PAGE_QUERY, {}, noStore)) ?? {} } catch { return {} }
}
export async function getAboutPage(): Promise<Doc> {
  try { return (await client.fetch(ABOUT_PAGE_QUERY, {}, noStore)) ?? {} } catch { return {} }
}
export async function getServicesPage(): Promise<Doc> {
  try { return (await client.fetch(SERVICES_PAGE_QUERY, {}, noStore)) ?? {} } catch { return {} }
}
export async function getProjectsPage(): Promise<Doc> {
  try { return (await client.fetch(PROJECTS_PAGE_QUERY, {}, noStore)) ?? {} } catch { return {} }
}
export async function getContactPage(): Promise<Doc> {
  try { return (await client.fetch(CONTACT_PAGE_QUERY, {}, noStore)) ?? {} } catch { return {} }
}

// Returns the value if non-empty, otherwise the fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function s(value: any, fallback: string): string {
  if (value === undefined || value === null) return fallback
  if (typeof value === 'string' && value.trim() === '') return fallback
  return value
}
