import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succes, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const apiURL = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!apiURL.ok) {
        throw new Error("Invalid Credentials");
      }
      const response = await apiURL.text();
      localStorage.setItem("token", response);
      setUsername("");
      setPassword("");
      setError("");
      setSuccess("Logged In Successfully");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
      setSuccess("");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexWrap: "wrap",
        }}
      >
        <div
          className="form-box"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px 12px 40px rgba(142, 142, 142, 0.24)",
            padding: "40px",
            width: "20%",
          }}
        >
          <form autoComplete="false" onSubmit={handleClick}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </form>
          {error && (
            <div
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              {error}
            </div>
          )}
          {succes && (
            <div
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              {succes}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
