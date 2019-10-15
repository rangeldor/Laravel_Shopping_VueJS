import axios from 'axios'
import { URL_BASE } from '../../../config/configs'

const RESOURCE = 'products'

export default {

    async loadProducts (context, params) {

        // Inicia o preloader
        context.commit('PRELOADER', true)

        try {
            // Obtém os dados da api chamando a url de produtos
            const response = await axios.get(`${URL_BASE}${RESOURCE}`, {params})

            //"context.commit('')" Envia para um mutation
            context.commit('LOAD_PRODUCTS', response.data)
        } catch (error) {
            console.log(error)
        } finally {
            // Finaliza o preloader
            context.commit('PRELOADER', false)
        }
    },

    async storeProduct(context, params) {
        context.commit('PRELOADER', true)
            
            try { 
                const response = await axios.post(`${URL_BASE}${RESOURCE}`, params)
               // console.log('storeCategory -> ' + JSON.stringify(response.data))
                return response                   
            }
            catch (errors) {
                console.log(errors.response.data.errors)
                return errors.response.data.errors
            }  
            finally {
                await context.commit('PRELOADER', false)
            } 
    }

}