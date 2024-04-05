import { createApi } from "unsplash-js"
import * as nodeFetch from "node-fetch"
import type { Photo } from "../types"

import { Tab } from "@headlessui/react"
import Link from "next/link"
import { GetStaticProps } from "next"

import classNames from "classnames"
import Image from "next/image"
import { getImages } from "../utils/image-util"

import bgImage from "../public/photography-bg.jpg"

import { useMemo } from "react"
import { Gallery } from "@/components/Gallery"

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

type HomeProps = {
  oceans: Photo[]
  forests: Photo[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch as unknown as typeof fetch,
  })

  const [oceans, forests] = await Promise.all([
    getImages(unsplash, "oceans"),
    getImages(unsplash, "forests"),
  ])

  return {
    props: {
      oceans,
      forests,
    },
    // revalidate: 10,    uncomment for ISR
  }
}

export default function Home({ oceans, forests }: HomeProps) {
  const allPhotos = useMemo(() => {
    const all = [...oceans, ...forests]

    return all.sort((a, b) => b.likes - a.likes)
  }, [oceans, forests])

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
        <span className="text-3xl font-medium border p-2">
          Photography Portfolio
        </span>
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
              <Tab.Panel className="overflow-auto">
                <Gallery photos={allPhotos} />
              </Tab.Panel>
              <Tab.Panel className="overflow-auto">
                <Gallery photos={oceans} />
              </Tab.Panel>
              <Tab.Panel className="overflow-auto">
                <Gallery photos={forests} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="relative h-24 z-20 flex justify-center items-center text-lg font-medium">
        <p className=" border p-2">Photography Portfolio</p>
      </footer>
    </div>
  )
}
