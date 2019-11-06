import { NAME_TOKEN } from '../../../config/configs'

export default {
    state: {
        me: {},
        authenticated: false,
        urlBack: 'home',
    },

    mutations: {
        AUTH_USER_OK(state, user) {
            state.authenticated = true
            state.me = user
        },

        AUTH_USER_LOGOUT(state) {
            state.me = {}
            state.authenticated = false
            state.urlBack = 'home'
        },

        CHANGE_URL_BACK (state, url) {
            state.urlBack = url   
        }
    },

    actions: {
        async login(context, params) {
            context.commit('PRELOADER', true)

            try {
                const response = await axios.post('/api/auth', params)
                
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

        async checkLogin(context) {
            context.commit('PRELOADER', true)

            try {
                const token = await localStorage.getItem(NAME_TOKEN)

                if(token) {
                    const response = await axios.get('/api/me')                    
                    if(response) {
                        context.commit('AUTH_USER_OK', response.data.user)
                    }
                }                 

                return response
            } catch (error) {
                localStorage.removeItem(NAME_TOKEN)

                return error
            } finally {
                context.commit('PRELOADER', false)
            } 
        },

        logout(context) {
            localStorage.removeItem(NAME_TOKEN)

            context.commit('AUTH_USER_LOGOUT')
        }
    },
}