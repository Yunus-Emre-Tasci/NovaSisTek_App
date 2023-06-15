// import { createStore } from "vuex";


// const store=createStore(
//     {
//         mutations:{
//             setBasket(state,p){
//                 state.baskets.push(p)
//             },
//             removeBasket(state,p){
//                 const arr=[...state.baskets]
//                 state.baskets=arr.filter((s)=>s.id!==p.id)
//             }
//         },
//         getters:{
//             getBaskets(state){
//                 return state.baskets
//             },
//             getBasketsLength(state){
//                 return state.baskets.length
//             },
//             getBasketsTotalPrice(state){
//                 let count=0
//                 state.baskets.forEach((x)=>{
//                     count+=x.price
//                 })
//                 return count
//             }
//         },
//         actions:{
//             addBaskets(state,payload){
//                     state.commit("setBasket",payload)
//             },
//             removeBaskets(state,payload){
//                 state.commit("removeBasket",payload)
//             }
//         },
//         state(){
//             return{
//                 baskets:[]
//             }
//         }
//     }
// )
// export default store


import {
    createStore
} from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: localStorage, // veya başka bir depolama yöntemi
});

const basketModule = {
    state: {
        baskets: [],
    },
    mutations: {
        setBasket(state, p) {
            state.baskets.push(p);
        },
        removeBasket(state, p) {
            const arr = [...state.baskets];
            state.baskets = arr.filter((s) => s.id !== p.id);
        },
    },
    getters: {
        getBaskets(state) {
            return state.baskets;
        },
        getBasketsLength(state) {
            return state.baskets.length;
        },
    },
    actions: {
        addBasket(context, payload) {
            context.commit('setBasket', payload);
        },
        removeBasket(context, payload) {
            context.commit('removeBasket', payload);
        },
    },
};

const appStore = createStore({
    state: {
        darkMode: false,
    },
    mutations: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
        },
    },
    modules: {
        basket: basketModule,
    },
    plugins: [vuexPersist.plugin],
});

export default appStore;
