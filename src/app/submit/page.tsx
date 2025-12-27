"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function SubmitPage() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();
  async function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const notes = formData.get("notes") as string;
    const ran_at = formData.get("ran_at") as string;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError(
        "you must be logged in to submit a run. please sign in and try again."
      );
      return;
    }

    const { error } = await supabase
      .from("runs")
      .insert({ title, notes, ran_at, user_id: user.id });
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(true);
  }
  return success ? (
    <div>run submitted successfully</div>
  ) : (
    <div>
      <h1>submit a run</h1>
      <form className="flex flex-col gap-4" action={handleSubmit}>
        <div>
          title:
          <input name="title" type="text" required />
        </div>
        <div>
          notes:
          <textarea
            className="w-full border-2"
            name="notes"
            rows={3}
            required
          />
        </div>

        <div>
          ran at:
          <div>
            <input
              name="ran_at"
              type="datetime-local"
              className="border-2 px-2"
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit">submit</button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
