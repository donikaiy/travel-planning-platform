import { Link } from "react-router-dom";

type ImageProps = {
    linkTo?: string;
    index: number;
    imageUrl: string;
    alt: string;
    name: string;
};

const ImageSmallBlackBackground = ({ linkTo, index, imageUrl, alt, name }: ImageProps) => {
    const imageContent = (
        <div className="relative rounded-lg overflow-hidden flex-shrink-0 group">
            <img
                src={imageUrl}
                alt={alt}
                className="w-full max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] aspect-[5/7] object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                loading="lazy"
            />
            <div
                className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base"
            >
                {name}
            </div>
        </div>
    );

    return (
        <div>
            {linkTo ? (
                <Link
                    to={linkTo}
                    key={index}
                    className="block"
                >
                    {imageContent}
                </Link>
            ) : (
                <div key={index}>{imageContent}</div>
            )}
        </div>
    );
};

export default ImageSmallBlackBackground;
