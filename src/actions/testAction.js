
import {CALL_API} from "../middleware/api.js"

import {
  BABYLIST_REQUEST, BABYLIST_RESPONSE, BABYLIST_FAIL

} from './const';



export function babyList(id,callback) {

  console.log("api 开始1 进入====",id)
  let url = (`/remote/wxbook/index.php/ReactBaby/GetBabyList`)
  var data = {};
  data.wxopenid = id;
  return {
    [CALL_API]:{
      types:[
        BABYLIST_REQUEST,
        BABYLIST_RESPONSE,
        BABYLIST_FAIL
      ],
      endpoint:url,
      callback:callback,
      data:data
    }
  }
}

