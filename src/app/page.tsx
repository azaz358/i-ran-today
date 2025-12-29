"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/lib/supabase/database.types";
import { format } from "date-fns";

type RunWithProfile = Tables<"runs"> & {
  username: string;
};

const supabase = createClient();

export default function Home() {
  const [allRuns, setAllRuns] = useState<RunWithProfile[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    supabase
      .from("runs")
      .select("*, profiles(username)")
      .order("ran_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          return;
        }
        const runs = data.map(({ profiles, ...run }) => ({
          ...run,
          username: profiles?.username ?? "Unknown",
        }));
        setAllRuns(runs);
      });
  }, []);

  if (allRuns.length === 0) {
    return <div>no runs submitted yet!</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {error && <div className="error-message">error: {error}</div>}
      {allRuns.map((run) => (
        <div key={run.id}>
          <h2>{run.title}</h2>
          <p>{run.notes}</p>
          <p>ran at: {format(new Date(run.ran_at), "MM/dd/yy h:mm a")}</p>
          <p>by: {run.username}</p>
        </div>
      ))}
    </div>
  );
}
