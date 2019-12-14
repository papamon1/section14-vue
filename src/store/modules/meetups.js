import axios from 'axios'
import axiosInstance from '@/services/axios'

export default{
    namespaced: true,

    state:{
        items:[],
        item:{}
    },    
    actions:{
        fetchMeetups(context){
            context.commit('setItems',{resource:'meetups',items:[]}, {root:true});
            axios.get('/api/v1/meetups')
            .then(res=>{
                const meetups = res.data;
                // context.commit('setMeetups',meetups);
                context.commit('setItems',{resource:'meetups',items:meetups}, {root:true});
                return context.state.items
            })
        },
        createMeetup({rootState}, meetupToCreate){
            //completamos lo que falta antes de mandarlo. La ubicación y el usuario
            meetupToCreate.meetupCreator=rootState.auth.user
            //Esta expresion regular lo que hará será eliminar comas y nespacios, y poner todo en minusculas
            meetupToCreate.processedLocation=meetupToCreate.location.toLowerCase().replace(/[\s,]+/g,'').trim()
            return axiosInstance.post('/api/v1/meetups', meetupToCreate)
            .then(res=>res.data)
        },
        fetchMeetupById(context,meetupId){
            // MEJORA
            //Cuando cargamos una página de detalle después de haber cargado antes otra en algun momento,
            //por unos segundos se muestran los datos de la anterior meetup, hasta que se fecthean los nuevos y se cargan
            //Por eso, cuando se hace la llamada, vamos a eliminar o cargar datos vacíos hasta que se complete la carga de los nuevos

            context.commit('setItem',{resource:'meetups',item:{}}, {root:true});

            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            return axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res=>{                
                const meetup=res.data
                // context.commit('setMeetup',meetup);
                context.commit('setItem',{resource:'meetups',item:meetup}, {root:true});
                return context.state.item
            })
        }
    }
}