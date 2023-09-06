import { message } from "antd";
import instance from "../../axios";

export const categories = [
  { title: "Books", value: "books" },
  { title: "Games", value: "games" },
  { title: "Movies", value: "movies" },
  { title: "Music", value: "music" },
];
export const props = {
  name: "files",
  multiple: true,
  maxCount: 1,
  beforeUpload: (file) => {
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error("File size exceeds the limit (5MB).");
      return false;
    }
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      message.error("Only JPEG, PNG files are allowed.");
      return false; // Отмена загрузки
    }

    return true;
  },
  action: `${instance.defaults.baseURL}/api/reviews/upload`,
  onChange(info) {
    const { status, response } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      const flat = info.fileList
        .map((item) => {
          return item.response;
        })
        .flatMap((item) => item);
      setUploadedImages(flat);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
