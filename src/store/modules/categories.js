import axios from 'axios'

export default{
    namespaced: true,
    
    state:{
        items:[]
    },    
    actions:{
        fetchCategories(context){            
            return axios.get('/api/v1/categories')
            .then(res => {          
                const categories = res.data;
                // context.commit('setCategories',categories);
                context.commit('setItems',{resource:'categories',items:categories}, {root:true});
                return context.state.items
            })
        },
    }
}