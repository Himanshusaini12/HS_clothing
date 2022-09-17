import React from "react";
import FormInput from "../../components/form-input/form-input.js";
import "../signin/signin.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: " ", password: "" });
  };
  handleChange = (event) => {
    //   alert("hii");
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>i already have an account</h2>
        <span>sign in with your email and password </span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            lable="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <label>email</label>
          <FormInput
            type="password"
            name="password"
            lable="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <label>password</label>
          <input
            type="submit"
            value="submit form"
            onSubmit={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default SignIn;