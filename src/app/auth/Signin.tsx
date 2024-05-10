const Signin = () => {
  return (
    <div className="login-page">
      <div className="card">
        <form className="form-login">
          <div className="form-group">
            <label htmlFor="username">User name / Email</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" />
          </div>
          <button className="btn">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
