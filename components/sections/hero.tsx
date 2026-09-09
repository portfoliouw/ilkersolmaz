"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRight, User } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";
import { AboutModal } from "@/components/modals/about-modal";
import { InteractiveParticles } from "@/components/effects/interactive-particles";

const TRACK_1 = [
    "/hero-slider/abdulhamit-1.webp",
    "/hero-slider/fsm-1.webp",
    "/hero-slider/cyrus-2.webp",
    "/hero-slider/osmanli-1.webp",
    "/hero-slider/fsm-2.webp",
    "/hero-slider/cyrus-1.webp",
] as const;

const TRACK_2 = [
    "/hero-slider/cyrus-1.webp",
    "/hero-slider/fsm-2.webp",
    "/hero-slider/osmanli-1.webp",
    "/hero-slider/cyrus-2.webp",
    "/hero-slider/fsm-1.webp",
    "/hero-slider/abdulhamit-1.webp",
] as const;

const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

export default function Hero() {
    const { content, dict } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [contactOpen, setContactOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    return (
        <section
            ref={containerRef}
            className="h-screen w-full flex flex-col justify-between bg-background px-container md:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 2xl:pb-24 overflow-hidden relative"
            id="home"
        >
            <InteractiveParticles />

            <div className="absolute top-0 right-6 sm:right-12 md:right-16 lg:right-24 xl:right-36 2xl:right-48 bottom-0 h-full w-55 sm:w-65 md:w-85 lg:w-100 xl:w-110 2xl:w-120 flex gap-3 sm:gap-4 px-2 overflow-hidden z-5 pointer-events-none select-none opacity-100 dark:opacity-[0.8] mix-blend-luminosity">
                <div className="max-md:hidden flex-1 h-full overflow-hidden relative">
                    <motion.div
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 32,
                            repeat: Infinity
                        }}
                        className="flex flex-col gap-3 sm:gap-4 pt-4"
                    >
                        {COL_1_IMAGES.map((src, idx) => (
                            <div key={idx} className="w-full aspect-3/4 relative overflow-hidden rounded-4xl border border-border/5">
                                <Image
                                    src={src}
                                    alt="Portrait"
                                    fill
                                    sizes="(max-width: 768px) 0px, (max-width: 1280px) 20vw, 12vw"
                                    priority
                                    className="object-cover object-center grayscale contrast-[1.08] brightness-[0.8]"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="max-md:opacity-50 flex-1 h-full overflow-hidden relative">
                    <motion.div
                        animate={{ y: ["-50%", "0%"] }}
                        transition={{
                            ease: "linear",
                            duration: 32,
                            repeat: Infinity
                        }}
                        className="flex flex-col gap-3 sm:gap-4 pt-4"
                    >
                        {COL_2_IMAGES.map((src, idx) => (
                            <div key={idx} className="w-full aspect-3/4 relative overflow-hidden rounded-4xl border border-border/5">
                                <Image
                                    src={src}
                                    alt="Portrait"
                                    fill
                                    sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 12vw"
                                    priority
                                    className="object-cover object-center grayscale contrast-[1.08] brightness-[0.8]"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background pointer-events-none z-10" />
                <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent pointer-events-none z-10" />
            </div>

            <div className="relative z-20 flex-1 flex flex-col gap-6 sm:gap-8 xl:gap-12 justify-end w-full h-full">

                <div className="w-full mt-auto flex flex-col justify-center relative z-20 mix-blend-difference">
                    <div className="overflow-hidden">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[140px] font-black tracking-tighter sm:leading-[0.90] text-foreground uppercase whitespace-nowrap">
                            Ilker
                            <br />
                            <span className="text-foreground/80">
                                Solmaz
                            </span>
                        </h1>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8 xl:space-y-10">
                    <p className="sm:text-lg 2xl:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mix-blend-difference">
                        {content.about.description}
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4">
                        <button
                            onClick={() => setContactOpen(true)}
                            className="w-fit group relative flex h-12 xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-10 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
                        >
                            <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-12 group-hover:duration-1000 group-hover:translate-x-full">
                                <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
                            </div>
                            <span className="relative z-10 flex items-center gap-2 xl:gap-3 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase">
                                {dict.contactMe}
                                <ArrowRight className="w-3.5 xl:w-5 h-3.5 xl:h-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                        </button>

                        <button
                            onClick={() => setAboutOpen(true)}
                            className="w-fit group relative flex h-12 xl:h-16 cursor-pointer items-center justify-center px-6 xl:px-10 text-muted-foreground transition-all duration-500 hover:text-foreground hover:bg-secondary/15 rounded-full border border-border sm:border-transparent hover:border-border/30 backdrop-blur-sm"
                        >
                            <span className="relative z-10 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase flex items-center gap-2 xl:gap-3">
                                <User className="w-3.5 xl:w-5 h-3.5 xl:h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                {dict.about}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
            <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
        </section>
    );
}