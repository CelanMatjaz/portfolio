import React from 'react'
import './components.css'

interface Props {
    imageUrls: string[];
}

// Id counter
// Used to distinguish between all image slides
let id = 0;

export const ImageSlides: React.FC<Props> = (props) => {
    const { imageUrls } = props;

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [imageElements, setImageElements] = React.useState<NodeListOf<HTMLImageElement>>();

    const elementId = React.useMemo(() => id++, []);

    const swapToImage = React.useCallback((imageIndex: number) => {
        if (!imageElements) return;

        const imagesList = document.querySelector(`#image-slide-images-${elementId}`)! as HTMLElement;
        const container = imagesList?.parentElement!;
        const e = imagesList.querySelectorAll('img')[imageIndex];

        if (!e.parentElement) return;

        const w = container.clientWidth;
        const h = container.clientHeight;

        e.parentElement.style.width = `${w}px`;

        if (w > e.naturalWidth) {
            e.style.paddingLeft = e.style.paddingRight = `${(w - e.naturalWidth) / 2}px`;
        }

        if (h > e.naturalHeight) {
            e.style.paddingTop = e.style.paddingBottom = `${(h - e.naturalHeight) / 2}px`;
        }

        imagesList.style.transform = `translateX(-${e.offsetLeft}px)`;
    }, [imageElements]);

    React.useEffect(() => {
        const container = document.querySelector(`#image-slide-images-${elementId}`)?.parentElement;

        if (!container) return;

        const images = document.querySelectorAll<HTMLImageElement>(`#image-slide-images-${elementId} li img`);
        setImageElements(images);

        swapToImage(currentImageIndex);
    }, []);

    React.useEffect(() => {
        function resizeListener() {
            swapToImage(currentImageIndex);
        }

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [swapToImage, currentImageIndex]);

    const updateImageIndex = React.useCallback((indexOffset: number) => {
        let newIndex;

        if (currentImageIndex + indexOffset < 0) {
            newIndex = imageUrls.length - 1;
        }
        else if (currentImageIndex + indexOffset >= imageUrls.length) {
            newIndex = 0;
        }
        else {
            newIndex = currentImageIndex + indexOffset;
        }

        setCurrentImageIndex(newIndex);
        swapToImage(newIndex);
    }, [swapToImage, currentImageIndex]);

    return (
        <div className="image-slides">
            <div className="arrow-button left-0" onClick={() => updateImageIndex(-1)}>{'<'}</div>
            <div className="arrow-button right-0" onClick={() => updateImageIndex(+1)}>{'>'}</div>
            <ul className="flex flex-row w-max" id={`image-slide-images-${elementId}`}> {
                imageUrls.map((url, i) => <li key={i}><img src={url} /></li>)
            }</ul>
        </div >
    )
}
