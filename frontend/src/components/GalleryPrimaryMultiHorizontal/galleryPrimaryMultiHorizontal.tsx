type GalleryImage = {
    imageUrl: string;
};

type GalleryData = {
    gallery: GalleryImage[];
};

type GalleryPrimaryMultiHorizontalProps = {
    data: GalleryData | undefined;
}

const GalleryPrimaryMultiHorizontal = ({data}: GalleryPrimaryMultiHorizontalProps) => {
    return (
        <div className="flex-1 xl:flex-[2]">
            <div className="rounded-lg overflow-hidden mb-4">
                <img
                    src={data?.gallery?.[0].imageUrl}
                    alt={data?.gallery?.[0].imageUrl}
                    className="w-full h-64 md:h-80 xl:h-96 object-cover rounded-lg"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {data?.gallery?.slice(1).map((gallery, index) => (
                    <div
                        key={index}
                        className="rounded-lg overflow-hidden w-[calc(25%-0.5rem)]"
                    >
                        <img
                            src={gallery.imageUrl}
                            alt={gallery.imageUrl}
                            className="w-full h-30 object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GalleryPrimaryMultiHorizontal
