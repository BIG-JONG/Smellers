import { NoteType } from "@prisma/client";

export interface PerfumeSearchParams {
  brandName?: string | null;
  perfumeName?: string | null;
  noteType?: NoteType | null;
  noteName?: string | null;
  nickname?: string | null;
}