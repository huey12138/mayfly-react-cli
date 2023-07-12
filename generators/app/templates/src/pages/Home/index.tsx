import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import logo from "@/logo.svg";
import "react-calendar/dist/Calendar.css";
import { Button, Upload } from "antd";
import { AliOSS, UploadFileType } from "@/config/oss";
import { RcFile } from "antd/lib/upload";
// import { fetchCreateUser } from "./fetch";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onClick = async (): Promise<void> => {
    console.error("fetchCreateUser");
    throw new Error("fetchCreateUser");

    // try {
    //   await fetchCreateUser();
    // } catch (error) {
    //   console.log(
    //     "%c 🥓 error: ",
    //     "font-size:20px;background-color: #2EAFB0;color:#fff;",
    //     error
    //   );
    // }
  };

  const handleOss = async (file: RcFile): Promise<void> => {
    const oss = new AliOSS("");
    const url = await oss.putFile({
      name: file.name,
      file,
      type: UploadFileType.ARTICLE,
    });
    console.log(
      "%c 🥛 url: ",
      "font-size:20px;background-color: #FCA650;color:#fff;",
      url
    );
  };

  return (
    <div className="h-full">
      <header className="flex w-full">
        <Calendar />
        <img src={logo} className="App-logo m-20" alt="logo" />
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={onClick}>click</Button>
        <Upload
          accept="image/*"
          customRequest={(option) => handleOss(option.file as RcFile)}
        >
          <Button>Click to Upload</Button>
        </Upload>
      </header>
      {/* <Image
        width={1200}
        src="http://r-mayfly.oss-cn-chengdu.aliyuncs.com/ui/image.png"
      /> */}
    </div>
  );
};

export default memo(Home);
