import { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest } from "../service/request";
import { toast } from "react-hot-toast";
const BANNER = {
  DEFAULT: "/banner",
  TOGGLE: "/banner/toggle",
  update: "/banner/create-or-update",
};

export type bannerType = {
  id?: number;
  heading?: string;
  content: string;
  timer: number;
  link: string;
  active: boolean;
};

const useBanner = () => {
  const [banner, setBanner] = useState<bannerType>();
  const [time, setTime] = useState<number>(banner?.timer || 0);
  const [isLoading, setLoading] = useState(false);

  const fetchBanner = async () => {
    try {
      const response = await getRequest(BANNER.DEFAULT);
      setBanner(response.data.banner);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBaner = async () => {
    try {
      const response = await putRequest(BANNER.TOGGLE);
      if (response.data.success) {
        setBanner(response.data.banner);
        toast.success(response.data?.message);
      } else {
        toast.error(response.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.error(error);
    }
  };

  const updateBanner = async (data: bannerType) => {
    setLoading(true);
    try {
      const response = await postRequest(BANNER.update, data);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    // Pad minutes and seconds to always display two digits
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = secs.toString().padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };
  const timer = formatTime(time);
  const active = time > 0 && Boolean(banner?.active);

  useEffect(() => {
    setTime(banner?.timer || 0);
  }, [banner]);

  useEffect(() => {
    fetchBanner();
  }, []);

  return {
    banner,
    updateBanner,
    toggleBaner,
    timer,
    active,
    isLoading,
  };
};

export default useBanner;
