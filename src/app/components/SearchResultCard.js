import useAudioContext from "../context/useAudioContext";

export default function SearchResultCard({ book }) {
  
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  return (
    <div
      className="search-result__item"
      onClick={() => (window.location.href = `/book/${book.id}`)}
    >
      <img src={book.imageLink} className="search-result__img" />

      <div className="search-result__info">
        <div className="search-result__title">{book.title}</div>
        <div className="search-result__author">{book.author}</div>
        <div className="search-result__duration">
          {formatDuration(useAudioContext(book.audioLink))}
        </div>
      </div>
    </div>
  );
}
