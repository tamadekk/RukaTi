import supabase from "@/supabase-client";

export type UploadImageOptions = {
  file: File;
  bucket: string;
  folderPath?: string;
  fileNamePrefix?: string;
};

/**
 * Generic helper to upload an image to Supabase Storage.
 * @returns The public URL of the uploaded image.
 */

export async function uploadImage({
  file,
  bucket,
  folderPath,
  fileNamePrefix,
}: UploadImageOptions): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const prefix = fileNamePrefix ? `${fileNamePrefix}-` : "";
  const uniqueName = `${prefix}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const filePath = folderPath ? `${folderPath}/${uniqueName}` : uniqueName;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}
