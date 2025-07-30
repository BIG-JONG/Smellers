import { NoteType } from "@prisma/client";

//타입변환 -> NoteType(enum)
export const parseNoteType = (value: any): NoteType | null => {
  //1. string인지 확인
  if (typeof value !== 'string') return null;
  //2. 
  if (Object.values(NoteType).includes(value as NoteType)) {
    return value as NoteType;
  }
  return null;
}