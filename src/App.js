import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
// import "@mui/material/Rating/Rating.css";

const tempMusicData = [
  {
    id: 10,
    title: "Love Story",
    artist: "Taylor Swift",
    genre: "Rock",
    userRating: 4,
  },
  {
    id: 20,
    title: "Bad Blood",
    artist: "Taylor Swift",
    genre: "Hip-Hop",
    userRating: 5,
  },
  {
    id: 30,
    title: "Blank Space",
    artist: "Taylor Swift",
    genre: "Hip-Hop",
    userRating: 3,
  },
  {
    id: 40,
    title: "Shake It Off",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 50,
    title: "Look What You Made Me Do",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 60,
    title: "Fearless",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 70,
    title: "Teardrops on My Guitar",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 80,
    title: "Our Song",
    artist: "Taylor Swift",
    genre: "Hip-Hop",
    userRating: 5,
  },
  {
    id: 90,
    title: "You Belong With Me",
    artist: "Taylor Swift",
    genre: "Jazz",
    userRating: 4,
  },
  {
    id: 100,
    title: "Mean",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 4,
    title: "Night Changes",
    artist: "One Direction",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 5,
    title: "Steal My Girl",
    artist: "One Direction",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 6,
    title: "You & I",
    artist: "One Direction",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 7,
    title: "Summer Love",
    artist: "One Direction",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 8,
    title: "Kiss You",
    artist: "One Direction",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 9,
    title: "Live While We're Young",
    artist: "One Direction",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 120,
    title: "Best Song Ever",
    artist: "One Direction",
    genre: "Pop",
    userRating: 3,
  },
];

const tempPlaylist = [
  {
    id: 1,
    title: "What Makes You Beautiful",
    artist: "One Direction",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 2,
    title: "Story of My Life",
    artist: "One Direction",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 3,
    title: "Little Things",
    artist: "One Direction",
    genre: "Pop",
    userRating: 4,
  },
];

export function App() {
  const [musics, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("title");

  const addToPlaylist = (music) => {
    // Check if the music item already exists in the playlist
    const exists = playlist.some((item) => item.id === music.id);

    if (!exists) {
      // If the music item does not exist, add it to the playlist
      setPlaylist([...playlist, music]);
      alert("Added to playlist successfully!"); // Prompt success message
    } else {
      // If the music item already exists, prompt a message
      alert("This item already exists in the playlist.");
    }
  };
  const isMusicInPlaylist = (music) => {
    return playlist.some((item) => item.id === music.id);
  };
  const filteredMusics = musics.filter(
    (music) =>
      music.title.toLowerCase().includes(query.toLowerCase()) ||
      music.artist.toLowerCase().includes(query.toLowerCase())
  );
  // Sort function
  const sortMusics = (type) => {
    const sorted = [...musics].sort((a, b) => {
      if (type === "title") {
        return a.title.localeCompare(b.title);
      } else if (type === "artist") {
        return a.artist.localeCompare(b.artist);
      } else if (type === "genre") {
        return a.genre.localeCompare(b.genre);
      } else if (type === "userRating") {
        return b.userRating - a.userRating; // Descending order for ratings
      }
    });
    setMusic(sorted);
  };

  // Use useEffect to sort on component render or sort type change
  useEffect(() => {
    sortMusics(sortType);
  }, [sortType]);

  return (
    <div>
      <NavBar setQuery={setQuery} setSortType={setSortType}>
        <NumResult musics={musics} />
      </NavBar>
      <Main>
        <Box title="Music List">
          <Music
            musics={filteredMusics}
            addToPlaylist={addToPlaylist}
            isMusicInPlaylist={isMusicInPlaylist}
          />
        </Box>
        <Box title="Play List">
          <PlayList musics={playlist} />
        </Box>
      </Main>
    </div>
  );
}
export default App;
function Sort({ setSortType }) {
  return (
    <>
      <div className="select-container">
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="genre">Genre</option>
          <option value="userRating">User Rating</option>
        </select>
      </div>
    </>
  );
}
function NavBar({ children, setQuery, setSortType }) {
  return (
    <div className="navbar">
      <div className="logo">
        <Logo />
      </div>
      <div className="filter">
        <Search setQuery={setQuery} />
        <Sort setSortType={setSortType} />
      </div>
      {children}
    </div>
  );
}
function Logo() {
  return <h1 style={{ textAlign: "center" }}>JMP</h1>;
}
function NumResult({ musics }) {
  return (
    <p>
      Found <strong>{musics.length}</strong> results
    </p>
  );
}
function Search({ setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Music({ musics, addToPlaylist, isMusicInPlaylist }) {
  return (
    <ul>
      {musics.map(
        (
          music // Corrected here: changed 'musics' to 'music'
        ) => (
          <div>
            <li key={music.id} className="title">
              {music.title} by {music.artist} ({music.genre})
              {/* {Array.from({ length: music.userRating }).map((_, index) => (
              <span key={index}>⭐</span>
            ))} */}
              <button
                className={isMusicInPlaylist(music) ? "heartDisabled" : "heart"}
                onClick={() => addToPlaylist(music)}
              >
                ♥️
              </button>
            </li>
          </div>
        )
      )}
    </ul>
  );
}

function Box({ children, title }) {
  return (
    <div className="container">
      <h2> {title} </h2>
      {children}
    </div>
  );
}

function PlayList({ musics }) {
  // Assuming you want to manage ratings for each music item individually
  // Initialize ratings state as an object with music IDs as keys and userRating as values
  const [ratings, setRatings] = useState(
    musics.reduce(
      (acc, music) => ({ ...acc, [music.id]: music.userRating }),
      {}
    )
  );

  const handleRatingChange = (musicId, newValue) => {
    setRatings((prevRatings) => {
      const updatedRatings = { ...prevRatings, [musicId]: newValue };
      console.log(`New rating for music ID ${musicId}: ${newValue}`);
      return updatedRatings;
    });
  };

  useEffect(() => {
    console.log(musics);
  }, [musics]);

  return (
    <>
      <ul>
        {musics.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist}
            <p>
              <Rating
                name={`rating-${music.id}`}
                value={ratings[music.id]}
                defaultValue={music.userRating}
                onChange={(event, newValue) =>
                  handleRatingChange(music.id, newValue)
                }
              />
            </p>
          </li>
        ))}
      </ul>
      <p>
        <strong>{musics.length}</strong> Songs
      </p>
    </>
  );
}

function Main({ children }) {
  const [query, setQuery] = useState("");

  return (
    <div className="container">
      {/* <MusicListBox musics={musics} />
      <PlayListBox /> */}
      {/* <Box>
        <Music />
      </Box> */}
      {children}
    </div>
  );
}

//stateless / presentational component - presentation , logo , footer , component as design
// -ex. num result
// stateful component
// -ex. search, Music, Playlist
// structural component - as template
// -ex. MusicListBox , App

// parent - child - PROPS
