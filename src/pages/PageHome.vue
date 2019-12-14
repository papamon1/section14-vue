<template>  
  <div>
    <AppHero />
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />        
        <router-link v-if="user" :to="{name: 'PageMeetupCreate'}" class="button is-primary is-pulled-right m-r-sm">Create Meetups</router-link>
        <router-link :to="{name: 'PageMeetupFind'}" class="button is-primary is-pulled-right m-r-sm">All</router-link>
        <h1></h1>
      </div>
      <div class="row columns is-multiline">
         <MeetupItem v-for="meetup in meetups"
          :key="meetup._id"
          :meetup="meetup"
         />
        
        
      </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <div class="column is-one-quarter" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1508355991726-ebd81e4802f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Sport</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Movies</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Music</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1509670811615-bb8b07cb3caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Dance</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Party</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Books</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1542&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Food</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Games</div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="container">
      <AppSpinner />
    </div>
  </div>
  
</template>

<script>
  import MeetupItem from '@/components/MeetupItem'  
  import {mapActions, mapState, mapGetters} from 'vuex'
  import pageLoader from '@/mixins/pageLoader'
  export default {    
    created () {      
      //En vez de hacer la llamada directamente sobre el store
      // vuex permite utilizar mapActions, para mapear directamente las acciones del store al contexto de este componente
      // this.$store.dispatch('fetchMeetups');
      // this.$store.dispatch('fetchCategories');

      //Ahora estan mapeadas a nuestro contexto, ya o noecesitamos llamarlas desde el store


      // Nueva sintaxis jsx en la que hacemos todas las llamadas a las promises sin tenerlas anidadas
      // quiere decir que cuando se resulevan todas ellas, entonces entra en el bloque then

      Promise.all([this.fetchMeetups(), this.fetchCategories()])
        .then((results) => this.pageLoader_resolveData(results))
        .catch((err) => {
          console.error(err)
          this.pageLoader_resolveData()
        })

      // this.fetchMeetups()
      //   .then(()=>{
      //     return this.fetchCategories()
      //       .then(()=>{
      //         return this.isDataLoaded=true
      //     })
      //   })
      
      
    },
    components:{
      MeetupItem    
    },    
    mixins:[pageLoader],
    computed:{


      ...mapGetters({
        'user':'auth/authUser'
      }),

      //Aqui hacemos lo mismo. Vemos que lo que devolveríamos sería el estado de nuestro store
      // En vez de invocarlo desde el store, lo que hacemos es mapearlo directamente para que se le pueda invocar desde nuestro contexto

      // meetups(){
      //   return this.$store.state.meetups
      // },
      // categories(){
      //   return this.$store.state.categories
      // }
      ...mapState({
        //reciben una funcion, lo haremos con sintaxis de arrow, y en concreto de arrow que solo tiene un parametro
        meetups: state => state.meetups.items,
        categories: state => state.categories.items
      }),
      // ...mapGetters(['testingGetter'])
      //Acepta que le pasemos un objeto, si queremos un alias para el getter, le podemos cambiar el nombre pasandoselo como clave del objeto
      // ...mapGetters({
      //   deOtraForma: 'testingGetter'
      // })
    },
    methods:{
      //Mapeamos al contexto de este componente las acicones de vuex
      ...mapActions('meetups',['fetchMeetups']),
      ...mapActions('categories',['fetchCategories'])
    }
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>
