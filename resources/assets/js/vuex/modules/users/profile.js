import { NAME_TOKEN } from '../../../config/configs'

const actions = {
    
    async register(context, params) {
        
        context.commit('PRELOADER', true)
        
        try {
            const response = await axios.post('/api/register', params)
            
            context.commit('AUTH_USER_OK', response.data.user)
            
            const token = response.data.token
            
            localStorage.setItem(NAME_TOKEN, token)
            
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
           
            return response
        } catch (error) {
           return error.response.data
        } finally {
            context.commit('PRELOADER', false)
        }    
    },

    async update(context, params) {
        
        context.commit('PRELOADER', true)
        
        try {
            const response = await axios.put('/api/update', params)
            
            context.commit('AUTH_USER_OK', response.data.user)
                
            return response
        } catch (error) {
           return error.response.data
        } finally {
            context.commit('PRELOADER', false)
        }    
    },
}

export default {
    actions,
}