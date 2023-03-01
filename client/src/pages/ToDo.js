import { useState, useEffect } from "react";

const baseURL = "http://localhost:4000";

function ToDo() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response);
        setLoading(false)
      });
  }, []);

  if (loading) {
    return <div>Loading</div>
  }
  return <div>{user.username}</div>;
}

export default ToDo;
