export default {
    state: {
        items: {
            data: {}
        },
    },
    mutations: {
        LOAD_CATEGORIES(state, categories){          
            state.items.data = categories
        }
    },
    actions: {
        async loadCategories(context, params){            
            await context.commit('PRELOADER', true)
            
            try {       
                const response = await axios.get('/api/v1/categories', {params})
                    
                await context.commit('LOAD_CATEGORIES', response)
            }
            catch (errors) {
                return errors.response.data.errors
            }  
            finally {
                await context.commit('PRELOADER', false)
            } 
        },

        async loadCategory(context, id){
            await context.commit('PRELOADER', true)

            try {
                const response = await axios.get(`/api/v1/categories/${id}`)
                return response
            } 
            catch (errors) {
                return errors.response.data.errors
            } 
            finally {
                await context.commit('PRELOADER', false)
            }
        },
        
        async storeCategory(context, params){
            await context.commit('PRELOADER', true)
            
            try { 
                const response = await axios.post('/api/v1/categories', params)
              
                return response                   
            }
            catch (errors) {
                return errors.response.data.errors
            }  
            finally {
                await context.commit('PRELOADER', false)
            }            
        },

        async updateCategory (context, params) {
            await context.commit('PRELOADER', true)

            try {
                const response = await axios.put(`/api/v1/categories/${params.id}`, params)
                return response
            } catch (errors) {
                return errors.response.data.errors
            } finally {
                await context.commit('PRELOADER', false)
            }
        },

        async destroyCategory (context, id) {
            await context.commit('PRELOADER', true)

            try {
               await axios.delete(`/api/v1/categories/${id}`)               
            } catch (error) {
               return error
            } 
            
        }
    },
    getters: {
        
    }
}