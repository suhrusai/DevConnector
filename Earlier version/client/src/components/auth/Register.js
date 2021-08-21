import React from "react";
import { Fragment, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.log("Passwords don't match");
            setAlert("Passwords Dont match", "danger");
        } else {
            /*

            // Code for registering user without using redux 
            const newUser = {
                name,
                email,
                password,
            };
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = JSON.stringify(newUser);

                const res = await axios.post(
                    "http://localhost:5000/api/users",
                    body,
                    config
                );

                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            } */
        }
        register({ name, email, password });
    };
    console.log("isauthenticated", isAuthenticated);
    if (isAuthenticated) {
        return <Redirect to="/dashboard"></Redirect>;
    }
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Create Your Account
                </p>
                <form
                    className="form"
                    action="create-profile.html"
                    onSubmit={(e) => onSubmit(e)}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile
                            image, use a Gravatar email
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            required
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            required
                            value={password2}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Register"
                    />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
// export default Register;
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
