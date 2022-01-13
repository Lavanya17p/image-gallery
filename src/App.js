import React, { useEffect, useState } from "react";
import styled from "styled-components";
import search from "./img/search.svg";
import download from "./img/download.svg";
import bg from "./img/bg.jpg";

const accessKey = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const baseLink = `https://api.unsplash.com/photos/`;
const searchLink = `https://api.unsplash.com/search/photos`;

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const getImages = async () => {
    let url;
    const pageCount = `&page=${page}`;
    const query = `&query=${searchQuery}`;
    url = `${baseLink}${accessKey}`;

    if (searchQuery) {
      url = `${searchLink}${accessKey}${pageCount}${query}`;
    } else {
      url = `${baseLink}${accessKey}${pageCount}`;
    }

    try {
      const res = await fetch(url);

      const data = res.json().then((allPhotos) =>
        setPhotos((oldPhotos) => {
          if (searchQuery && page === 1) {
            return allPhotos.results;
          } else if (searchQuery) {
            return [...oldPhotos, ...allPhotos.results];
          } else {
            return [...oldPhotos, ...allPhotos];
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //Refetch Images when the page changes
    getImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 5
      ) {
        setPage((oldValue) => {
          return oldValue + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery) {
      setPage(1);
      getImages();
    }
  };

  const FormRender = () => {
    return (
      <form action="" className="form">
        <div className="input-control">
          <input
            type="text"
            placeholder="search for items e.g mountain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Search <img src={search} alt="" />
          </button>
        </div>
      </form>
    );
  };

  const GeneratedImages = () => {
    return (
      <div className="content">
        {photos.map((photo, i) => {
          return (
            <div className="photo" key={i}>
              <div className="image">
                <img src={photo.urls.regular} alt="" />
              </div>
              <div className="details">
                <p>{photo.user.name}</p>
                {/* <p>{photo.details}</p> */}
                <a href={photo.urls.regular}>
                  <img src={download} alt="" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AppStyled>
      <header className="header">
        <h2 className="logo">Photo Library</h2>
        <p className="para">One stop destination for your photos</p>
        {FormRender()}
      </header>
      <main className="main-content">{GeneratedImages()}</main>
    </AppStyled>
  );
}

export default App;

const AppStyled = styled.div`
  header {
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-image: url("./bg.jpg"); */
    background-image: url(${bg});

    margin-bottom: 5rem;

    form {
      display: flex;
      justify-content: center;
      width: 50%;
      transition: all 0.4s ease-in-out;
      @media screen and (max-width: 575px) {
        width: 90%;
      }
      .input-control {
        position: relative;
        width: 70%;
        margin: 0 auto;
        transition: all 0.4s ease-in-out;
        text-align: center;
        @media screen and (max-width: 1024px) {
          width: 80%;
        }
        @media screen and (max-width: 852px) {
          width: 90%;
        }
        @media screen and (max-width: 695px) {
          width: 95%;
        }
        input {
          padding: 1rem 2rem;
          border: none;
          outline: none;
          background-color: #f5f5f5;
          border-radius: 5px;
          width: 100%;
          filter: drop-shadow(0px 4px 22px rgba(0, 0, 0, 0.25));
          color: black;
          font-family: inherit;
        }
        button {
          position: absolute;
          right: 5px;
          top: 50%;
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transform: translateY(-50%);
          color: white;
          padding: 0.3rem 1.5rem;
          border-radius: 5px;
          background-color: rgb(5 64 96);
          cursor: pointer;
          img {
            padding-left: 1rem;
          }
        }
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 2rem;
    grid-auto-rows: 1fr;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 3rem;
    .photo {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #25354c;
      box-shadow: 1px 8px 23px rgba(0, 0, 0, 0.25);
      .image {
        flex: 2;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .details {
        display: flex;
        color: white;
        justify-content: space-between;
        padding-top: 1rem;
        img {
          width: 28px;
        }
      }
    }
    @media screen and (max-width: 852px) {
      width: 100%;
    }
  }
`;

// font-family: 'Nunito', sans-serif;
// font-family: 'Lobster', cursive;
