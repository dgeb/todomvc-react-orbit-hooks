import { MemorySource } from '@orbit/memory';
import schema from './schema';

const memorySource = new MemorySource({ schema });

// Init state
// memorySource.cache.patch(t => [
//   t.addRecord({ type: 'todo', id: schema.generateId(), attributes: { description: 'a', completed: false }}),
//   t.addRecord({ type: 'todo', id: schema.generateId(), attributes: { description: 'b', completed: false }})
// ])

export default memorySource;
