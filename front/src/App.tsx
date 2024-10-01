import { useEffect, useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { fetchTokenChannel } from "./service/api.service";

function App() {
  const backgroundStyle = {
    display: "flex",
    width: "100vw",
    height: "100vh",
  };

  const [videoCall, setVideoCall] = useState(true);
  const searchParams = new URLSearchParams(window.location.search);
  const channel = searchParams.get("channel");
  const role = searchParams.get("role") as "publisher" | "audience";
  const [rtcProps, setRtcProps] = useState({
    appId: import.meta.env.VITE_APP_ID,
    channel,
  });

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  useEffect(() => {
    if (!channel || !role) return;

    (async () => {
      const { data, error } = await fetchTokenChannel({ role, channel });
      if (error) {
        console.error(error);
        return;
      }
      setRtcProps((prev) => ({ ...prev, token: data?.rtcToken }));
    })();
  }, [channel, role]);

  return videoCall ? (
    <div style={backgroundStyle}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
}

export default App;
