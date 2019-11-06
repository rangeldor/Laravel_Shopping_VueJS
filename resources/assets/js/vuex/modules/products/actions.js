import axios from 'axios'
import { URL_BASE } from '../../../config/configs'

const RESOURCE = 'products'
const CONFIGS = {
    headers: {
        'content-type': 'multipart/form-data',
    }
}

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
            return error
        } finally {
            // Finaliza o preloader
            context.commit('PRELOADER', false)
        }
    },

    async loadProduct (context, id) {
        
        // Inicia o preloader
        context.commit('PRELOADER', true)
        
        try {
            // Obtém os dados da api chamando a url de produtos
            const response = await axios.get(`${URL_BASE}${RESOURCE}/${id}`)

            if(response.data){
                return response.data
            } else {
                this.$snotify.error('Erro ao carregar o produto', 'Erro')
            }
            
        } catch (error) {
            return error
        } finally {
            // Finaliza o preloader
            context.commit('PRELOADER', false)
        }
    },
    
    async storeProduct(context, formData) {
        context.commit('PRELOADER', true)
       
        try { 
            const response = await axios.post(`${URL_BASE}${RESOURCE}`, formData, CONFIGS)
         
            context.commit('PRELOADER', false)
            
            return response                   
        }
        catch (errors) {
            context.commit('PRELOADER', false)

            return errors.response.data.errors
        }  
        finally {
            //context.commit('PRELOADER', false)
        } 
    },
    
    async updateProduct(context, formData) {
        context.commit('PRELOADER', true)

        formData.append('_method', 'PUT')
        
        try { 
            const response = await axios.post(`${URL_BASE}${RESOURCE}/${formData.get('id')}`, formData)
        
            context.commit('PRELOADER', false)
            
            return response                   
        }
        catch (errors) {
            context.commit('PRELOADER', false)

            return errors.response.data.errors
        }  
        finally {
            //context.commit('PRELOADER', false)
        } 
    },
    
    async destroyProduct(context, id) {
        context.commit('PRELOADER', true)
        
        try { 
            const response = await axios.delete(`${URL_BASE}${RESOURCE}/${id}`)

            context.commit('PRELOADER', false)
            
            return response                   
        }
        catch (error) {
            context.commit('PRELOADER', false)

            return error
        }  
        finally {
            //context.commit('PRELOADER', false)
        } 
    },   
    
}