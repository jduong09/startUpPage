import { useEffect, useState, react } from "react";

const Reddit = () => {
  // const [userId, setUserId] = useState('');

  useEffect(() => {
    const authCall = async () => {
      await fetch('/authorize')
        .then(response => response.json())
        .then(data => {
          window.location = data.redirectLink
        });
    }

    authCall();
  });

  return (
    <div>
      <h1>This is Reddit's page</h1>
    </div>
  );
};

export default Reddit;