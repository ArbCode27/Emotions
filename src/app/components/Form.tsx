import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { motion } from "framer-motion";

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

export const Form = ({
  setLoading,
  setData,
  setError,
  setPage,
  page,
  file,
  setFile,
}: {
  setLoading: any;
  setData: any;
  data: any;
  setError: any;
  setPage: any;
  page: any;
  file: any;
  setFile: any;
}) => {
  const [value, setValue] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const data = Papa.parse(acceptedFiles[0], {
        complete: function (results) {
          setFile(results.data);
        },
      });
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        ".csv": [".scv"],
      }, // Specify the accepted file extension
      multiple: false,
    });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let response;
    setLoading(true);
    if (file) {
      const message = file.map((file) => {
        return [file[1], file[2]];
      });
      localStorage.clear();
      setLoading(true);

      for (let i = page; i < page + page + 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(JSON.parse(localStorage.getItem("data") as string));
        const likes = message[i][1];
        response = await query(message[i][0])
          .then((response) => {
            return { response, likes, message: message[i][0] };
          })
          .catch(async () => {
            setError(true);
            await new Promise((resolve) => setTimeout(resolve, 5000));
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
      response = await query(value)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.log(err);
        });
      setData(response[0]);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[400px] h-[500px] border-[1px] rounded-lg border-solid border-gray-500 flex flex-col justify-between items-center py-8 pt-8">
      <figure>
        <Image src={"/feliz.png"} alt="emoji feliz" width={150} height={150} />
      </figure>
      <form onSubmit={handleSubmit}>
        {!file && (
          <>
            <div
              className="text-gray-300 text-center border-solid border-[1px] border-white p-4 rounded-xl max-w-[300px] mb-8"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </>
        )}

        {file && (
          <motion.div
            initial={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: -20 }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-white mb-4">Documento cargado</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="currentColor"
              className="bi bi-check-circle text-green-600"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
            </svg>
          </motion.div>
        )}

        <Button className="w-full mt-6" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
