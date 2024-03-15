import React, { useState, useEffect } from 'react';

const ResizableVertical = () => {
    const [topHeight, setTopHeight] = useState('50%'); // Initial height of top div
    const [isDragging, setIsDragging] = useState(false); // State to track dragging

    useEffect(() => {
        // Disable vertical scrolling
        document.body.style.overflowY = 'hidden';

        // Cleanup on unmount
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newTopHeight = `${Math.max(Math.min(e.clientY, window.innerHeight * 0.9), window.innerHeight * 0.1)}px`; // Ensure minimum height of 10% and maximum height of 90%
            setTopHeight(newTopHeight);
        }
    };

    const handleMouseEnter = () => {
        if (!isDragging) {
            document.body.style.cursor = 'row-resize'; // Change cursor to resize only if not dragging
        }
    };

    const handleMouseLeave = () => {
        if (!isDragging) {
            document.body.style.cursor = 'auto'; // Reset cursor if not dragging
        }
    };

    return (
        <div
            className='w-screen h-screen'
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="box bg-red-500" style={{ width: '100%', height: topHeight }}></div>

            <div
                className="w-full h-2 bg-white"
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            ></div>

            <div className="box bg-green-500" style={{ width: '100%', height: `calc(100% - ${topHeight})` }}></div>
        </div>
    );
};

export default ResizableVertical;
