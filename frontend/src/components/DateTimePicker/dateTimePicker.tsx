import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type DateTimePickerProps = {
    value?: Date | null;
    onChange: (date: Date | null) => void;
    placeholder: string;
};

const DateTimePicker = ({ value, onChange, placeholder }: DateTimePickerProps) => {
    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;

        const current = value ?? new Date();
        const updated = new Date(date);
        updated.setHours(current.getHours());
        updated.setMinutes(current.getMinutes());
        onChange(updated);
    };

    const handleTimeChange = (type: "hour" | "minute", val: number) => {
        const date = value ? new Date(value) : new Date();
        if (type === "hour") date.setHours(val);
        else date.setMinutes(val);
        onChange(date);
    };

    return (
        <div className="flex flex-col gap-2">
            <Popover modal={true}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left text-sm font-medium font-[Figtree] text-grey-700">
                        {value ? format(value, "dd/MM/yyyy HH:mm") : placeholder}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 text-sm font-medium font-[Figtree] text-grey-700">
                    <div className="sm:flex">
                        <Calendar
                            mode="single"
                            selected={value ?? new Date()}
                            onSelect={handleDateSelect}
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <Button
                                            key={hour}
                                            size="icon"
                                            variant={value?.getHours() === hour ? "default" : "ghost"}
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() => handleTimeChange("hour", hour)}
                                        >
                                            {hour}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                        <Button
                                            key={minute}
                                            size="icon"
                                            variant={value?.getMinutes() === minute ? "default" : "ghost"}
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() => handleTimeChange("minute", minute)}
                                        >
                                            {minute.toString().padStart(2, "0")}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DateTimePicker;
