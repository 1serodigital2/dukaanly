"use client";

// hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

//Components
import { Input } from "@/src/components/form/Input";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    if (!inputValues.email || !inputValues.password) {
      setError("Please fill up the form properly");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputValues.email,
      password: inputValues.password,
    });
    console.log("data", data);
    setLoading(false);
    if (error) {
      setError(error?.message || "Something went wrong");
      return;
    }

    router.replace("/admin/");
    router.refresh();
  };

  const handleChange = (name: string, value: string) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    console.log("inputValues", inputValues);
  };

  return (
    <>
      <h1>Dukaanly</h1>
      <form
        action=""
        className="border rounded-lg p-4 flex flex-col gap-3 items-start w-87.5"
        onSubmit={handleFormSubmit}
      >
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <button
          className="border px-4 py-2 rounded cursor-pointer text-center w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginPage;
