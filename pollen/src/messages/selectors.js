/**
 * Created by Orion on 3/17/2018.
 */

import { createSelector } from 'reselect'
import * as _ from 'lodash'

const byId = state => state.messages.byId;

/**
 * Sélecteur pour récupérer les tâches sous forme de tableau
 */
export const messageArraySelector = createSelector(
    byId,
    function ( byId ) {
        return _(byId).values().sortBy('time').map('id').value();
    }
);
