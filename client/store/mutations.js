export default {
    activateSignUp(state) {
        state.authform.signUpActive = true
        state.authform.signInActive = false
    },
    activateSignIn(state) {
        state.authform.signUpActive = false
        state.authform.signInActive = true
    },
    deativateAll({ commit }) {
        commit('deativateSignIn')
        commit('deativateSignUp')
    },
    deativateSignIn(state) {
        state.authform.signInActive = false
    },
    deativateSignUp(state) {
        state.authform.signUpActive = false
    },

}