const mockSupabase = {
  from: (_table: string) => ({
    select: () => ({
      eq: (_column: string, _value: unknown) =>
        Promise.resolve({ data: [], error: null }),
    }),
    insert: (_data: unknown) => Promise.resolve({ data: _data, error: null }),
    update: (_data: unknown) => ({
      eq: (_column: string, _value: unknown) => Promise.resolve({ error: null }),
    }),
    delete: () => ({
      eq: (_column: string, _value: unknown) => Promise.resolve({ error: null }),
    }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },
};

export default mockSupabase;
