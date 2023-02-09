import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
const { Dragger } = Upload;
const App = () => {
  const [list, setList] = useState([
    {
      name: "默认为空",
    },
  ]);
  const upFileTo = (value) => {
    return axios({
      url:'http://127.0.0.1:8083/api/unicorn-files/v1/upload',
      method:'POST',
      data: {file:value},
    })
  }
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    fileList:[],
    // beforeUpload(){
    //   return false	
    // },
    customRequest (val) {
      const  { file } = val
      let formData = new FormData()
      formData.append('file',file)
      console.log(formData)
      upFileTo(formData).then(()=>{
        console.log('3')
      })
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setList((val) => val.concat(info.fileList));
      }
      console.log('执行')
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const submit = () => {
    console.log(list)
  }
  const del = (val) => {
    const index = list.findIndex((i) => i.name === val.name);
    let arr = list.concat();
    arr.splice(index, 1);
    setList(arr);
  };
  useEffect(() => {
    console.log("test");
    getNewList();
  }, [list]);

  const getNewList = () => {
    return list.map((i) => (
      <div key={i.name}>
        {i.name}
        <b onClick={(e) => del(i, e)}>（删除）</b>
      </div>
    ));
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <div>这里是我自己写的list：</div>
      {getNewList()}
      <button onClick={submit}>提交</button>
    </div>
  );
};
export default App;
