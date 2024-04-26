import { Form } from "react-bootstrap";
import { get, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/actions/Authentication/AuthenticationAction";
import { useEffect } from "react";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (user) => {
        dispatch(loginUser(user.email, user.password, navigate));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.email && <p className="mb-0 text-danger fs-5">{errors.email.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-center w-75 mb-5">
                    {errors.password && <p className="mb-0 text-danger fs-5">{errors.password.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                </Form.Group>
                <button className="btn-form btn-green text-center" type="submit">
                    Accedi
                </button>
            </Form>
        </div>
    );
};

export default LoginForm;
