"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

export const getMovies = async ({ search, page = 1, pageSize = 20 }) => {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("movies").select("*", { count: "exact" });

  if (search) {
    query = query.filter("title", "ilike", `%${search}%`);
  }
  query = query
    .order("popularity", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error("Error getting movies:", error);
    return {
      data: [],
      count: 0,
      error,
    };
  }

  return {
    data,
    count,
    page,
    pageSize,
    hasNextPage: count > page * pageSize,
  };
};
