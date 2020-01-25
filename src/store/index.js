import Vue from 'vue'
import Vuex from 'vuex'

import meetups from './modules/meetups'
import threads from './modules/threads'
import categories from './modules/categories'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        meetups,
        categories,
        threads,
        auth
    },
    //Simple functions to mutate the state
    //Estas funciones las mantenemos aquí porque las queremos compartir entre todos los modulos de la store
    mutations:{
        //Lo vamos a sustituir por la siguiente sintaxis
        setItems(state, {resource,items}){
            state[resource].items=items
        },
        setItem(state, {resource,item}){            
            state[resource].item=item
        },
        addItemToArray (state, {item, index, resource}) {
        //   debugger
          Vue.set(state[resource].items, index, item)
        }
        //Esta era la explicacion sencilla, nos quedamos con la generica

        // setMeetups(state, meetups){
        //     state.meetups=meetups
        // },
        // setCategories(state, categories){
        //     state.categories=categories
        // },
        // setMeetup(state, meetup){
        //     state.meetup=meetup
        // },
        // setThreads(state, threads){
        //     state.threads=threads
        // }
    }
})