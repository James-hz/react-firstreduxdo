/**
 * Created by js
 */
import 'isomorphic-fetch'
import { push,replace } from 'redux-router';

import baseConfig from '../config/base';
import cookie from 'react-cookie';

import { normalize, schema } from 'normalizr';

import BrowserUtil from "../config/wx/BrowserUtil"

var AppConfig = require("../config/base")
//import baseConfig from '../config/base';


let API_ROOT = baseConfig.HostName;
/*console.log(process.env.NODE_ENV)
 if (process.env.NODE_ENV !== 'production') {
 API_ROOT = 'http://localhost:3000'
 }*/

//console.log(API_ROOT)

var serialize = function (data) {
  data = data || {};
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
};

var getCookieParam = (name)=>{
  return _getCookieParam(name,-1)
}

var _getCookieParam = (name,defaultValue)=>{
  let value = cookie.load(name);

  return value == defaultValue? -1:value;
}

var commonParams = (data)=>{


  let unionid = getCookieParam("my_unionid");

  data.unionid = unionid;

  let platform = BrowserUtil.versions.android ? "android":"unknown";

  if(platform == "unknown"){
    platform = BrowserUtil.versions.iPhone ? "iphone":"unknown";
  }

  data.platform = platform

  if(data.wxopenid == undefined){
    let wxopenid = getCookieParam("wxopenid");
    data.wxopenid = wxopenid;
  }

  return data;
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint,json,schema) {
  console.log("api 开始3 进入中间件====")
  const fullUrl = (endpoint.indexOf("http") === -1) ? API_ROOT + endpoint : endpoint

  json = commonParams(json)
  console.log("api 开始31 进入中间件====",serialize(json))
  return fetch(fullUrl,{
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: serialize(json)
  })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      console.log("api 开始32 进入中间件====",response.ok)
      if (!response.ok) {
        return Promise.reject(json)
      }

      if(!!schema && json.code == 0){
        var jsonObj = json.object || json.list || json.body || json.data || {}

        return Object.assign({},
          normalize(jsonObj, schema)
        )
      }else{
        return json
      }

    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = ('ZS_Call_API')

export default store => next => action => {

  console.log("api 开始2 进入中间件====")
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {endpoint,data,callback,schema} = callAPI
  const { types } = callAPI

  data = data || {};

  //callback = callback || function(){}

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  /**
   * let newQuery = {};
   //Filter out empty and null values
   for (let queryKey in newQueryParts) {
                if (!String(newQueryParts[queryKey]).length) continue;
                newQuery[queryKey] = newQueryParts[queryKey];
            }
   next(replaceState(null, url, newQuery));
   */

  const [ requestType, successType, failureType ] = types

  next(actionWith({ type: requestType,data: data}))
  console.log("api 开始22进入调用接口")
  return callApi(endpoint,data,schema).then(
    response => {
      console.log("返回的结果======",response)
      console.log(response)

      if(!!data.redirect && response.code == 0){
        // console.log(data.redirect)
        next(push(null, data.redirect))
      }else{

        if(!!callback){
          callback(null,response)
        }

        return next(actionWith({
          response:response,
          requestData:data,
          type: successType,
          receivedAt: Date.now()
        }))
      }
    } ,
    error =>{
      if(!!callback){
        callback(error)
      }

      next(actionWith({
        type: failureType,
        data:data,
        error: error.message || 'Something bad happened'
      }))
    }
  );
}
