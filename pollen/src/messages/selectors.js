/**
 * Created by Orion on 3/17/2018.
 */

import { createSelector } from 'reselect'
import * as _ from 'lodash'

const messagesById = state => state.messages.byId;
const tagsById = state => state.tags.byId;

/**
 * Sélecteur pour récupérer les tâches sous forme de tableau
 */
export const messageArraySelector = createSelector(
    messagesById,
    function ( messagesById ) {
        return _(messagesById).values().sortBy('time').map('id').value();
    }
);
