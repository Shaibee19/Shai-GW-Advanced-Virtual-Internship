export default function BookSkeleton() {
  return (
    <div className="recommended__books--skeleton">
      <div
        className="skeleton"
        style={{ width: "100%", height: "240px", marginBottom: "8px" }}
      ></div>
      <div
        className="skeleton"
        style={{ width: "100%", height: "20px", marginBottom: "8px" }}
      ></div>
      <div
        className="skeleton"
        style={{ width: "90%", height: "16px", marginBottom: "8px" }}
      ></div>
      <div
        className="skeleton"
        style={{ width: "80%", height: "32px", marginBottom: "8px" }}
      ></div>
      <div className="skeleton" style={{ width: "90%", height: "16px" }}></div>
    </div>
  );
}
