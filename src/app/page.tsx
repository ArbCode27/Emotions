"use client";
import { useState } from "react";
import { Loading } from "./components/Loading";
import { Form } from "./components/Form";
import { Results } from "./components/Results";
import { Error } from "./components/Error";
import Login from "./components/Login";

async function query(data: string) {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/finiteautomata/beto-emotion-analysis",
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let response;
    setLoading(true);
    if (file) {
      const message = file.map((file) => {
        return [file[1], file[2]];
      });
      setLoading(true);

      for (let i = page + 1; i < page + page + 6; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log(JSON.parse(localStorage.getItem("data") as string));
        const likes = message[i][1];
        response = await query(message[i][0])
          .then((response) => {
            return { response, likes, message: message[i][0] };
          })
          .catch(async () => {
            setError(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await query(message[i][0]).then((response) => {
              return { response, likes, message: message[i][0] };
            });
          });
        if (localStorage.getItem("data")) {
          const data = JSON.parse(localStorage.getItem("data") as string);
          data.push(response);
          localStorage.setItem("data", JSON.stringify(data));
        } else {
          localStorage.setItem("data", JSON.stringify([response]));
        }
      }
      setPage(page + 5);
      setData(JSON.parse(localStorage.getItem("data") as string));
      setLoading(false);
    } else {
      setError(true);
    }
  };

  return (
    <main className="py-[98px] w-full flex justify-center items-center bg-black">
      <Login />
      {error && <Error />}
      {data && <Results loading={loading} handler={handleSubmit} data={data} />}
      {!data && !loading && !error && (
        <Form
          setData={setData}
          setLoading={setLoading}
          data={data}
          setError={setError}
          setPage={setPage}
          page={page}
          file={file}
          setFile={setFile}
        />
      )}
      {loading && !data && <Loading />}
    </main>
  );
}
