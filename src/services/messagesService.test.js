import { fetchMessages, saveMessage, setMessageAnswered } from './messagesService'
import { requireSupabase } from './supabaseClient'

vi.mock('./supabaseClient', () => ({ requireSupabase: vi.fn() }))

// Mock encadeável do supabase: from(...).insert / .select().order / .update().eq.
// O `table` é sempre o mesmo objeto, para os espiões baterem com os usados no código.
function mockSupabase({ data = [], error = null } = {}) {
  const order = vi.fn().mockResolvedValue({ data, error })
  const eq = vi.fn().mockResolvedValue({ error })
  const table = {
    insert: vi.fn().mockResolvedValue({ error }),
    select: vi.fn(() => ({ order })),
    update: vi.fn(() => ({ eq })),
  }
  const client = { from: vi.fn(() => table) }
  vi.mocked(requireSupabase).mockReturnValue(client)
  return { client, table, order, eq }
}

describe('messagesService', () => {
  beforeEach(() => {
    vi.mocked(requireSupabase).mockReset()
  })

  it('salva a mensagem na tabela messages', async () => {
    const { client, table } = mockSupabase()

    await saveMessage({ name: 'Ana', email: 'ana@email.com', message: 'oi' })

    expect(client.from).toHaveBeenCalledWith('messages')
    expect(table.insert).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@email.com',
      message: 'oi',
    })
  })

  it('lista as mensagens convertidas e ordenadas', async () => {
    const { order } = mockSupabase({
      data: [
        {
          id: '1',
          name: 'Ana',
          email: 'ana@email.com',
          message: 'oi',
          answered: false,
          created_at: '2026-10-30T12:00:00Z',
        },
      ],
    })

    const messages = await fetchMessages()

    expect(order).toHaveBeenCalledWith('created_at', { ascending: false })
    expect(messages[0]).toEqual({
      id: '1',
      name: 'Ana',
      email: 'ana@email.com',
      message: 'oi',
      answered: false,
      createdAt: '2026-10-30T12:00:00Z',
    })
  })

  it('marca a mensagem como respondida', async () => {
    const { table, eq } = mockSupabase()

    await setMessageAnswered('abc', true)

    expect(table.update).toHaveBeenCalledWith({ answered: true })
    expect(eq).toHaveBeenCalledWith('id', 'abc')
  })

  it('propaga erro do supabase', async () => {
    mockSupabase({ error: { message: 'falha RLS' } })

    await expect(saveMessage({ name: 'x', email: 'x@x.com', message: 'y' })).rejects.toThrow(
      'falha RLS',
    )
  })
})
