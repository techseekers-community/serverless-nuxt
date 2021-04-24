import SignUp from './SignUp'
export default {
    title: 'SignUp',
    component: SignUp,
    argTypes: {
        value: {
            control: 'boolean'
        }

    }
}

export const SignUp_off = (arg, { argTypes }) => ({
    components: { SignUp },
    props: Object.keys(argTypes),
    template: '<SignUp v-bind="$props" />'
})