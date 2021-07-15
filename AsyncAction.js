const redux=require('redux')
const thunkMiddleware=require('redux-thunk').default
const axios =require('axios')
const createstore=redux.createStore
const applymiddleware=redux.applyMiddleware
///middle ware use to add some features



const initialstate  = {
    loading:false,
    users:[],
    error:''
}
const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'

const fetchUsersRequest=()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}
const fetchUserSuccess=(users)=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}
const fetchUsersFailure=(error)=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

const fetchuser=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(r=>{
                const users=r.data.map(user=>user.id)
            dispatch(fetchUserSuccess(users))
            })
            .catch(e=>{
        dispatch(fetchUsersFailure(e.message))
            })
    }
} 

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                    ...state,
                    loading:true
            }
            case FETCH_USERS_SUCCESS:
            return{
                    loading:false,
                    users:action.payload,
                    error:''
            }
            case FETCH_USERS_FAILURE:
            return{
                    loading:false,
                    users:[],
                    error:action.payload
            }
    }
}





const store = createstore(reducer,applymiddleware(thunkMiddleware))

store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchuser())