const redux=require('redux')
const reduxLogger=require('redux-logger')

const craetestore=redux.createStore
const combinedreducer=redux.combineReducers
const applymiddleware=redux.applyMiddleware //middle ware use to add some features
const logger = reduxLogger.createLogger()


//action
const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'
const RETURN_CAKE='RETURN_CAKE'



function buycake(){
    return{
        type:BUY_CAKE,
        info:'first redux action'
    }
}

function buyicecream(){
    return{
        type:BUY_ICECREAM
    }
}

//reducer
/*
const initialstate={
    numofcakes:10,
    nooficecream:20
}*/

const cakeinitialstate={
    numofcakes:10
}
const icecreaminitialstate={
    nooficecream:20
}
const cakereducer=(state=cakeinitialstate,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                numofcakes:state.numofcakes-1
            }
            default:return state
    }
}

const icecreamreducer=(state=icecreaminitialstate,action)=>{
    switch(action.type){
            case BUY_ICECREAM:
            return{
                ...state,
                nooficecream:state.nooficecream-1
            }
            default:return state
    }
}


//store
const rootreducer=combinedreducer({
    cake:cakereducer,
    icecream:icecreamreducer
})
//const store=createstore(rootreducer)
const  store=craetestore(rootreducer,applymiddleware(logger))
console.log('initialstate',store.getState())
 //const unsubscribe= store.subscribe(()=>console.log('update state',store.getState()))
 const unsubscribe=store.subscribe(()=>{})
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buyicecream())
store.dispatch(buyicecream())
store.dispatch(buyicecream())
unsubscribe()
