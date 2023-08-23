import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;


function SongEditForm() {
    let { id } = useParams();
    let navigate = useNavigate();

    const [song, setSong] = useState({
      name: "",
      artist: "",
      album: "",
      time: "",
      is_favorite: false,
    });

    useEffect(() => {
      axios.get(`${API}/songs/${id}`).then(
        (response) => {console.log(response.data)
          setSong(response.data)},

        (error) => navigate(`/not-found`)
      );
    }, [id, navigate]);

    const updateSong = (updatedSong) => {
      axios
        .put(`${API}/songs/${id}`, updatedSong)
        .then(
          () => {
            navigate(`/songs/${id}`);
          },
          (error) => console.error(error)
        )
        .catch((c) => console.warn("catch", c));
    };

    const handleTextChange = (event) => {
      setSong({ ...song, [event.target.id]: event.target.value });
    };

    const handleCheckboxChange = () => {
      setSong({ ...song, is_favorite: !song.is_favorite });
    };



    const handleSubmit = (event) => {
      event.preventDefault();
      updateSong(song, id);
    };
    return (
        <div className="Edit">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              value={song.name}
              type="text"
              onChange={handleTextChange}
              placeholder="Name of Song"
              required
            />
            <label htmlFor="artist">Artist:</label>
            <input
              id="artist"
              type="text"
              required
              value={song.artist}
              placeholder="Kate Perry, Jimmy Hendrix"
              onChange={handleTextChange}
            />
            <label htmlFor="album">Album:</label>
            <input
              id="album"
              type="text"
              name="album"
              value={song.album}
              placeholder="the beatles sgt. pepper's lonely hearts club band, Teenage Dream"
              onChange={handleTextChange}
            />
            <label htmlFor="time">Time:</label>
            <input
              id="time"
              type="text"
              name="time"
              value={song.time}
              placeholder="2005, 1996, ..."
              onChange={handleTextChange}
            />
            <label htmlFor="is_favorite">Favorite:</label>
            <input
              id="is_favorite"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={song.is_favorite}
            />

            <br />

            <input type="submit" />
          </form>
          <Link to={`/songs/${id}`}>
            <button>Nevermind!</button>
          </Link>
        </div>
      );
}

export default SongEditForm;