import { model, Schema } from "mongoose";
import { Populate } from "../types/populate.types";

const populateSchema = new Schema(
    {
      idSerie: { type: Number, require: true },
      comics: { type: Boolean, default: false },
      characters: { type: Boolean, default: false },
      creators: { type: Boolean, default: false },
      stories: { type: Boolean, default: false },
      events: { type: Boolean, default: false }
    },
    {
      timestamps: true,
    }
);
  
export default model<Populate>('Populate', populateSchema)