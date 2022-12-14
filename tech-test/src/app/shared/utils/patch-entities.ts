import { StateContext } from '@ngxs/store';

import { reduce as _reduce } from 'lodash';

/**
 * Creates entities and collection ids and patch state
 *
 * @param ctx - state context
 * @param payload - array of the entities
 * @param shouldBeStateReset - should the state be updated (shouldBeStateReset = false) or rewritten (shouldBeStateReset = true)
 */
export function patchEntities<S extends { entities: object, ids: number[] }, P extends { id?: number }>(
  ctx: StateContext<S>,
  payload: P[],
  shouldBeStateReset = true,
) {
  let initialValue;

  if (shouldBeStateReset) {
    initialValue = { entities: {}, ids: [] };
  } else {
    const { entities, ids } = ctx.getState();
    initialValue = { entities, ids };
  }

  const res = _reduce(
    payload,
    (acc, entity) => ({
      entities: {
        ...acc.entities,
        [entity.id]: {
          ...acc.entities[entity.id],
          ...entity,
        },
      },
      ids:
        acc.ids.indexOf(entity.id) === -1 ? [...acc.ids, entity.id] : acc.ids,
    }),
    initialValue,
  );

  return ctx.patchState(res);
}
