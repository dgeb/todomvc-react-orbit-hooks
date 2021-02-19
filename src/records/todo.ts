import type { Record } from '@orbit/records';

export interface Todo extends Record {
  attributes: {
    description: string;
    completed: boolean;
  };
}
