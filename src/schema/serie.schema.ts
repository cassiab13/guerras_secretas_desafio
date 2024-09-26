import { Schema, model } from 'mongoose'
import { Serie } from '../types/serie.types'

const serieSchema = new Schema(
  {
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    resourceURI: { type: String },
    startYear: { type: Number },
    endYear: { type: Number },
    rating: { type: String },
    modified: { type: Date },
    thumbnail: { type: Object },
    comics: [{ type: Schema.Types.ObjectId, ref: "Comic" }],
    stories: [{ type: Schema.Types.ObjectId, ref: "Storie" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    creators: [{ type: Schema.Types.ObjectId, ref: "Creator" }]
  },
  {
    timestamps: true,
  }
);

export default model<Serie>('Serie', serieSchema)