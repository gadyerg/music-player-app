function CreatePlaylist(props) {
    function submitHandler(evt) {
        evt.preventDefault();
        props.toggleCreatePlayList(false);
    }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Playlist Name" />
      <button>Create</button>
    </form>
  );
}

export default CreatePlaylist;