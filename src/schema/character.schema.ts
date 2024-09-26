import { Character } from './../types/character.types';
import { Schema, model } from 'mongoose'

const characterSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String },
    description: { type: String },
    modified: { type: Date },
    resourceURI: { type: String },
    thumbnail: { type: Object },
    comics: [{ type: Schema.Types.ObjectId, ref: "Comic", required: true }],
    stories: [{ type: Schema.Types.ObjectId, ref: "Storie", required: true }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event", required: true }],
    series: [{ type: Schema.Types.ObjectId, ref: "Serie", required: true }],
  },
  {
    timestamps: true,
  }
);

export default model<Character>('Character', characterSchema)