import "./App.css";
import React from "react";
import CheckoutPage from "./pages/checkout/checkout";
import Homepage from "../src/pages/homepage";
import ShopPage from "./pages/shop/shop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import SignInandSignUpPage from "../src/pages/sign-in-and-signup/signin-signup.js";
import {
  auth,
  createUserDocumentFromAuth,
} from "./components/firebase/firebase.js";
import { onSnapshot, doc } from "firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import SignIn from "./components/signin/signin";
class App extends React.Component {
  unSubscribeAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const docRef = await createUserDocumentFromAuth(userAuth);
        onSnapshot(docRef, (doc) => {
          setCurrentUser({
            id: doc.id,
            ...doc.data(),
          });
          console.log(this.state);
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribeAuth();
  }

  render(userAuth) {
    return (
      <Router>
        <div>
          <Header />

          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/shop" element={<ShopPage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />

            <Route
              exact
              path="/signin"
              element={
                !this.props.currentUser ? <SignInandSignUpPage /> : <Homepage />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);
