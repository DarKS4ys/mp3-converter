"use client"

import { useRef, useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import clsx from "clsx";
import axios from "axios";
import { YoutubeParser } from "./utils/YtParser";

export default function Home() {
  const inputUrlRef = useRef<HTMLInputElement | null>(null);
  const [urlResult, setUrlResult] = useState(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputUrlRef.current !== null) {
      const youtubeId = YoutubeParser(inputUrlRef.current.value)
      console.log(youtubeId);

      const apiKey = process.env.API_KEY;
      const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        headers: {
          'X-RapidAPI-Key': 'c7365e916emsh6fa6de3d9a066a8p1eb215jsnfebe297f369c',
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        },
        params: {
          id: youtubeId
        }
      }
      axios(options)
       .then(res => setUrlResult(res.data.link))
       .catch(err => console.log(err))

       inputUrlRef.current.value = ""
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen text-center gap-4 p-8">
      <h1 className="text-5xl font-semibold">
        Stoic<span className="text-red-600">Converter</span>
      </h1>
      <section className="sm:w-[50rem] gap-4 flex flex-col">
        <p className="text-xl">
          Transform YouTube videos into MP3 in just a few clicks
        </p>

        <form onSubmit={handleSubmit} className="gap-3 flex">
          <Input
            ref={inputUrlRef}
            type="text"
            placeholder="Enter the link of the desired audio"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            className={clsx("w-[10rem]", {
              "text-gray-500 hover:ring-0 hover:bg-transparent hover:border-[--border] hover:ring-offset-0": inputValue === "",
            })}
            type="submit"
            disabled={inputValue === ""}
          >
            {inputValue === "" ? "Empty" : "Search"}
          </Button>
        </form>

        {
        
        urlResult ?
        
        <a target='_blank' rel="norefrrer" href={urlResult}>
          <Button className="bg-red-600 hover:bg-red-500 ring-red-500/50">
            Download MP3
          </Button>
        </a> : null 
        
        }


      </section>
    </main>
  );
}
