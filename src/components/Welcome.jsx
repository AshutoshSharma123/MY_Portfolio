import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const FONT_WEIGHTS = {
    subtitle: { default: 100, min: 100, max: 400 },
    title: { default: 400, min: 400, max: 700 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={`${className} variable-letter`}
            style={{ "--wght": baseWeight }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = [...container.querySelectorAll("span")];
    const { min, max, default: base } = FONT_WEIGHTS[type];

    letters.forEach((l) => l.style.setProperty("--wght", base));

    const setters = letters.map((el) => gsap.quickSetter(el, "--wght"));

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter, i) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const center = l + w / 2;
            const distance = Math.abs(mouseX - center);

            const rippleDelay = distance / 600;
            const intensity = Math.exp(-(distance ** 2) / 1500);
            const targetWeight = min + (max - min) * intensity;

            gsap.delayedCall(rippleDelay, () => {
                setters[i](targetWeight);

                if (intensity > 0.05) {
                    gsap.to(letter, {
                        textShadow: "0 0 12px rgba(255,255,255,0.7)",
                        duration: 0.3,
                    });
                } else {
                    gsap.to(letter, {
                        textShadow: "none",
                        duration: 0.3,
                    });
                }
            });
        });
    };

    const resetEffects = () => {
        letters.forEach((letter, i) => {
            gsap.to(letter, {
                "--wght": base,
                textShadow: "none",
                duration: 0.4,
            });
        });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetEffects);
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        setupTextHover(titleRef.current, "title");
        setupTextHover(subtitleRef.current, "subtitle");
    }, []);

    return (
        <>
            {/* Embedded CSS */}
            <style>
                {`
                :root {
                    --wght: 400;
                }

                .variable-letter {
                    font-variation-settings: "wght" var(--wght);
                    display: inline-block;
                    transition: text-shadow 0.15s ease;
                    will-change: font-variation-settings, text-shadow;
                }

                .glow {
                    text-shadow: 0px 0px 12px rgba(255,255,255,0.7);
                }

                #welcome {
                    padding: 40px;
                }

                .small-screen {
                    margin-top: 20px;
                }
            `}
            </style>

            <section id="welcome">
                <p ref={subtitleRef}>
                    {renderText(
                        "Hey, I'm Ashutosh! Welcome to ",
                        "text-3xl font-georama",
                        100
                    )}
                </p>

                <h1 ref={titleRef}>
                    {renderText("My Portfolio.", "text-6xl italic", 400)}
                </h1>

                <div className="small-screen">
                    <p>This portfolio is for desktop and tablets only</p>
                </div>
            </section>
        </>
    );
};

export default Welcome;
