import { Entry, IEntry } from "../models";
import { isValidObjectId } from 'mongoose';
import { db } from ".";

export const getEntryById = async(id: string): Promise<IEntry | null> => {
    if (!isValidObjectId(id)) return null

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
}

// Milla extra

export const removeEntryById = async(id: string) => {
    if (!isValidObjectId(id)) return null

    await db.connect();
    const entry = await Entry.findByIdAndRemove(id);
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
}