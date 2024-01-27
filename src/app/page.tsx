"use client";

import ReviewCard from "@/components/ReviewCard";
import { ReviewCardSkeleton } from "@/components/ReviewCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { REVIEW_PROGRAM_ID } from "@/programmId";
import { fetchReviews } from "@/util/fetchReviews";
import * as web3 from "@solana/web3.js";
import { useMemo, useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  const { data, isLoading, error } = useSWR("latest-reviews", async () =>
    fetchReviews(REVIEW_PROGRAM_ID, connection)
  );

  const locations = useMemo(() => {
    return data?.reduce<string[]>((prev, curr) => {
      if (!prev.includes(curr.location)) {
        return [...prev, curr.location];
      }
      return prev;
    }, []);
  }, [data]);

  function toggleLocation(location: string) {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((it) => it !== location));
      return;
    }

    setSelectedLocations([...selectedLocations, location]);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="flex gap-2 mt-8">
          {[6, 7, 8]?.map((it) => (
            <Skeleton
              key={it}
              className="w-16 border shadow rounded-full h-[30px]"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {[0, 1, 2].map((it) => (
            <ReviewCardSkeleton key={it} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <Header />
      <div className="flex gap-2 mt-8 flex-wrap">
        {locations?.map((it) => (
          <div
            onClick={() => toggleLocation(it)}
            key={it}
            className={cn(
              "border bg-card text-muted-foreground shadow rounded-full px-4 py-1 text-sm",
              selectedLocations.includes(it) && "text-black bg-border"
            )}
          >
            {it}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {data
          ?.filter(
            (it) =>
              selectedLocations.length === 0 ||
              selectedLocations.includes(it.location)
          )
          .map((it, i) => (
            <ReviewCard review={it} key={i} />
          ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Solana Foodreviews
      </h1>
      <p>eat tasty food all over the world - secured by blockchain</p>
    </>
  );
}
