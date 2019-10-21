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

    async loadProduct (context, id) {
        
        // Inicia o preloader
        context.commit('PRELOADER', true)
        
        try {
            // Obtém os dados da api chamando a url de produtos
            const response = await axios.get(`${URL_BASE}${RESOURCE}/${id}`)

            if(response.data){
                console.log('loadProduct')
                console.log(response.data)
                return response.data
            } else {
                this.$snotify.error('Erro ao carregar o produto', 'Erro')
            }
            
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
            // console.log('storeProduct -> ' + JSON.stringify(response.data))

            context.commit('PRELOADER', false)
            
            return response                   
        }
        catch (errors) {
            console.log(errors.response.data.errors)
            context.commit('PRELOADER', false)

            return errors.response.data.errors
        }  
        finally {
            //context.commit('PRELOADER', false)
        } 
    },
    
    async updateProduct(context, params) {
        context.commit('PRELOADER', true)
        
        try { 
            const response = await axios.put(`${URL_BASE}${RESOURCE}/${params.id}`, params)
            console.log('updateProduct -> ' + JSON.stringify(response.data))

            context.commit('PRELOADER', false)
            
            return response                   
        }
        catch (errors) {
            console.log(errors.response.data.errors)
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