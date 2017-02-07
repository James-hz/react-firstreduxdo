/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as  ActionTest from "../actions/testAction.js"
import Main from '../components/App';
import { push,replace,goBack } from 'redux-router';
/* Populated by react-webpack-redux:reducer */

class App extends Component {




  componentWillMount(){
    console.log("进入====")
     this.props.actions.babyList("od-5Ut9ZZK9x_p__DXIm_v2Hen-8",(error,res)=>{
           console.log(res)
     });
  }

  render(){

    console.log("测试返回=======",this.props.datashow)
    return(
      <div>11122333</div>
    )
  }

  //render() {
  //  const {actions, testReducer} = this.props;
  //  return <Main actions={actions} testReducer={testReducer}/>;
  //}
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
//App.propTypes = {
//  actions: PropTypes.shape({
//    testAction: PropTypes.func.isRequired,
//  }),
//  testReducer: PropTypes.shape({})
//};

function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = { testReducer: state.testReducer };

  let datashow = 0;

  if(state.testReducer.datashow){
    datashow = state.testReducer.datashow

  }

  console.log("111122223333")

  return {datashow:datashow};

}

//function mapDispatchToProps(dispatch) {
//  /* Populated by react-webpack-redux:action */
//  const actions = {
//    testAction,
//  };
//  const actionMap = { actions: bindActionCreators(actions, dispatch) };
//  return actionMap;
//}


function mapDispatchToProps(dispatch) {
  return {
    dispath:dispatch,
    pushState: bindActionCreators(push, dispatch),
    goBack:bindActionCreators(goBack, dispatch),
    actions:bindActionCreators(ActionTest,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
