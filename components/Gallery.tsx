import type { Photo } from "../types"
import { useRef } from "react"
import Image from "next/image"
import Masonry from "react-masonry-css"

// LIGHTGALLERY
import LightGalleryComponent from "lightgallery/react"
import type { LightGallery } from "lightgallery/lightgallery"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"

type GalleryProps = {
  photos: Photo[]
}

export function Gallery({ photos }: GalleryProps) {
  const lightboxRef = useRef<LightGallery | null>(null)

  return (
    <>
      <Masonry breakpointCols={2} className="flex gap-4" columnClassName="">
        {photos.map((photo, idx) => (
          <Image
            key={photo.src}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            className="mb-4 border-2 rounded-md cursor-pointer hover:scale-[98%] transition-all duration-500"
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            onClick={() => {
              lightboxRef.current?.openGallery(idx)
            }}
          />
        ))}
      </Masonry>

      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightboxRef.current = ref.instance
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.thumb,
        }))}
      />
    </>
  )
}
