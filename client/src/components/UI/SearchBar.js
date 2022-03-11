import { useContext, useState } from "react";
import SongContext from "../../store/song-context";
import classes from "./SearchBar.module.css";
import SongPreview from "./SongPreview";
import magnifyingGlass from "../../assets/glass.svg";

function SearchBar(props) {
  const ctx = useContext(SongContext);
  const [search, setSearch] = useState("");

  const searchFilter = ctx.songList.filter((el) => {
    if (el.title && search.length > 0) {
      return el.title.toLowerCase().startsWith(search.toLowerCase());
    }
    return undefined;
  });

  function getSearch(evt) {
    setSearch(evt.target.value);
  }

  function SongIndexHandler(index) {
    props.passSongIndex(index);
    setSearch("");
  }

  function onEnter(evt) {
    if (evt.key === "Enter" && searchFilter.length > 0) {
      console.log(searchFilter);
      const index = ctx.songList.findIndex(
        (el) => el._id === searchFilter[0]._id
      );
      props.passSongIndex(index);
      setSearch("");
    }
  }

  return (
    <div className={classes.previewnbar}>
      <div className={classes.bar}>
        <img src={magnifyingGlass} alt="magnifying glass" />
        <input
          type="text"
          onChange={getSearch}
          value={search}
          onKeyPress={onEnter}
        />
      </div>
      {search.length > 0 && (
        <div className={classes["mini-preview"]}>
          {searchFilter.map((el) => (
            <SongPreview
              key={el._id}
              image={el.cover}
              songTitle={el.title}
              id={el._id}
              onSongClick={SongIndexHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
