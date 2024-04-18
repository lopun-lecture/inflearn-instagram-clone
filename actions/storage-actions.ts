"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

const handleError = (error: any) => {
  if (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file");
  }
};

export const handleFileUploadForm = async (formData: FormData) => {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;
  const { data, error } = await supabase.storage
    .from("public_images")
    .upload(file.name, file, { upsert: true });

  handleError(error);

  return data;
};

export const searchImages = async ({ search }) => {
  const supabase = await createServerSupabaseClient();
  let query: any = supabase.storage.from("public_images");

  if (search && search != "") {
    query = query.list(null, {
      search,
      sortBy: { column: "created_at", order: "asc" },
    });
  } else {
    query = query.list();
  }

  const { data, error } = await query;

  handleError(error);
  return data;
};

export const deleteImage = async (imageName: string) => {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.storage
    .from("public_images")
    .remove([imageName]);

  handleError(error);
};
