import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    console.log("blog:", blog);
    setIsPending(true);

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
      console.log("new blog added");
      // history.go(-1);
      history.push("/");
    });
  };
  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />

        <label htmlFor="">Blog body:</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label htmlFor="">Blog author:</label>
        <select
          name=""
          id=""
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>adding your blog...</button>}
      </form>
    </div>
  );
};

export default Create;
