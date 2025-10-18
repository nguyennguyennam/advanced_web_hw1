import { Button } from "react-bootstrap";

/*
  Square component (fixed 60×60px)
  Highlighted when part of winning line.
*/
export default function Square({ value, onClick, highlight }) {
  return (
    <Button
      variant={highlight ? "success" : "outline-secondary"}
      onClick={onClick}
      className=" align-items-center fw-bold    "
      style={{
        width: "60px",
        height: "60px",
        padding: 0,
        margin: 0,
        backgroundColor: highlight ? "#c5e8ecff" : "white",
        color: value === "X" ? "#D500F9" : "blue",
        borderBottom: highlight ? "2px solid #218838" : "5px solid #ced4da",
        transition: "all 0.3s ease-in-out",
        
      }}
    >
      {value}
    </Button>
  );
}
