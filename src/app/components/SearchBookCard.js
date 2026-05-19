export default function SearchResultCard({ book }) {
  return (
    <div className="search-result">
      <img src={book.imageLink} className="search-result__img" />
      <div className="search-result__info">
        <div className="search-result__title">{book.title}</div>
        <div className="search-result__author">{book.author}</div>
      </div>
    </div>
  );
}
