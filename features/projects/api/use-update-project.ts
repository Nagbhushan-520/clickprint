/**
 * SHIM: replaces Antonio's Postgres project update with localStorage autosave.
 * Matches the { mutate } interface the Editor expects.
 */
"use client";

import { useCallback } from "react";

export const AUTOSAVE_KEY = "clickprint_editor_project";

export type UpdateValues = {
  json?: string;
  height?: number;
  width?: number;
  name?: string;
};

export const useUpdateProject = (id: string) => {
  const mutate = useCallback(
    (values: UpdateValues) => {
      if (typeof window === "undefined") return;
      try {
        const raw = window.localStorage.getItem(AUTOSAVE_KEY);
        const prev = raw ? JSON.parse(raw) : { id };
        const next = { ...prev, id, ...values, updatedAt: new Date().toISOString() };
        window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(next));
      } catch {
        // storage full or unavailable — ignore, autosave is best-effort
      }
    },
    [id],
  );

  // Editor only reads `mutate`; the rest mirror react-query's mutation shape.
  return { mutate, isPending: false, isError: false, isSuccess: true };
};
