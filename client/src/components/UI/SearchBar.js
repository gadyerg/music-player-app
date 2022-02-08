import { useContext, useState } from "react";
import SongContext from "../../store/song-context";
import classes from "./SearchBar.module.css";
import SongPreview from "./SongPreview";

function SearchBar(props) {
  const ctx = useContext(SongContext);
  const [search, setSearch] = useState("");

  const searchFilter = ctx.currentSongList.filter((el) => {
    if (el.title) {
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
    if (evt.key === 'Enter' && searchFilter.length > 0) {
      const index = ctx.currentSongList.findIndex(el => el._id === searchFilter[0]._id)
      props.passSongIndex(index)
      setSearch("")
    }
  }

  return (
    <div className={classes.previewnbar}>
      <div className={classes.bar}>
        <p>&#x1F50E;&#xFE0E;</p>
        <input type="text" onChange={getSearch} value={search} onKeyPress={onEnter}/>
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
