"use client"

import { Tab } from "@headlessui/react"
import Link from "next/link"
import Masonry from "react-masonry-css"
import classNames from "classnames"
import Image from "next/image"

import ocean1 from "../public/ocean-1.jpeg"
import ocean2 from "../public/ocean-2.jpeg"
import ocean3 from "../public/ocean-3.jpeg"
import ocean4 from "../public/ocean-4.jpeg"
import ocean5 from "../public/ocean-5.jpeg"

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

const images = [
  { id: 1, value: ocean1 },
  { id: 2, value: ocean2 },
  { id: 3, value: ocean3 },
  { id: 4, value: ocean4 },
  { id: 5, value: ocean5 },
]

export default function Home() {
  return (
    <div className="h-full bg-[url('/photography-bg.jpg')] bg-right bg-cover overflow-auto">
      <header className="fixed top-0 w-full z-10 bg-stone-900 bg-opacity-40 flex justify-between items-center h-24 px-12 py-6">
        <span className="text-3xl font-medium">Photography Portfolio</span>
        <Link
          href="#"
          className="text-lg rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>

      <main className="pt-32">
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
                  {images.map((img) => (
                    <Image
                      key={img.id}
                      src={img.value}
                      alt="placeholder"
                      className="mb-4 border-2"
                    />
                  ))}
                  {/* <img
                    className="mb-4 border-2"
                    src="/ocean-1.jpeg"
                    alt="ocean-1"
                  /> */}
                </Masonry>
              </Tab.Panel>
              <Tab.Panel>Oceans</Tab.Panel>
              <Tab.Panel>Forests</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="h-24 flex justify-center items-center text-lg font-medium">
        <p>Photography Portfolio</p>
      </footer>
    </div>
  )
}
