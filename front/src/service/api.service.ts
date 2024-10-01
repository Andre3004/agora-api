import axios from "axios";

export const fetchTokenChannel = async ({
  role,
  channel,
}: {
  role: "publisher" | "audience";
  channel: string;
}) => {
  let data, error;
  try {
    const { data: response } = await axios<{
      rtcToken: string;
    }>({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/rtc/${channel}/${role}/uid/0`,
    });

    data = response;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err) && err.response) {
      error = err.response?.data?.error;
    }
  }

  return { data, error };
};
