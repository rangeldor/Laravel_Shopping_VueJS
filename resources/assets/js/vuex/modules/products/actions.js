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
            
        } finally {
            // Finaliza o preloader
            context.commit('PRELOADER', false)
        }
    }

}