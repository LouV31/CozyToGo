import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/actions/Authentication/AuthenticationAction";

const RegisterForm = ({ navigateToLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const dispatch = useDispatch();

    const password = watch("password");

    const onSubmit = (user) => {
        console.log(user);
        dispatch(
            registerUser(
                user.name,
                user.surname,
                user.email,
                user.password,
                user.city,
                user.address,
                user.zipCode,
                user.phone
            )
        );
        navigateToLogin();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                {/* Name field */}
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.name && <p className="mb-0 text-danger fs-5">{errors.name.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Name"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                </Form.Group>
                {/* Surname field */}
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.surname && <p className="mb-0 text-danger fs-5">{errors.surname.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Surname"
                        {...register("surname", {
                            required: "Surname is required",
                        })}
                    />
                </Form.Group>
                {/* City field */}
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.city && <p className="mb-0 text-danger fs-5">{errors.city.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="City"
                        {...register("city", {
                            required: "City is required",
                        })}
                    />
                </Form.Group>
                {/* Address field */}
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.address && <p className="mb-0 text-danger fs-5">{errors.address.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Address"
                        {...register("address", {
                            required: "Address is required",
                        })}
                    />
                </Form.Group>
                {/* ZipCode field */}
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.zipCode && <p className="mb-0 text-danger fs-5">{errors.zipCode.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Zip Code"
                        {...register("zipCode", {
                            required: "Zip Code is required",
                        })}
                    />
                </Form.Group>
                {/* Phone field */}
                <Form.Group className="d-flex flex-column align-items-center w-75">
                    {errors.phone && <p className="mb-0 text-danger fs-5">{errors.phone.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Phone"
                        {...register("phone", {
                            required: "Phone is required",
                        })}
                    />
                </Form.Group>
                {/* Email field */}
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
                {/* Password field */}
                <Form.Group className="d-flex flex-column align-items-center w-75 mb-3">
                    {errors.password && <p className="mb-0 text-danger fs-5">{errors.password.message}</p>}
                    <Form.Control
                        className="cozy-input-form"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must have at least 6 characters",
                            },
                        })}
                    />
                </Form.Group>
                {/* Confirm Password field */}
                <Form.Group className="d-flex flex-column align-items-center w-75 mb-5">
                    {errors.confirmPassword && (
                        <p className="mb-0 text-danger fs-5">{errors.confirmPassword.message}</p>
                    )}
                    <Form.Control
                        className="cozy-input-form"
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                    />
                </Form.Group>
                {/* Submit button */}
                <button className="btn-form btn-green text-center" type="submit">
                    Registrati
                </button>
            </Form>
        </div>
    );
};

export default RegisterForm;
