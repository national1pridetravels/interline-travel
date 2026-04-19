'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'

type AdminUser = {
  id: string
  email: string
  role: string
}

type SiteConfig = {
  brandName: string
  brandTagline: string
  phone: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
}

type DestinationFormData = {
  id?: string
  slug: string
  name: string
  season: string
  tagline: string
  shortDescription: string
  description: string
  bestSeason: string
  idealFor: string
  altitude: string
  travelTime: string
  heroImage: string
  category: string
  highlights: string
  attractions: string
  isFeatured: boolean
  isHighlight: boolean
}

type PackageFormData = {
  id?: string
  slug: string
  title: string
  duration: string
  priceFrom: string
  image: string
  season: string
  tags: string
  summary: string
  idealFor: string
  includes: string
}

type Notice = {
  type: 'success' | 'error'
  text: string
}

const tabs = ['config', 'destinations', 'packages'] as const
type AdminTab = (typeof tabs)[number]

const emptyDestination: DestinationFormData = {
  slug: '',
  name: '',
  season: 'Summer',
  tagline: '',
  shortDescription: '',
  description: '',
  bestSeason: '',
  idealFor: '',
  altitude: '',
  travelTime: '',
  heroImage: '',
  category: 'Mountain Escapes',
  highlights: '',
  attractions: '',
  isFeatured: false,
  isHighlight: false,
}

const emptyPackage: PackageFormData = {
  slug: '',
  title: '',
  duration: '',
  priceFrom: '',
  image: '',
  season: 'all-season',
  tags: '',
  summary: '',
  idealFor: '',
  includes: '',
}

const emptyConfig: SiteConfig = {
  brandName: '',
  brandTagline: '',
  phone: '',
  heroEyebrow: '',
  heroTitle: '',
  heroSubtitle: '',
}

function toCommaSeparated(value: unknown) {
  if (!Array.isArray(value)) {
    return ''
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .join(', ')
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function AdminPage() {
  const [sessionLoading, setSessionLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>('config')
  const [user, setUser] = useState<AdminUser | null>(null)
  const [notice, setNotice] = useState<Notice | null>(null)

  const [loginEmail, setLoginEmail] = useState('admin@nationalpride.com')
  const [loginPassword, setLoginPassword] = useState('admin123')

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(emptyConfig)
  const [destinations, setDestinations] = useState<DestinationFormData[]>([])
  const [packages, setPackages] = useState<PackageFormData[]>([])

  const [destinationForm, setDestinationForm] = useState<DestinationFormData>(emptyDestination)
  const [packageForm, setPackageForm] = useState<PackageFormData>(emptyPackage)

  const loadDashboardData = useCallback(async () => {
    setDataLoading(true)
    try {
      const [configRes, destinationsRes, packagesRes] = await Promise.all([
        fetch('/api/admin/config', { cache: 'no-store' }),
        fetch('/api/admin/destinations', { cache: 'no-store' }),
        fetch('/api/admin/packages', { cache: 'no-store' }),
      ])

      if (configRes.ok) {
        const payload = (await configRes.json()) as {
          success: boolean
          config?: SiteConfig
        }
        if (payload.success && payload.config) {
          setSiteConfig(payload.config)
        }
      }

      if (destinationsRes.ok) {
        const payload = (await destinationsRes.json()) as {
          success: boolean
          destinations?: Array<Omit<DestinationFormData, 'highlights' | 'attractions'> & {
            highlights: string[]
            attractions: string[]
          }>
        }
        if (payload.success && Array.isArray(payload.destinations)) {
          const mapped = payload.destinations.map((entry) => ({
            ...entry,
            highlights: toCommaSeparated(entry.highlights),
            attractions: toCommaSeparated(entry.attractions),
          }))
          setDestinations(mapped)
        }
      }

      if (packagesRes.ok) {
        const payload = (await packagesRes.json()) as {
          success: boolean
          packages?: Array<Omit<PackageFormData, 'tags' | 'includes'> & {
            tags: string[]
            includes: string[] | null
          }>
        }
        if (payload.success && Array.isArray(payload.packages)) {
          const mapped = payload.packages.map((entry) => ({
            ...entry,
            summary: entry.summary || '',
            idealFor: entry.idealFor || '',
            tags: toCommaSeparated(entry.tags),
            includes: toCommaSeparated(entry.includes),
          }))
          setPackages(mapped)
        }
      }
    } catch (error) {
      console.error('Load dashboard data failed', error)
      setNotice({
        type: 'error',
        text: 'Failed to load admin data.',
      })
    } finally {
      setDataLoading(false)
    }
  }, [])

  const checkSession = useCallback(async () => {
    setSessionLoading(true)
    try {
      const response = await fetch('/api/admin/auth/session', {
        cache: 'no-store',
      })
      const payload = (await response.json()) as {
        authenticated: boolean
        user?: AdminUser
      }
      if (payload.authenticated && payload.user) {
        setUser(payload.user)
        await loadDashboardData()
      }
    } catch (error) {
      console.error('Admin session check failed', error)
    } finally {
      setSessionLoading(false)
    }
  }, [loadDashboardData])

  useEffect(() => {
    void checkSession()
  }, [checkSession])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthLoading(true)
    setNotice(null)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const payload = (await response.json()) as {
        success: boolean
        message?: string
        user?: AdminUser
      }

      if (!response.ok || !payload.success || !payload.user) {
        setNotice({
          type: 'error',
          text: payload.message || 'Login failed.',
        })
        return
      }

      setUser(payload.user)
      setNotice({
        type: 'success',
        text: 'Logged in successfully.',
      })
      await loadDashboardData()
    } catch (error) {
      console.error('Login failed', error)
      setNotice({
        type: 'error',
        text: 'Login request failed.',
      })
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleLogout() {
    setAuthLoading(true)
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      setUser(null)
      setSiteConfig(emptyConfig)
      setDestinations([])
      setPackages([])
      setDestinationForm(emptyDestination)
      setPackageForm(emptyPackage)
      setNotice({
        type: 'success',
        text: 'Logged out.',
      })
    } catch (error) {
      console.error('Logout failed', error)
      setNotice({
        type: 'error',
        text: 'Logout failed.',
      })
    } finally {
      setAuthLoading(false)
    }
  }

  async function saveSiteConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setNotice(null)

    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteConfig),
      })
      const payload = (await response.json()) as {
        success: boolean
        message?: string
        config?: SiteConfig
      }

      if (!response.ok || !payload.success || !payload.config) {
        setNotice({
          type: 'error',
          text: payload.message || 'Failed to save site config.',
        })
        return
      }

      setSiteConfig(payload.config)
      setNotice({
        type: 'success',
        text: 'Site config updated.',
      })
    } catch (error) {
      console.error('Save site config failed', error)
      setNotice({
        type: 'error',
        text: 'Failed to save site config.',
      })
    } finally {
      setSaving(false)
    }
  }

  function editDestination(entry: DestinationFormData) {
    setDestinationForm(entry)
    setActiveTab('destinations')
    setNotice(null)
  }

  async function submitDestination(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setNotice(null)

    const isEditing = Boolean(destinationForm.id)
    const endpoint = isEditing
      ? `/api/admin/destinations/${destinationForm.id}`
      : '/api/admin/destinations'

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...destinationForm,
          slug: slugify(destinationForm.slug || destinationForm.name),
        }),
      })

      const payload = (await response.json()) as {
        success: boolean
        message?: string
      }

      if (!response.ok || !payload.success) {
        setNotice({
          type: 'error',
          text: payload.message || 'Failed to save destination.',
        })
        return
      }

      await loadDashboardData()
      setDestinationForm(emptyDestination)
      setNotice({
        type: 'success',
        text: isEditing ? 'Destination updated.' : 'Destination created.',
      })
    } catch (error) {
      console.error('Save destination failed', error)
      setNotice({
        type: 'error',
        text: 'Failed to save destination.',
      })
    } finally {
      setSaving(false)
    }
  }

  async function deleteDestination(id?: string) {
    if (!id) return
    const confirmed = window.confirm('Delete this destination?')
    if (!confirmed) return

    setSaving(true)
    setNotice(null)
    try {
      const response = await fetch(`/api/admin/destinations/${id}`, {
        method: 'DELETE',
      })
      const payload = (await response.json()) as {
        success: boolean
        message?: string
      }

      if (!response.ok || !payload.success) {
        setNotice({
          type: 'error',
          text: payload.message || 'Failed to delete destination.',
        })
        return
      }

      await loadDashboardData()
      if (destinationForm.id === id) {
        setDestinationForm(emptyDestination)
      }
      setNotice({
        type: 'success',
        text: 'Destination deleted.',
      })
    } catch (error) {
      console.error('Delete destination failed', error)
      setNotice({
        type: 'error',
        text: 'Failed to delete destination.',
      })
    } finally {
      setSaving(false)
    }
  }

  function editPackage(entry: PackageFormData) {
    setPackageForm(entry)
    setActiveTab('packages')
    setNotice(null)
  }

  async function submitPackage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setNotice(null)

    const isEditing = Boolean(packageForm.id)
    const endpoint = isEditing ? `/api/admin/packages/${packageForm.id}` : '/api/admin/packages'

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...packageForm,
          slug: slugify(packageForm.slug || packageForm.title),
        }),
      })

      const payload = (await response.json()) as {
        success: boolean
        message?: string
      }

      if (!response.ok || !payload.success) {
        setNotice({
          type: 'error',
          text: payload.message || 'Failed to save package.',
        })
        return
      }

      await loadDashboardData()
      setPackageForm(emptyPackage)
      setNotice({
        type: 'success',
        text: isEditing ? 'Package updated.' : 'Package created.',
      })
    } catch (error) {
      console.error('Save package failed', error)
      setNotice({
        type: 'error',
        text: 'Failed to save package.',
      })
    } finally {
      setSaving(false)
    }
  }

  async function deletePackage(id?: string) {
    if (!id) return
    const confirmed = window.confirm('Delete this package?')
    if (!confirmed) return

    setSaving(true)
    setNotice(null)
    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE',
      })
      const payload = (await response.json()) as {
        success: boolean
        message?: string
      }

      if (!response.ok || !payload.success) {
        setNotice({
          type: 'error',
          text: payload.message || 'Failed to delete package.',
        })
        return
      }

      await loadDashboardData()
      if (packageForm.id === id) {
        setPackageForm(emptyPackage)
      }
      setNotice({
        type: 'success',
        text: 'Package deleted.',
      })
    } catch (error) {
      console.error('Delete package failed', error)
      setNotice({
        type: 'error',
        text: 'Failed to delete package.',
      })
    } finally {
      setSaving(false)
    }
  }

  if (sessionLoading) {
    return (
      <main className="min-h-screen bg-slate-100 py-24 px-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
          <p className="text-slate-700">Checking admin session...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 py-24 px-6">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h1>
          <p className="text-slate-600 mb-6">
            Sign in with full-access admin credentials.
          </p>

          {notice && (
            <div
              className={`mb-4 rounded-lg px-4 py-3 text-sm ${
                notice.type === 'success'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {notice.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
              <input
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                type="email"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
              <input
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                type="password"
                required
              />
            </label>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white font-semibold disabled:opacity-60"
            >
              {authLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 py-24 px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel</h1>
              <p className="text-slate-600 mt-1">
                Logged in as <span className="font-semibold">{user.email}</span> ({user.role})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => void loadDashboardData()}
                disabled={dataLoading || saving}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60"
              >
                {dataLoading ? 'Refreshing...' : 'Refresh Data'}
              </button>
              <button
                onClick={() => void handleLogout()}
                disabled={authLoading}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {notice && (
          <section
            className={`rounded-2xl px-5 py-4 text-sm font-medium ${
              notice.type === 'success'
                ? 'bg-red-50 text-red-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {notice.text}
          </section>
        )}

        <section className="rounded-2xl bg-white p-4 shadow">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab === 'config'
                  ? 'Site Config'
                  : tab === 'destinations'
                    ? 'Destinations'
                    : 'Packages'}
              </button>
            ))}
          </div>
        </section>

        {activeTab === 'config' && (
          <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Site Settings</h2>
            <form className="space-y-4" onSubmit={saveSiteConfig}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Brand Name</span>
                  <input
                    value={siteConfig.brandName}
                    onChange={(event) =>
                      setSiteConfig((prev) => ({ ...prev, brandName: event.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Brand Tagline</span>
                  <input
                    value={siteConfig.brandTagline}
                    onChange={(event) =>
                      setSiteConfig((prev) => ({ ...prev, brandTagline: event.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Phone</span>
                  <input
                    value={siteConfig.phone}
                    onChange={(event) =>
                      setSiteConfig((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Hero Eyebrow</span>
                  <input
                    value={siteConfig.heroEyebrow}
                    onChange={(event) =>
                      setSiteConfig((prev) => ({ ...prev, heroEyebrow: event.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Hero Title</span>
                <input
                  value={siteConfig.heroTitle}
                  onChange={(event) =>
                    setSiteConfig((prev) => ({ ...prev, heroTitle: event.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Hero Subtitle</span>
                <textarea
                  value={siteConfig.heroSubtitle}
                  onChange={(event) =>
                    setSiteConfig((prev) => ({ ...prev, heroSubtitle: event.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[100px]"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-white font-semibold disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </section>
        )}

        {activeTab === 'destinations' && (
          <section className="rounded-2xl bg-white p-6 shadow space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Destination Manager</h2>
              <button
                onClick={() => setDestinationForm(emptyDestination)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                New Destination
              </button>
            </div>

            <form className="space-y-4 rounded-xl border border-slate-200 p-4" onSubmit={submitDestination}>
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  value={destinationForm.slug}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, slug: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="slug"
                  required
                />
                <input
                  value={destinationForm.name}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="name"
                  required
                />
                <select
                  value={destinationForm.season}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, season: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Autumn</option>
                  <option>All Season</option>
                </select>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={destinationForm.tagline}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, tagline: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="tagline"
                  required
                />
                <input
                  value={destinationForm.bestSeason}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, bestSeason: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="best season"
                  required
                />
                <input
                  value={destinationForm.idealFor}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, idealFor: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="ideal for"
                  required
                />
                <input
                  value={destinationForm.category}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, category: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="category"
                  required
                />
                <input
                  value={destinationForm.altitude}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, altitude: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="altitude"
                  required
                />
                <input
                  value={destinationForm.travelTime}
                  onChange={(event) =>
                    setDestinationForm((prev) => ({ ...prev, travelTime: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="travel time"
                  required
                />
              </div>
              <input
                value={destinationForm.heroImage}
                onChange={(event) =>
                  setDestinationForm((prev) => ({ ...prev, heroImage: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="hero image URL/path"
                required
              />
              <textarea
                value={destinationForm.shortDescription}
                onChange={(event) =>
                  setDestinationForm((prev) => ({
                    ...prev,
                    shortDescription: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[70px]"
                placeholder="short description"
                required
              />
              <textarea
                value={destinationForm.description}
                onChange={(event) =>
                  setDestinationForm((prev) => ({ ...prev, description: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[90px]"
                placeholder="full description"
                required
              />
              <input
                value={destinationForm.highlights}
                onChange={(event) =>
                  setDestinationForm((prev) => ({ ...prev, highlights: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="highlights (comma separated)"
                required
              />
              <input
                value={destinationForm.attractions}
                onChange={(event) =>
                  setDestinationForm((prev) => ({ ...prev, attractions: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="attractions (comma separated)"
                required
              />
              <div className="flex flex-wrap items-center gap-5">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={destinationForm.isFeatured}
                    onChange={(event) =>
                      setDestinationForm((prev) => ({
                        ...prev,
                        isFeatured: event.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm text-slate-700">Featured</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={destinationForm.isHighlight}
                    onChange={(event) =>
                      setDestinationForm((prev) => ({
                        ...prev,
                        isHighlight: event.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm text-slate-700">Highlight</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-white font-semibold disabled:opacity-60"
              >
                {saving
                  ? 'Saving...'
                  : destinationForm.id
                    ? 'Update Destination'
                    : 'Create Destination'}
              </button>
            </form>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Season</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((entry) => (
                    <tr key={entry.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">{entry.name}</td>
                      <td className="px-4 py-3">{entry.season}</td>
                      <td className="px-4 py-3">{entry.category}</td>
                      <td className="px-4 py-3">{entry.slug}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editDestination(entry)}
                            className="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => void deleteDestination(entry.id)}
                            className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'packages' && (
          <section className="rounded-2xl bg-white p-6 shadow space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Package Manager</h2>
              <button
                onClick={() => setPackageForm(emptyPackage)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                New Package
              </button>
            </div>

            <form className="space-y-4 rounded-xl border border-slate-200 p-4" onSubmit={submitPackage}>
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  value={packageForm.slug}
                  onChange={(event) =>
                    setPackageForm((prev) => ({ ...prev, slug: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="slug"
                  required
                />
                <input
                  value={packageForm.title}
                  onChange={(event) =>
                    setPackageForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="title"
                  required
                />
                <input
                  value={packageForm.season}
                  onChange={(event) =>
                    setPackageForm((prev) => ({ ...prev, season: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="season tag (winter/spring/...)"
                  required
                />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  value={packageForm.duration}
                  onChange={(event) =>
                    setPackageForm((prev) => ({ ...prev, duration: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="duration"
                  required
                />
                <input
                  value={packageForm.priceFrom}
                  onChange={(event) =>
                    setPackageForm((prev) => ({ ...prev, priceFrom: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="price"
                  required
                />
                <input
                  value={packageForm.image}
                  onChange={(event) =>
                    setPackageForm((prev) => ({ ...prev, image: event.target.value }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="image URL/path"
                  required
                />
              </div>
              <input
                value={packageForm.tags}
                onChange={(event) =>
                  setPackageForm((prev) => ({ ...prev, tags: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="tags (comma separated)"
                required
              />
              <input
                value={packageForm.idealFor}
                onChange={(event) =>
                  setPackageForm((prev) => ({ ...prev, idealFor: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="ideal for"
              />
              <textarea
                value={packageForm.summary}
                onChange={(event) =>
                  setPackageForm((prev) => ({ ...prev, summary: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[90px]"
                placeholder="summary"
              />
              <input
                value={packageForm.includes}
                onChange={(event) =>
                  setPackageForm((prev) => ({ ...prev, includes: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="includes (comma separated)"
              />
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-white font-semibold disabled:opacity-60"
              >
                {saving
                  ? 'Saving...'
                  : packageForm.id
                    ? 'Update Package'
                    : 'Create Package'}
              </button>
            </form>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Season</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((entry) => (
                    <tr key={entry.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">{entry.title}</td>
                      <td className="px-4 py-3">{entry.season}</td>
                      <td className="px-4 py-3">{entry.priceFrom}</td>
                      <td className="px-4 py-3">{entry.slug}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editPackage(entry)}
                            className="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => void deletePackage(entry.id)}
                            className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
