export default function BookCard({ book }) {
  return (
    <div className="book">

      <img src={book.imageLink} className="book__img" />

      <div className="book__info">
        <div className="book__title">{book.title}</div>
        <div className="book__author">{book.author}</div>

        <div className="book__meta">
          <span>{book.duration}</span>
          <span>{book.rating}</span>
        </div>
      </div>
    </div>
  );
}
