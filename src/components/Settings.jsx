import React from "react";
import { Button } from "react-bootstrap";


/*
  Settings component (with flex-row layout)
  - Allows selecting board size and game mode.
  - Aligned horizontally and centered.
*/

export default function Settings({ size, setSize, mode, setMode, onStart }) {
    const handleSizeChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setSize("");
        } else {
            const n = parseInt(value);
            if (n > 10) setSize(10);
            else if (n < 3) setSize(3);
            else if (!isNaN(n)) setSize(n);
        }
    };

    return (
        <div className="d-flex justify-content-center mb-4">
            <div
                className="card shadow-sm p-4"
                style={{
                    minWidth: "420px",
                    maxWidth: "600px",
                    borderRadius: "25px",
                    background: "linear-gradient(180deg, #fdf1f1 0%, #f7e0ff 100%)",
                    boxShadow: "0 8px 25px rgba(139, 92, 246, 0.25)",
                    border: "2px solid rgba(156, 39, 176, 0.2)",
                }}
            >
                <div className="card-body d-flex flex-column align-items-center">
                    <h3 className="card-title fw-semibold text-center "
                        style={{
                            fontFamily: "Inika",
                            color: "#6a1b9a",
                            textShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            letterSpacing: "1px",
                            transition: "transform 0.5 ease-in-out",
                            cursor: "default",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        Let's play tic-tac-toe
                    </h3>

                    <div className="d-flex flex-row gap-4 w-100 justify-content-center mb-4">
                        <div className="flex-fill" >
                            <label className="fw-semibold mb-1">

                                Board Size
                            </label>
                            <input
                                type="number"
                                min="3"
                                max="10"
                                value={size}
                                onChange={handleSizeChange}
                                className="form-control form-control-md text-center"
                            />
                        </div>

                        {/* Mode select */}
                        <div className="flex-fill">
                            <label className="form-label fw-semibold mb-1">Game Mode</label>
                            <select
                                className="form-select form-select-md text-center"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="easy">Easy (Random)</option>
                                <option value="difficult">Hard (AI)</option>
                            </select>
                        </div>
                    </div>

                    {/* Start button */}
                    <Button
                        onClick={onStart}
                        className="fw-semibold"
                        style={{
                            background: "linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "16px",
                            padding: "12px 40px",
                            fontSize: "1.1rem",
                            letterSpacing: "0.5px",
                            fontFamily: "Inika",
                            boxShadow: "0 6px 0 #3b0a8f, 0 8px 18px rgba(142,45,226,0.35)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                                "0 9px 0 #3b0a8f, 0 12px 22px rgba(142,45,226,0.45)";
                            e.currentTarget.style.background =
                                "linear-gradient(90deg, #a45deb 0%, #7c4dff 100%)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 6px 0 #3b0a8f, 0 8px 18px rgba(142,45,226,0.35)";
                            e.currentTarget.style.background =
                                "linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)";
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = "translateY(2px)";
                            e.currentTarget.style.boxShadow =
                                "0 3px 0 #3b0a8f, 0 5px 10px rgba(142,45,226,0.25)";
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                    >
                         Start New Game
                    </Button>
                </div>
            </div>
        </div>
    );
}
