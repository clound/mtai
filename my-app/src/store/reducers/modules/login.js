/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 18:04:37
 * @LastEditTime: 2020-06-15 18:24:44
 */ 
import TYPE from '@/store/types'

const initialState = { auth: {} }
const reducer = (state = initialState, action) => {
 switch (action.type) { 
   case TYPE.LOGIN: 
     return { auth: action.payload }
    default:            
        return state;    
    }
 }
export default reducer
