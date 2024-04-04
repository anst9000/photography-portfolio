"use client"

import { Tab } from "@headlessui/react"
import Link from "next/link"
import Masonry from "react-masonry-css"
import classNames from "classnames"
import Image from "next/image"

// LIGHTGALLERY
import LightGalleryComponent from "lightgallery/react"
import type { LightGallery } from "lightgallery/lightgallery"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"

import bgImage from "../public/photography-bg.jpg"

import ocean1 from "../public/ocean-1.jpeg"
import ocean2 from "../public/ocean-2.jpeg"
import ocean3 from "../public/ocean-3.jpeg"
import ocean4 from "../public/ocean-4.jpeg"
import ocean5 from "../public/ocean-5.jpeg"
import { useRef } from "react"

const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "oceans",
    display: "Oceans",
  },
  {
    key: "forests",
    display: "Forests",
  },
]

const images = [ocean1, ocean2, ocean3, ocean4, ocean5]

export default function Home() {
  const lightboxRef = useRef<LightGallery | null>(null)

  return (
    <div className="h-full overflow-auto">
      <Image
        className="fixed left-0 top-0 z-0"
        src={bgImage}
        alt="photographer"
        placeholder="blur"
      />

      <div className="fixed left-0 top-0 w-full h-full z-10 bg-gradient-to-b from-stone-900"></div>

      <header className="fixed top-0 w-full z-30 bg-stone-900 bg-opacity-50 flex justify-between items-center h-24 px-12 py-6">
        <span className="text-3xl font-medium">Photography Portfolio</span>
        <Link
          href="#"
          className="outline outline-offset-2 outline-white text-lg rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>

      <main className="relative pt-32 z-20">
        <div className="flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key}>
                  {({ selected }) => (
                    <span
                      className={classNames(
                        "uppercase text-xl",
                        selected ? "border-b-2 text-white" : "text-stone-600"
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full max-w-[900px] w-full p-2 sm:p-4 my-6 bg-stone-900 bg-opacity-30">
              <Tab.Panel>
                <Masonry
                  breakpointCols={2}
                  className="flex gap-4"
                  columnClassName=""
                >
                  {images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`image ${idx}`}
                      placeholder="blur"
                      className="mb-4 border-2 rounded-md cursor-pointer hover:scale-[101%] transition-all duration-500"
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
                  dynamic={true}
                  dynamicEl={images.map((img) => ({
                    src: img.src,
                    thumb: img.src,
                  }))}
                />
              </Tab.Panel>
              <Tab.Panel>Oceans</Tab.Panel>
              <Tab.Panel>Forests</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="relative h-24 z-20 flex justify-center items-center text-lg font-medium">
        <p>Photography Portfolio</p>
      </footer>
    </div>
  )
}
