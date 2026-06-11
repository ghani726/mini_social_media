import axios from "axios";
import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      _id: "1",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      caption: "Beautiful scenery",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3000/feed").then((res) => {
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-6">
      {posts.length > 0 ? (
        posts.map((e, i) => {
          return (
            <div key={i} className="bg-white rounded-2xl p-4">
              <img
                src={e.image}
                alt=""
                className="h-64 w-2xs rounded-xl border-none object-cover"
              />
              <p>{e.caption}</p>
            </div>
          );
        })
      ) : (
        <h1 className="text-3xl font-bold">No Posts available</h1>
      )}
    </div>
  );
};

export default Feed;
