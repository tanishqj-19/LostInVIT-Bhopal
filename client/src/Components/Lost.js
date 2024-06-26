import React, { useEffect, useState } from "react";
import {
  createLostItemPost,
  deleteLostPost,
  getAllLostItemDataUser,
  userData,
} from "../Services/Apis";
import moment from "moment";
import { Button } from "@material-tailwind/react";

const Lost = () => {
  const [spinner, setSpinner] = useState(false);
  const [createPostScpinner, setCreatePostSpinner] = useState(false);
  const [postData, setPostData] = useState({ title: "", description: "" });
  const [file, setFile] = useState("");
  const [allLostPostData, setAllLostPostData] = useState([]);

  const [data, setData] = useState({});
  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  useEffect(() => {
    let isMounted = true;

    const fetchDataAndLostPostData = async () => {
      try {
        if (isLoggedIn) {
          const getUserData = await userData({ token: userToken });

          if (isMounted) {
            setData(getUserData.data.data);
            await fetchLostPostData();
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSpinner(false);
      }
    };

    const fetchLostPostData = async () => {
      try {
        setSpinner(true);
        const response = await getAllLostItemDataUser({ userId: data._id });

        if (isMounted) {
          if (response.status === 200) {
            setSpinner(false);
            setAllLostPostData(response.data.userPosts);
            //console.log(response.data.userPosts);
          } else {
            alert("Some error occurred in fetching you posts");
            console.log(response);
          }
        }
      } catch (error) {
        console.error("Error fetching lost post data:", error);
      }
    };

    fetchDataAndLostPostData();

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted component
    };
  }, [isLoggedIn, userToken, data._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleCreatePostClick = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Choose An Image");
    } else {
      setCreatePostSpinner(true);
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("userId", data._id);
      formData.append("title", postData.title);
      formData.append("description", postData.description);

      try {
        const response = await createLostItemPost(formData);

        if (response.status === 200) {
          setCreatePostSpinner(false);
          alert("Post Created Successfully");
          console.log(response.data.message);
          window.location.reload();
        } else {
          alert("Some error occured while creating post, please try later");
          console.log(response);
        }
      } catch (error) {
        console.error("Error while creating post:", error);
        alert("Some error occurred, please try later");
      }

      setPostData({ title: "", description: "" });
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await deleteLostPost({ postId });

      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
      alert("Some error occurred while deleting, please try later");
    }
  };

  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description + "...";
  }

  return (
    <>
      <Button
        type="button"
        variant="text"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalLostPost3"
        className="my-2"
      >
        Create Post
      </Button>
      <div className="row mt-2" style={{ margin: "auto" }}>
        {spinner ? (
          <>
            Loading
            <div className="spinner-border text-center" role="status">
              <span className="sr-only"></span>
            </div>
          </>
        ) : allLostPostData?.length === 0 ? (
          <h3 className="text-center">Nothing To Display</h3>
        ) : (
          allLostPostData?.map((element, index) => (
            <>
              <div
                className="card mx-3 mt-3"
                key={index}
                style={{ width: "18rem", height: "30rem" }}
              >
                <div className="profileImg my-2 d-flex justify-content-start align-items-center">
                  <img
                    src={
                      element.userProfileImgPath
                        ? element.userProfileImgPath
                        : "./images/profileDefault.png"
                    }
                    className="rounded-circle"
                    style={{
                      height: "30px",
                      width: "30px",
                      objectFit: "cover",
                      border: "1px solid black",
                    }}
                    alt={index}
                  />
                  <div
                    className="d-flex justify-content-center flex-column"
                    style={{ marginLeft: "10px" }}
                  >
                    <text style={{ fontSize: "14px" }}>{element.userName}</text>
                    <text className="text-muted" style={{ fontSize: "10px" }}>
                      {element.userEmail}
                    </text>
                  </div>
                </div>
                <img
                  src={element.itemImgPath}
                  style={{ objectFit: "cover", height: "50%" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">
                    {truncateDescription(element.description, 50)}
                  </p>
                  
                  <div className="flex  justify-between items-center gap-4">
                      <Button size="sm" type="button"
                        className="hover:bg-orange-600"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModalGlobalLost${index}`}>
                        View Details
                      </Button>
                      
                      <Button className="bg-red-500 hover:bg-red-800 " size="sm" onClick={() => handleDeletePost(element._id)}>Delete</Button>
                      
             
                      
                    </div>
                  
                </div>
              </div>
              <div
                className="modal fade"
                key={`1.${index}`}
                id={`exampleModal${index}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModal4Title">
                        {element.title}
                      </h5>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-12 col-md-5 col-lg-4">
                          <img
                            src={element.itemImgPath}
                            alt="Earbuds"
                            className="img-fluid"
                            style={{ width: "200px" }}
                          />
                        </div>
                        <div className="col-7">
                          <h5>Description</h5>
                          <p className="text-muted">{element.description}</p>
                          <h6 className="text-dark ">
                            Posted By:
                            <span className="ps-2 text-muted">
                              {element.userName}
                            </span>
                          </h6>
                          <h6 className="text-dark ">
                            Email ID:
                            <span className="ps-3 text-muted">
                              {element.userEmail}
                            </span>
                          </h6>
                          <h6 className="text-dark ">
                            Lost on Date:
                            <span className="ps-2 text-muted">
                              {moment(element.date).format("L")}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
      {/* given below is the structure of a model which opens when user clicks on "Edit Profile" button */}
      <div
        className="modal fade"
        id="exampleModalLostPost3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Lost An Item ?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label"
                >
                  Lost Item Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Choose Image"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Enter Title"
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea"
                  rows="4"
                  placeholder="Describe your lost item"
                  name="description"
                  value={postData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreatePostClick}
              >
                Create Post
                {createPostScpinner ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lost;
