import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">ثبت نام</h3>
              <p>پلتفرم تبلیغاتی فام</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
