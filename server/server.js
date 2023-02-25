const http = require("http");
const fs = require("fs");
const url = require("url");
const { v4 } = require("uuid");

const options = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

let app = http.createServer((req, res) => {
  console.log(req.method);
  course_id = req.url.split("/")[2];

  if (req.method === "GET") {
    if (req.url === "/courses") {
      let courses = JSON.parse(fs.readFileSync("courses.json"), "utf-8");
      res.writeHead(200, options);
      res.end(JSON.stringify(courses));
    }
    if (req.url === `/get_one_course/${course_id}`) {
      let foundedCourse = JSON.parse(
        fs.readFileSync("courses.json"),
        "utf-8"
      ).find((e) => e.id === course_id);

      if (!foundedCourse) {
        res.writeHead(404, options);
        return res.end(
          JSON.stringify({
            msg: "Course not found",
          })
        );
      }
      res.writeHead(200, options);
      res.end(JSON.stringify(foundedCourse));
    }
  }

  if (req.method === "DELETE") {
    if (req.url === `/delete_course/${course_id}`) {
      let courses = JSON.parse(fs.readFileSync("courses.json"), "utf-8");

      let foundedCourse = courses.find((e) => e.id === course_id);
      if (!foundedCourse) {
        res.writeHead(404, options);
        return res.end(
          JSON.stringify({
            msg: "The course is not exist",
          })
        );
      }

      courses.forEach((course, idx) => {
        if (course.id === course_id) {
          courses.splice(idx, 1);
        }
      });

      fs.writeFileSync("courses.json", JSON.stringify(courses, null, 2));

      res.writeHead(200, options);
      res.end(
        JSON.stringify({
          msg: "The course was deleted",
        })
      );
    }
  }

  if (req.method === "PUT") {
    if (req.url === `/update_course/${course_id}`) {
      req.on("data", (new_course) => {
        let newCourse = JSON.parse(new_course);
        let { title, price, author } = newCourse;

        let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));

        let foundedCourse = courses.find((course) => course.id === course_id);
        if (!foundedCourse) {
          res.writeHead(404, options);
          res.end(
            JSON.stringify({
              msg: "The course was not found",
            })
          );
        }
        courses.forEach((course) => {
          if (course.id === course_id) {
            course.title = title ? title : course.title;
            course.price = price ? price : course.price;
            course.author = author ? author : course.author;
          }
        });

        fs.writeFileSync("courses.json", JSON.stringify(courses, null, 2));
        res.writeHead(200, options);
        res.end(
          JSON.stringify({
            msg: "The course was updated",
          })
        );
      });
    }
  }

  if (req.method === "POST") {
    if (req.url === "/create_course") {
      req.on("data", (chunk) => {
        let data = JSON.parse(chunk);

        let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));

        courses = [
          ...courses,
          {
            id: v4(),
            ...data,
          },
        ];

        fs.writeFileSync("courses.json", JSON.stringify(courses, null, 2));
        res.writeHead(200, options);
        res.end(
          JSON.stringify({
            msg: "The coures was successfully added",
          })
        );
      });
    }
  }

  if (req.method === "POST") {
    if (req.url === "/auth/register") {
      req.on("data", (chunk) => {
        let { email, username, password, gender } = JSON.parse(chunk);

        let hashPsw = btoa(password);
        // let backPsw = atob(hashPsw);

        let users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

        let foundedUser = users.find((user) => user.email === email);

        if (foundedUser) {
          res.writeHead(200, options);
          return res.end(
            JSON.stringify({
              msg: "This user already exists",
            })
          );
        }

        users.push({
          id: v4(),
          email,
          username,
          gender,
          password: hashPsw,
        });

        fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

        res.writeHead(201, options);
        res.end(
          JSON.stringify({
            msg: "User successfully registrated",
          })
        );
      });
    }

    if (req.url === "/auth/login") {
      req.on("data", (chunk) => {
        let { email, password } = JSON.parse(chunk);
        let foundedUser = JSON.parse(
          fs.readFileSync("users.json", "utf-8")
        ).find((user) => user.email === email);

        if (foundedUser) {
          let psw = atob(foundedUser.password);
          if (psw !== password) {
            res.writeHead(200, options);
            return res.end(
              JSON.stringify({
                msg: "Password is wrong!",
              })
            );
          }
          let hashUser = btoa(foundedUser);

          res.writeHead(200, options);
          return res.end(
            JSON.stringify({
              msg: "You're logged in!",
              token: hashUser,
            })
          );
        }
        res.writeHead(404, options);
        res.end(
          JSON.stringify({
            msg: "User not found",
          })
        );
      });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on the port 3001");
});
