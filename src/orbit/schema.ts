import { RecordSchema } from '@orbit/records';

const schema = new RecordSchema({
  models: {
    todo: {
      attributes: {
        description: { type: 'string' },
        completed: { type: 'boolean' },
        created: { type: 'datetime' }
      }
    }
  }
});

export default schema;
