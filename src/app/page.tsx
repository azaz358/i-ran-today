"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/lib/supabase/database.types";
import { format } from "date-fns";

export default function Home() {
  const supabase = createClient();
  const [allRuns, setAllRuns] = useState<Tables<'runs'>[]>([]);

  useEffect(() => {
    supabase.from('runs').select('*').then(({ data, error }) => {
      if (error) {
        return <div>error: {error.message}</div>
      }
      setAllRuns(data);
    });
  }, []);


  if (allRuns.length === 0) {
    return <div>no runs submitted yet!</div>
  }

  return (
    <div>
      {allRuns.map((run) => (
        <div key={run.id}>
          <h2>{run.title}</h2>
          <p>{run.notes}</p>

          <br/>
          <p>ran at: {format(new Date(run.ran_at), 'MM/dd/yy h:mm a')}</p>
        </div>
      ))}
    </div>
  );
}
