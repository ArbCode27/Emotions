import { Progress, divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { CircularProgress } from "@nextui-org/react";

export const Results = ({
  data,
  handler,
  loading,
}: {
  data: any;
  handler: any;
  loading: any;
}) => {
  return (
    <div className="flex flex-col justify-center items-cener">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 items-center justify-center">
        {data.map((item) => {
          console.log(item);
          return (
            <>
              <div className="scroll relative w-[300px] max-h-[500px] overflow-auto border-[1px] rounded-lg border-solid border-gray-500 flex flex-col justify-between items-center px-4 py-8 pt-4 text-white gap-3">
                <figure>
                  <Image
                    src={`/${item.response[0][0].label}.png`}
                    alt="emoji"
                    width={40}
                    height={40}
                  />
                </figure>
                <p className="text-white">
                  Likes: <span className="font-semibold">{item.likes}</span>
                </p>
                <div>
                  <p>Messaje:</p>
                  <p>{item.message}</p>
                </div>
                {item.response[0].map((item) => {
                  const score = item.score * 10;
                  return (
                    <div className="w-full" key={item.label}>
                      <p className="mb-2">{item.label}:</p>
                      <Progress
                        className="w-full"
                        size="sm"
                        aria-label="Loading..."
                        value={score}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
      <button className="bg-none text-white" onClick={handler}>
        See more...
      </button>
      {loading && (
        <div className="w-full flex justify-center">
          <CircularProgress color="warning" />
        </div>
      )}
    </div>
  );
};
