import React, { useState } from 'react';

const ResizableHorizontal = ({leftContent, rightContent}) => {
    const [leftWidth, setLeftWidth] = useState('50%'); // Initial width of left div
    const [isDragging, setIsDragging] = useState(false); // State to track dragging

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newLeftWidth = `${Math.max(Math.min(e.clientX, window.innerWidth * 0.7), window.innerWidth * 0.3)}px`; // Ensure minimum width of 20% and maximum width of 80%
            setLeftWidth(newLeftWidth);
        }
    };

    const handleMouseEnter = () => {
        if (!isDragging) {
            document.body.style.cursor = 'col-resize'; // Change cursor to resize only if not dragging
        }
    };

    const handleMouseLeave = () => {
        if (!isDragging) {
            document.body.style.cursor = 'auto'; // Reset cursor if not dragging
        }
    };
    

    return (
        <div
            className='flex flex-col md:flex-row h-screen'
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="box flex-grow bg-[#1e1e1e] h-screen" style={{ width: leftWidth, }}>{leftContent}</div>

            <div
                className={`w-2 ${isDragging ? 'bg-blue-500' : 'bg-gray-500'}`}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />

            <div className="box flex-grow" style={{ width: `calc(100% - ${leftWidth})` }}>{rightContent}</div>
        </div>
    );
};

export default ResizableHorizontal;
