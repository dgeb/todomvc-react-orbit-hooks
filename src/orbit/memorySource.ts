import { MemorySource } from '@orbit/memory';
import schema from './schema';

const memorySource = new MemorySource({ schema });

// Init state
memorySource.cache.patch((t) => [
  t.addRecord({
    type: 'todo',
    id: schema.generateId(),
    attributes: { description: 'a', completed: false, created: Date.now() }
  }),
  t.addRecord({
    type: 'todo',
    id: schema.generateId(),
    attributes: { description: 'b', completed: false, created: Date.now() + 1 }
  }),
  t.addRecord({
    type: 'todo',
    id: schema.generateId(),
    attributes: { description: 'c', completed: false, created: Date.now() + 2 }
  })
]);

export default memorySource;
