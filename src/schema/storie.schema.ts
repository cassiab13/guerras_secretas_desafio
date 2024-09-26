import { Schema, model } from 'mongoose'
import { Storie } from '../types/storie.types'

const storieSchema = new Schema(
  {
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    resourceURI: { type: String },
    type: { type: String },
    modified: { type: Date },
    thumbnail: { type: Object },
    comics: [{ type: Schema.Types.ObjectId, ref: "Comic" }],
    series: [{ type: Schema.Types.ObjectId, ref: "Serie" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    creators: [{ type: Schema.Types.ObjectId, ref: "Creator" }],
  },
  {
    timestamps: true,
  }
);

export default model<Storie>('Storie', storieSchema)