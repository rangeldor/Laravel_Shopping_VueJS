export default {
    // Recebe sempre como 1º parâmetro um state e o 2º parâmetro recebe qualquer valor para ser manipulado
    LOAD_PRODUCTS (state, products) {
        state.items = products
    }
}