import classes from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={classes.bar}>
        <p>&#x1F50E;&#xFE0E;</p>
      <input type="text" />
    </div>
  );
}

export default SearchBar;
