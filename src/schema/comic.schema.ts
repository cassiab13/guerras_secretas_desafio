import { Schema, model } from 'mongoose'
import { Comic } from '../types/comic.types'

const comicSchema = new Schema({
    id: { type: Number },
    digitalId: { type: Number },
    title: { type: String },
    issueNumber: { type: Number },
    variantDescription: { type: String },
    description: { type: String },
    modified: { type: Date},
    isbn: { type: String },
    upc: { type: String },
    diamondCode: { type: String },
    ean: { type: String },
    issn: { type: String },
    format: { type: String },
    pageCount: { type: Number },
    resourceURI: { type: String },
    textObjects: [{ type: Object }],
    dates: [{ type: Object }],
    prices: [{ type: Object }],
    thumbnail: { type: Object },
    images: [{ type: Object }],
    creators: [{ type: Schema.Types.ObjectId, ref: "Creator" }],
    characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    stories: [{ type: Schema.Types.ObjectId, ref: "Storie" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  {
    timestamps: true,
  }
);

export default model<Comic>('Comic', comicSchema)