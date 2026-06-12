export default function SearchResultCard({ book }) {
  return (
    <div className="search-results">
      <a className="search-result__item" href={`/book/${book.id}`}>
        <img src={book.imageLink} className="search-result__img" />
        <div className="search-result__info">
          <div className="search-result__title">{book.title}</div>
          <div className="search-result__author">{book.author}</div>
          <div className="search-result__duration">
            {formatDuration(book.duration)}
          </div>
        </div>
      </a>
    </div>
  );
}
