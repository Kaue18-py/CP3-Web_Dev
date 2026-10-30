import { fetchFeaturedSlugs, setProjectFeatured } from './featuredService'
import { getSupabase, requireSupabase } from './supabaseClient'

vi.mock('./supabaseClient', () => ({ getSupabase: vi.fn(() => null), requireSupabase: vi.fn() }))

function mockTable({ data = [], error = null } = {}) {
  const eq = vi.fn().mockResolvedValue({ error })
  const table = {
    select: vi.fn().mockResolvedValue({ data, error }),
    insert: vi.fn().mockResolvedValue({ error }),
    delete: vi.fn(() => ({ eq })),
  }
  const fakeClient = { from: vi.fn(() => table) }
  return { fakeClient, table, eq }
}

describe('featuredService', () => {
  afterEach(() => {
    vi.mocked(requireSupabase).mockReset()
    vi.mocked(getSupabase).mockReturnValue(null)
  })

  it('sem Supabase configurado, não há destaques (e não quebra)', async () => {
    expect(await fetchFeaturedSlugs()).toEqual([])
  })

  it('lê os slugs em destaque', async () => {
    const { fakeClient, table } = mockTable({
      data: [{ slug: 'bot-discord' }, { slug: 'crm_leads' }],
    })
    vi.mocked(getSupabase).mockReturnValue(fakeClient)

    expect(await fetchFeaturedSlugs()).toEqual(['bot-discord', 'crm_leads'])
    expect(table.select).toHaveBeenCalledWith('slug')
  })

  it('marca um projeto como destaque', async () => {
    const { fakeClient, table } = mockTable()
    vi.mocked(requireSupabase).mockReturnValue(fakeClient)

    await setProjectFeatured('bot-discord', true)

    expect(fakeClient.from).toHaveBeenCalledWith('featured_projects')
    expect(table.insert).toHaveBeenCalledWith({ slug: 'bot-discord' })
  })

  it('desmarca um projeto do destaque', async () => {
    const { fakeClient, table, eq } = mockTable()
    vi.mocked(requireSupabase).mockReturnValue(fakeClient)

    await setProjectFeatured('bot-discord', false)

    expect(table.delete).toHaveBeenCalled()
    expect(eq).toHaveBeenCalledWith('slug', 'bot-discord')
  })
})
