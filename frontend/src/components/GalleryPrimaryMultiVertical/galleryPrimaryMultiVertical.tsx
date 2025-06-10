type GalleryPrimaryMultiVerticalProps = {
    index: number,
    imageUrl: string
}

const GalleryPrimaryMultiVertical = ({index, imageUrl}: GalleryPrimaryMultiVerticalProps) => {
    return (
        <div
            key={index}
            className={index === 0
                ? "md:col-span-2 md:row-span-2"
                : "col-span-1 row-span-1"}>
            <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}

export default GalleryPrimaryMultiVertical;
