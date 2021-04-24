export default {
    register({ state, commit, dispatch }) {
        dispatch("resetError")
        if (state.fname == "") {
            commit('setFNameError', "Required First Name")
            return;
        }
        const nameRegex = new RegExp("^[a-zA-Z]{2,30}$");
        if (!nameRegex.test(state.fname)) {
            commit('setFNameError', "Invalid First Name")
            return;
        }

        if (state.lname == "") {
            commit('setLNameError', "Required Last Name")
            return;
        }
        if (!nameRegex.test(state.lname)) {
            commit('setLNameError', "Invalid Last Name")
            return;
        }

        if (state.email == "") {
            commit('setEmailError', "Required Email")
            return;
        }
        const emailRegex = new RegExp(
            "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*"
        );
        if (!emailRegex.test(state.email)) {
            commit('setEmailError', "Invalid Email")
            return;
        }

        if (state.password == "") {
            commit('setPasswordError', "Required Password")
            return;
        }
        const passwordRegex = new RegExp(
            "^(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$"
        );
        if (!passwordRegex.test(state.password)) {
            commit('setPasswordError', "Invalid Password")
            return;
        }

        if (state.dob == "") {
            commit('setDOBError', "Select")
            return;
        }
        if (state.mob == "") {
            commit('setMOBError', "Select")
            return;
        }

        if (state.gender == "") {
            commit('setGenderError', "Select Gender")
            return;
        }

        return this.$axios.post("api/register", {
            fname: state.fname,
            lname: state.lname,
            email: state.email,
            dob: state.dob + "/" + state.mob + "/" + state.yob,
            gender: state.gender,
            password: state.password,
        }).then(function (result) {
            commit('reset')
            return result;
        }).catch(function (e) {
            if (e.response) {
                dispatch('setAlert', "Error", e.response.data.error)
            } else {
                dispatch('setAlert', "Error", "Looks like something wrong with us &#128531;. Please try again later.")
            }
            throw e;
        })

    },
    resetError({ commit }) {
        commit('resetFNameError')
        commit('resetLNameError')
        commit('resetEmailError')
        commit('resetPasswordError')
        commit('resetDOBError')
        commit('resetMOBError')
        commit('resetYOBError')
        commit('resetGenderError')
    },
    setAlert({ state, commit }, title, message) {
        commit('setAlert', title, message)
        var interval = setInterval(() => {
            commit('alertProgressIncreament')
        }, state.alertTime / 100);

        setTimeout(() => {
            commit('resetAlert')
            clearInterval(interval);
            commit('resetAlertProgress')
        }, state.alertTime);
    }
}