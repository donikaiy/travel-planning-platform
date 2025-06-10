type TimelineStep = {
    title: string;
    description: string;
};

const timelineData: TimelineStep[] = [
    {
        title: "Start",
        description: "Enter your destination to find the most relevant information on flights, hotels, dining options, and must-see attractions.",
    },
    {
        title: "Next",
        description: "Enter your travel dates to generate the most relevant information, including flights, accommodations, and attractions.",
    },
    {
        title: "Finalize",
        description: "After entering your details, get a complete overview of your trip, including the best places to visit, dining options, and travel insights.",
    },
    {
        title: "Start Your Journey",
        description: "Arrive at your destination, explore confidently, and make the most of your trip with our hassle-free travel guide.",
    },
];

const Timeline = () => {
    return (
        <div className="relative">
            <div
                className="absolute left-5 top-3 bottom-3 w-0.5 bg-gray-300 z-0 transform -translate-x-1/2"/>
            {timelineData.map((step, index) => (
                <div
                    key={index}
                    className="flex flex-row items-start mb-12 last:mb-0 relative z-10"
                >
                    <div className="flex flex-col items-center w-10 mr-4">
                        <div className="w-6 h-6 rounded-full bg-gray-300 border-4 border-white z-10"/>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-700 text-md font-[Figtree] leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Timeline
