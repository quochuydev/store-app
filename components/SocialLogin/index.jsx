import axios from "axios";
import React from "react";
import SocialLogin from "react-social-login";
// import { FcGoogle } from "react-icons/fc";

class SocialButtonComponent extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <button onClick={triggerLogin} {...props}>
        {children}
      </button>
    );
  }
}

const SocialButton = SocialLogin(SocialButtonComponent);

export default function SocialLoginButton(props) {
  const handleSocialLogin = async (result) => {
    const res = await axios.post(
      "http://localhost:3000/users/signin",
      {
        profile: {
          name: result._profile.name,
          picture: result._profile.profilePicURL, // google
        },
        credential: {
          provider: result._provider, // value: "facebook" : "google",
          accessToken: result._token.accessToken,
        },
      },
      {
        withCredentials: true,
      }
    );
    console.log(res?.data);
    props.onSuccess && props.onSuccess();
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <div className={props.className}>
      <SocialButton
        provider="facebook"
        appId={process.env.FACEBOOK_APP_ID}
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Facebook
      </SocialButton>

      <SocialButton
        provider="google"
        appId={process.env.GOOGLE_CLIENT_ID}
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        style={{ background: "none", border: 0 }}
      >
        Login with Google
        {/* <FcGoogle /> */}
      </SocialButton>
    </div>
  );
}
