"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}
