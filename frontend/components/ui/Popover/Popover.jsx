import React, { useState, useRef, useEffect } from "react";
import "./Popover.css"; // Import external CSS

const Popover = ({ children }) => {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="popover-container" ref={popoverRef}>
            {React.Children.map(children, (child) => {
                if (child.type === PopoverTrigger) {
                    return React.cloneElement(child, { onClick: () => setOpen(!open) });
                }
                if (child.type === PopoverContent) {
                    return open ? React.cloneElement(child, { open }) : null;
                }
                return child;
            })}
        </div>
    );
};

const PopoverTrigger = ({ children, onClick }) => (
    <button className="popover-trigger" onClick={onClick}>
        {children}
    </button>
);

const PopoverContent = ({ children }) => (
    <div className="popover-content-2" data-state="open">
        {children}
    </div>
);

export { Popover, PopoverTrigger, PopoverContent };