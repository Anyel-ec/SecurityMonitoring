import React, { useState } from "react";
import "./css/main.css";
import "./css/util.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", pass: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formValues.email.trim()) validationErrors.email = "El correo es obligatorio";
    if (!formValues.pass.trim()) validationErrors.pass = "La contraseña es obligatoria";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Formulario enviado:", formValues);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-26">Bienvenido</span>
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font"></i>
            </span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is: a@b.c"
            >
              <input
                className={`input100 ${formValues.email ? "has-val" : ""}`}
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="focus-input100" data-placeholder="Email"></span>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass" onClick={() => setShowPassword(!showPassword)}>
                <i className={`zmdi ${showPassword ? "zmdi-eye-off" : "zmdi-eye"}`}></i>
              </span>
              <input
                className={`input100 ${formValues.pass ? "has-val" : ""}`}
                type={showPassword ? "text" : "password"}
                name="pass"
                value={formValues.pass}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="focus-input100" data-placeholder="Password"></span>
              {errors.pass && <span className="error-message">{errors.pass}</span>}
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>

            <div className="text-center p-t-115">
              <span className="txt1">Don’t have an account?</span>
              <a className="txt2" href="#">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;