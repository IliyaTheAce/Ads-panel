import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">خوش آمدید!</h3>
                <p>پلتفرم تبلیغاتی فام</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
