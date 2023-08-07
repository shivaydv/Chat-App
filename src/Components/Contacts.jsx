import React, { useEffect, useState  } from "react";
import logo from "../Assets/logo.svg";
import axios from "axios";
import { allUser } from "../Utils/APIRoutes";
import Loader from "./Loader";
import Welcome from "./Welcome";
import ChatWindow from "./ChatWindow";



const Contacts = ({ username, id,socket }) => {

  

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);
  const [selectedDetail,setSelectedDetail]=useState(undefined)

  useEffect(() => {
    const allUsers = async () => {
      const { data } = await axios.get(`${allUser}/${id}`);
      setUser(data);
      setLoading(false);
      
    };
    allUsers();
  }, []);

  const handleSelected = (index, username, id) => {
    setSelected(index);
    setSelectedDetail({username,id})
  };

 


  return (
    <div className="bg-[#131324] w-screen h-screen  flex text-white">
      <aside className={`bg-black/20  md:w-3/12 ${selected== undefined?"w-full":"w-[0]"  } `}>
        <div className="w-full h-full lg:pt-1 overflow-hidden ">
          <header
            onClick={() => setSelected(undefined)}
            className=" bg-[#701eff]/50 flex w-full space-x-4 justify-between md:justify-start items-center py-4 px-5 md:rounded-lg mb-1 md:mb-0  shadow-3xl"
          >
            <img className="w-8 h-8  cursor-pointer" src={logo} alt="" />
            <h1 className="pt-1 cursor-pointer">{username}</h1>
          </header>

          <main className="flex flex-col h-[90%] py-2 rounded-b-lg  items-center overflow-auto gap-2">
            {loading ? (
              <Loader />
            ) : (
              user.map((items, index) => (
                <div
                  onClick={() =>
                    handleSelected(index, items.username, items._id)
                  }
                  className={`bg-blue-200/10 px-4 py-3 w-[90%]  gap-3 flex items-center rounded-lg hover:bg-white/20 cursor-pointer duration-200 ease-in-out ${
                    selected === index ? "bg-white/50 hover:bg-white/50" : ""
                  } `}
                  key={items._id}
                >
                  <img
                    className="w-12 h-12 object-cover  rounded-full"
                    src={
                      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1956494063.1684252344&semt=ais"
                    }
                  />
                  {items.username}
                </div>
              ))
            )}
          </main>
        </div>
      </aside>
      <main className={`md:block md:w-9/12 ${selected== undefined ?"hidden":"block w-full"}`}>
        {selected === undefined ? (
          <Welcome username={username} />
        ) : (
          <ChatWindow user={selectedDetail} myid={id} socket={socket} setSelected={setSelected} />
        )}
      </main>
    </div>
  );
};

export default Contacts;
