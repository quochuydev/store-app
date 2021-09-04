import Link from "next/link";

export default function Thankyou() {
  return (
    <div className="jumbotron text-center">
      <h2 className="display-3">Thank You!</h2>
      <p className="lead">
        <strong>Please check your email</strong> for further instructions on how
        to complete your account setup.
      </p>
      <p>
        Having trouble? <a href="#">Contact us</a>
      </p>
      <p className="lead">
        <Link className="btn btn-primary btn-sm" href="/">
          Continue to homepage
        </Link>
      </p>
      <hr />
    </div>
  );
}
