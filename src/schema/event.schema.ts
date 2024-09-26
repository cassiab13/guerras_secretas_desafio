import { Schema, model } from 'mongoose'
import { Event } from '../types/event.types'

const eventSchema = new Schema({
    id: { type: Number },
    title:  { type: String },
    description:  { type: String },
    resourceURI:  { type: String },
    modified: { type: Date },
    start:  { type: Date },
    end:  { type: Date },
    thumbnail: { type: Object },
    comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
    stories: [{ type: Schema.Types.ObjectId, ref: 'Storie' }],
    series: [{ type: Schema.Types.ObjectId, ref: 'Serie' }],
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
    creators: [{ type: Schema.Types.ObjectId, ref: 'Creator' }]
}, {
    timestamps: true
})

export default model<Event>('Event', eventSchema)