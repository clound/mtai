/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 18:18:38
 * @LastEditTime: 2020-06-15 18:34:07
 */ 
import TYPE from '@/store/types'
const initialState = { auth: { data: {} }, responsive: { data: {} } }
const reducer = (state = initialState, action) => {
  // let { auth, responsive } = state
 switch (action.type) { 
   case TYPE.RESPONSIVE: 
     return { responsive: action.payload }
   case TYPE.AUTH: 
     return { auth: {
        data: action.payload
      } 
    }  
    default:            
        return state;    
    }
 }
export default reducer
