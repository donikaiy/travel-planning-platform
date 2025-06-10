type TitleTextSectionProps = {
    title: string,
    text: string | undefined,
    link?: string,
}

const TitleTextSection = ({title, text, link}: TitleTextSectionProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <p className="text-md font-medium font-[Figtree] text-gray-600">
                {text ? text : "No information available"}
                {link && <a href={link} className="font-bold"> {link}</a>}
            </p>
        </div>
    )
}

export default TitleTextSection
