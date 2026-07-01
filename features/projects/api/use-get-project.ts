/**
 * SHIM: replaces Antonio's Hono/Postgres project fetch with a local type.
 * The design page provides the project object directly (from localStorage or
 * an order), so this file only needs to export the ResponseType shape.
 */
export type Project = {
  id: string;
  name: string;
  json: string;
  width: number;
  height: number;
  thumbnailUrl?: string | null;
  isTemplate?: boolean | null;
  isPro?: boolean | null;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ResponseType = { data: Project };
