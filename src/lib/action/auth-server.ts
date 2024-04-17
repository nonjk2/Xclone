const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const url = `${supabaseURL}/rest/v1`;
const fetchUserFromDatabase = async (userId: string): Promise<any> => {
  const query = `userinfo?select=*&user_id=eq.${userId}`;

  try {
    const res = await fetch(`${url}/${query}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
      },
    });
    if (!res.ok) {
      throw new Error("failed", { cause: res.statusText });
    }

    return res.json();
  } catch (error) {
    throw new Error(error as string);
  }
};

export { fetchUserFromDatabase };
