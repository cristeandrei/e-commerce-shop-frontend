import { userLoginDetailsSchema, type UserLoginDetails } from "../../types/userLoginDetails.ts";
import { useLoginMutation } from "../../services/shopApi.ts";
import { useNavigate } from "react-router";
import { setUserDetails } from "../../services/userSlice.ts";
import sytles from './LoginForm.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import type { GenericFromInput } from "../../components/genericForm/GenericForm.tsx";
import GenericForm from "../../components/genericForm/GenericForm.tsx";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm<UserLoginDetails>({ resolver: zodResolver(userLoginDetailsSchema) });
    const [login, { isLoading, error: submitError }] = useLoginMutation()

    const submitLoginRequest = async (userLoginDetails: UserLoginDetails) => {
        const loginResponse = await login(userLoginDetails);

        if (!loginResponse.error && loginResponse.data) {
            dispatch(setUserDetails(loginResponse.data));

            navigate('/');
        }
    };

    const inputs: GenericFromInput<UserLoginDetails>[] = [
        { lable: "Username", specifier: "username", required: true, type: "text", id: "username", autoComplete: "username", error: formState.errors.username?.message },
        { lable: "Password", specifier: "password", required: true, type: "password", id: "password", autoComplete: "password", error: formState.errors.password?.message },
    ]

    return (
        <div className={sytles.loginContainer}>
            <h2>Login to Your Account</h2>
            <GenericForm
                register={register}
                onSubmit={handleSubmit(submitLoginRequest)}
                buttonActionText="Login"
                buttonLoadingActionText="Logging In..."
                isLoading={isLoading} 
                inputs={inputs}
                submitError={submitError}/>
        </div>
    );
}

export default LoginForm;
