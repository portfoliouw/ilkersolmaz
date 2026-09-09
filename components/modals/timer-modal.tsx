"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/providers/language-provider";

interface TimerModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type SessionKey = "tyt" | "ayt" | "ydt";

function getNextYksDate() {
    const now = new Date();
    const currentYear = now.getFullYear();

    const getExamDates = (year: number) => {
        const saturdays: number[] = [];
        for (let day = 1; day <= 30; day++) {
            const date = new Date(year, 5, day);
            if (date.getDay() === 6) {
                saturdays.push(day);
            }
        }
        const tytDay = saturdays.length >= 3 ? saturdays[2] : saturdays[saturdays.length - 1];

        return {
            tyt: new Date(year, 5, tytDay, 10, 15, 0),
            ayt: new Date(year, 5, tytDay + 1, 10, 15, 0),
            ydt: new Date(year, 5, tytDay + 1, 15, 45, 0),
        };
    };

    let dates = getExamDates(currentYear);
    if (now.getTime() > dates.ydt.getTime()) {
        dates = getExamDates(currentYear + 1);
    }

    return dates;
}

export function TimerModal({ open, onOpenChange }: TimerModalProps) {
    const { dict } = useLanguage();
    const [activeSession, setActiveSession] = useState<SessionKey>("tyt");
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            setNow(new Date());
        });
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(interval);
        };
    }, []);

    const targetDates = useMemo(() => getNextYksDate(), []);
    const targetDate = targetDates[activeSession];

    const timeLeft = useMemo(() => {
        if (!now) {
            return { days: "00", hours: "00", minutes: "00", seconds: "00" };
        }

        const diff = targetDate.getTime() - now.getTime();
        if (diff <= 0) {
            return { days: "00", hours: "00", minutes: "00", seconds: "00" };
        }

        const totalSec = Math.floor(diff / 1000);
        const days = Math.floor(totalSec / (3600 * 24));
        const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);
        const seconds = totalSec % 60;

        return {
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
        };
    }, [now, targetDate]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="flex flex-col sm:max-w-[560px] max-h-[85vh] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

                <div className="relative px-8 pt-8 pb-4 shrink-0">
                    <DialogHeader className="gap-3">
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {dict.yks}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                            {dict.yksModalDescription}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center gap-2 mt-4 p-1 rounded-full border border-border/50 bg-secondary/20">
                        <button
                            type="button"
                            onClick={() => setActiveSession("tyt")}
                            className={`flex-1 py-2.5 px-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${activeSession === "tyt"
                                ? "bg-foreground text-background shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {dict.sessions.tyt}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSession("ayt")}
                            className={`flex-1 py-2.5 px-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${activeSession === "ayt"
                                ? "bg-foreground text-background shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {dict.sessions.ayt}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSession("ydt")}
                            className={`flex-1 py-2.5 px-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${activeSession === "ydt"
                                ? "bg-foreground text-background shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {dict.sessions.ydt}
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto px-8 pb-8 pt-2 flex-1">
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm">
                            <span className="text-xl sm:text-3xl xl:text-4xl font-black tracking-tight text-foreground font-mono">
                                {timeLeft.days}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">
                                {dict.days}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm">
                            <span className="text-xl sm:text-3xl xl:text-4xl font-black tracking-tight text-foreground font-mono">
                                {timeLeft.hours}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">
                                {dict.hours}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm">
                            <span className="text-xl sm:text-3xl xl:text-4xl font-black tracking-tight text-foreground font-mono">
                                {timeLeft.minutes}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">
                                {dict.minutes}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm">
                            <span className="text-xl sm:text-3xl xl:text-4xl font-black tracking-tight text-foreground font-mono">
                                {timeLeft.seconds}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">
                                {dict.seconds}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />
            </DialogContent>
        </Dialog>
    );
}
