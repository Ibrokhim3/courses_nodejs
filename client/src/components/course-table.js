import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [img_url, setImg_url] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((res) => res.json())
      .then((course) => setCourses(course));
  }, []);

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "course_picture");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dephdgqpo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const data2 = await res.json();
    console.log(data2);
    setImg_url(data2.secure_url);
  };

  const createCouse = (e) => {
    e.preventDefault();
    const { title, price, author } = e.target;

    fetch("http://localhost:3001/create_course", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        price: price.value,
        author: author.value,
        img_url,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));

    window.location.reload();
  };
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add Course
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>author</th>
            <th>img</th>
            <th>edit</th>
            <th>trash</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((c, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{c.title}</td>
                  <td>{c.price}</td>
                  <td>{c.author}</td>
                  <td>
                    <img src={c.img_url} width="50" height={"50"} />
                  </td>
                  <td>
                    <i
                      className="fa fa-edit text-primary"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash text-danger"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modal Heading</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={(e) => createCouse(e)}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  {/* <input type="email" className="form-control" placeholder="Enter email" id="email"> */}
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="title..."
                    name="title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="price..."
                    name="price"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="author">author:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="author..."
                    name="author"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e)}
                    name="file"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
