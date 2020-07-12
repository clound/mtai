/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 18:18:38
 * @LastEditTime: 2020-07-12 16:00:55
 */ 
import TYPE from '@/store/types'
const initialState = { auth: { data: {} }, responsive: { data: {} } }
const reducer = (state = initialState, action) => {
  // let { auth, responsive } = state
  console.log(action.type)
 switch (action.type) { 
   case TYPE.RESPONSIVE: 
     return {
       ...state,
       responsive: action.payload }
   case TYPE.AUTH: 
     return { 
       ...state,
       auth: {
        data: action.payload
      } 
    }  
    default:            
        return state;    
    }
 }
export default reducer
