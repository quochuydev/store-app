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
    await axios.post(
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
    props.onSuccess && props.onSuccess();
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const facebookAppId = process.env.FACEBOOK_APP_ID;
  const googleClientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <div className={props.className}>
      {facebookAppId && (
        <SocialButton
          provider="facebook"
          appId={facebookAppId}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          style={{ background: "none", border: 0 }}
        >
          Facebook
        </SocialButton>
      )}

      {googleClientId && (
        <SocialButton
          provider="google"
          appId={googleClientId}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          style={{ background: "none", border: 0 }}
        >
          Google
          {/* <FcGoogle /> */}
        </SocialButton>
      )}
    </div>
  );
}
