import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import React, { useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import useWindowStore from '#store/window.js';

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {

        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        // --- FIX 1: animateIcons must be defd here AND returned outside ---
        const animateIcons = (mouseX) => {
            const { left: dockLeft } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width: iconWidth } = icon.getBoundingClientRect();

                const center = iconLeft + iconWidth / 2;
                const distance = Math.abs(mouseX - center);

                // smooth 1 → 1.3 scale falloff
                const scale = Math.max(1, 1.3 - distance / 300);

                gsap.to(icon, {
                    scale: scale,   // ← use dynamic value
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        };


        const resetIcons = () => {
            icons.forEach((icon) => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        };

        // --- FIX 2: Add event listeners inside GSAP hook ---
        const handleMove = (e) => {
            animateIcons(e.clientX);
        };

        dock.addEventListener("mousemove", handleMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };

    }, []);

    const toggleApp = (app) => {
        console.log("Dock app clicked");
        if (!app.canOpen) return;
        const window = windows[app.id];
        if (window.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
        console.log(windows); d

    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">

                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, name, icon, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                loading="lazy"
                                className={`${canOpen ? "" : "opacity-50 cursor-not-allowed"} dock-icon`}
                                alt={name}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" className="tooltip" place="top" />
            </div>
        </section>
    );
};

export default Dock;
