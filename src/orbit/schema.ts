import { Schema } from "@orbit/data";

const schema = new Schema({
  models: {
    todo: {
      attributes: {
        description: { type: "string" },
        completed: { type: "boolean" }
      }
    }
  }
});

export default schema;