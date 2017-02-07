/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import addItem from '../actions/addItem.js';
import testAction from '../actions/testAction.js';
const actions = {
  testAction,
  addItem
};
module.exports = actions;
