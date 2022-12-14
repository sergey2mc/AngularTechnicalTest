import { StateContext } from '@ngxs/store';

import { cloneDeep as _cloneDeep } from 'lodash';

/**
 * Deleted entity and patches state
 *
 * @param ctx - state context
 * @param entityId - ID of the entities that should be deleted
 */
export function deleteEntity<S extends { entities: object, ids: number[] }>(
  ctx: StateContext<S>,
  entityId: number,
) {
  const state = ctx.getState();
  const entities = _cloneDeep(state.entities) as S['entities'];
  delete entities[entityId];

  return ctx.patchState({
    entities,
    ids: state.ids.filter(id => id !== entityId),
  } as Partial<S>);
}
