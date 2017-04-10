// import shop from '../../api/shop'
// import * as types from '../mutation-types'

// // initial state
// // shape: [{ id, quantity }]
// const state = {
//   added: [],
//   checkoutStatus: null
// }

// // getters
// const getters = {
//   checkoutStatus: state => state.checkoutStatus
// }

// // actions
// const actions = {
//   checkout ({ commit, state }, products) {
//     const savedCartItems = [...state.added]
//     commit(types.CHECKOUT_REQUEST)
//     shop.buyProducts(
//       products,
//       () => commit(types.CHECKOUT_SUCCESS),
//       () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
//     )
//   }
// }

// // mutations
// const mutations = {
//   [types.TEST_APP] (state) {
//     console.log(state);
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }
