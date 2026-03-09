const mockSupabase = {
  from: (table: string) => ({
    select: () => ({
      eq: (column: string, value: any) =>
        Promise.resolve({ data: [], error: null }),
    }),
    insert: (data: any) => Promise.resolve({ data, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ error: null }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ error: null }),
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
