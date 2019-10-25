export default {
    state: {
        me: {},
        authenticated: false,
    },

    mutations: {
        AUTH_USER_OK(state, user) {
            state.authenticated = true
            state.me = user
        }
    },

    actions: {
        async login(context, params) {
            context.commit('PRELOADER', true)

            try {
                const response = await axios.post('/api/auth', params)
                
                context.commit('AUTH_USER_OK', response.data.user)
                
                return response
            } catch (error) {
                console.log(error)
            } finally {
                context.commit('PRELOADER', false)
            }            
        }
    },
}